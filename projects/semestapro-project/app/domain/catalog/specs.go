package catalog

import (
	"encoding/json"
	"fmt"
	"math"
	"strconv"
	"strings"
	"time"
)

// Requirement says whether a spec applies to a category (docs/SCHEMA.md §5.2).
type Requirement byte

const (
	NotApplicable Requirement = iota
	Optional
	Required
)

// FieldType is the value type of a spec.
type FieldType byte

const (
	TypeInt FieldType = iota
	TypeDecimal
	TypeBool
	TypeEnum
	TypeText
)

// Option is a selectable enum value.
type Option struct{ Value, Label string }

// Field defines one specification. Column fields live in dedicated properties
// columns; the rest are stored in the properties.specs JSON object.
type Field struct {
	Key      string
	Label    string
	Unit     string
	Type     FieldType
	IsColumn bool
	Min, Max float64
	MaxLen   int
	Options  []Option
}

// FieldSpec is a Field resolved for one category.
type FieldSpec struct {
	Field
	Requirement Requirement
}

var (
	certificateOptions = []Option{
		{"shm", "Sertifikat Hak Milik (SHM)"}, {"hgb", "Hak Guna Bangunan (HGB)"},
		{"shmsrs", "SHM Satuan Rumah Susun (Strata)"}, {"ajb", "Akta Jual Beli (AJB)"},
		{"ppjb", "PPJB"}, {"other", "Lainnya"},
	}
	facingOptions = []Option{
		{"north", "Utara"}, {"northeast", "Timur Laut"}, {"east", "Timur"}, {"southeast", "Tenggara"},
		{"south", "Selatan"}, {"southwest", "Barat Daya"}, {"west", "Barat"}, {"northwest", "Barat Laut"},
	}
	furnishingOptions = []Option{{"unfurnished", "Kosong"}, {"semi", "Semi Furnished"}, {"full", "Full Furnished"}}
	waterOptions      = []Option{{"pdam", "PDAM / Air Batam"}, {"well", "Sumur"}, {"other", "Lainnya"}}
	zoningOptions     = []Option{
		{"residential", "Perumahan"}, {"commercial", "Komersial"}, {"industrial", "Industri"},
		{"mixed", "Campuran"}, {"other", "Lainnya"},
	}
	contourOptions = []Option{{"flat", "Datar"}, {"sloped", "Berkontur"}}
)

// fields is the ordered master list. Order drives forms, detail pages, the Excel
// export and JSON key order. Min/Max for year fields are resolved at validation time.
var fields = []Field{
	{Key: "land_area_m2", Label: "Luas Tanah", Unit: "m²", Type: TypeDecimal, IsColumn: true, Min: 0, Max: 1_000_000},
	{Key: "building_area_m2", Label: "Luas Bangunan", Unit: "m²", Type: TypeDecimal, IsColumn: true, Min: 0, Max: 100_000},
	{Key: "bedrooms", Label: "Kamar Tidur", Type: TypeInt, IsColumn: true, Min: 0, Max: 50},
	{Key: "bathrooms", Label: "Kamar Mandi", Type: TypeInt, IsColumn: true, Min: 0, Max: 50},
	{Key: "floors", Label: "Jumlah Lantai", Unit: "lantai", Type: TypeInt, Min: 1, Max: 100},
	{Key: "electricity_watt", Label: "Daya Listrik", Unit: "Watt", Type: TypeInt, Min: 450, Max: 200_000},
	{Key: "certificate", Label: "Sertifikat", Type: TypeEnum, Options: certificateOptions},
	{Key: "facing", Label: "Hadap", Type: TypeEnum, Options: facingOptions},
	{Key: "furnishing", Label: "Kondisi Perabot", Type: TypeEnum, Options: furnishingOptions},
	{Key: "carport_capacity", Label: "Carport", Unit: "mobil", Type: TypeInt, Min: 0, Max: 20},
	{Key: "is_hook", Label: "Posisi Hook", Type: TypeBool},
	{Key: "water_source", Label: "Sumber Air", Type: TypeEnum, Options: waterOptions},
	{Key: "year_built", Label: "Tahun Dibangun", Type: TypeInt}, // 1950..current year
	{Key: "front_width_m", Label: "Lebar Depan", Unit: "m", Type: TypeDecimal, Min: 0, Max: 1000},
	{Key: "unit_floor", Label: "Lantai Unit", Type: TypeInt, Min: 0, Max: 200},
	{Key: "tower_name", Label: "Nama Tower", Type: TypeText, MaxLen: 60},
	{Key: "ipl_monthly", Label: "Biaya IPL per Bulan", Unit: "Rp", Type: TypeInt, Min: 0, Max: 100_000_000},
	{Key: "has_private_pool", Label: "Kolam Renang Pribadi", Type: TypeBool},
	{Key: "ceiling_height_m", Label: "Tinggi Plafon", Unit: "m", Type: TypeDecimal, Min: 0, Max: 50},
	{Key: "road_access_width_m", Label: "Lebar Akses Jalan", Unit: "m", Type: TypeDecimal, Min: 0, Max: 100},
	{Key: "container_access", Label: "Bisa Dimasuki Kontainer", Type: TypeBool},
	{Key: "land_length_m", Label: "Panjang Lahan", Unit: "m", Type: TypeDecimal, Min: 0, Max: 10_000},
	{Key: "zoning", Label: "Peruntukan", Type: TypeEnum, Options: zoningOptions},
	{Key: "land_contour", Label: "Kontur Tanah", Type: TypeEnum, Options: contourOptions},
	{Key: "hgb_expiry_year", Label: "Masa Berlaku HGB s/d", Unit: "tahun", Type: TypeInt}, // current year..+80, HGB only
}

// matrix maps a key to its requirement per category, in the order of Categories:
// rumah, ruko, apartemen, villa, gudang, lahan. W=Required, O=Optional, -=N/A.
// Mirror of docs/SCHEMA.md §5.2; keep both in sync.
var matrix = map[string]string{
	"land_area_m2":        "WW-WWW",
	"building_area_m2":    "WWWWW-",
	"bedrooms":            "W-WW--",
	"bathrooms":           "WOWWO-",
	"floors":              "WW-OO-",
	"electricity_watt":    "OOOOW-",
	"certificate":         "WWWOOW",
	"facing":              "OO-OOO",
	"furnishing":          "OOOO--",
	"carport_capacity":    "OO-O--",
	"is_hook":             "OO---O",
	"water_source":        "O--O--",
	"year_built":          "OOOOO-",
	"front_width_m":       "-O---O",
	"unit_floor":          "--O---",
	"tower_name":          "--O---",
	"ipl_monthly":         "--O---",
	"has_private_pool":    "---O--",
	"ceiling_height_m":    "----O-",
	"road_access_width_m": "----OO",
	"container_access":    "----O-",
	"land_length_m":       "-----O",
	"zoning":              "-----O",
	"land_contour":        "-----O",
	"hgb_expiry_year":     "OOOOOO",
}

func categoryIndex(c Category) int {
	for i, x := range Categories {
		if x == c {
			return i
		}
	}
	return -1
}

// RequirementOf reports how a spec key applies to a category.
func RequirementOf(c Category, key string) Requirement {
	row, ok := matrix[key]
	i := categoryIndex(c)
	if !ok || i < 0 {
		return NotApplicable
	}
	switch row[i] {
	case 'W':
		return Required
	case 'O':
		return Optional
	}
	return NotApplicable
}

// LabelFor returns the display label of a field for a category (apartments call
// the building area "Luas Unit").
func LabelFor(c Category, f Field) string {
	if c == Apartemen && f.Key == "building_area_m2" {
		return "Luas Unit"
	}
	return f.Label
}

// FieldsFor returns the specs that apply to c, in display order.
func FieldsFor(c Category) []FieldSpec {
	var out []FieldSpec
	for _, f := range fields {
		if r := RequirementOf(c, f.Key); r != NotApplicable {
			f.Label = LabelFor(c, f)
			out = append(out, FieldSpec{Field: f, Requirement: r})
		}
	}
	return out
}

// FieldByKey returns a field definition.
func FieldByKey(key string) (Field, bool) {
	for _, f := range fields {
		if f.Key == key {
			return f, true
		}
	}
	return Field{}, false
}

// OptionLabel resolves an enum value to its label ("" when unknown).
func OptionLabel(f Field, value string) string {
	for _, o := range f.Options {
		if o.Value == value {
			return o.Label
		}
	}
	return ""
}

// Specs is the validated, normalized result: Columns go to dedicated columns,
// JSON to properties.specs.
type Specs struct {
	Columns map[string]any
	JSON    map[string]any
}

// EncodeJSON renders the JSON specs with keys in field-definition order so that
// diffs are stable. Empty specs encode as "{}".
func (s Specs) EncodeJSON() string {
	var b strings.Builder
	b.WriteByte('{')
	first := true
	for _, f := range fields {
		v, ok := s.JSON[f.Key]
		if !ok {
			continue
		}
		if !first {
			b.WriteByte(',')
		}
		first = false
		k, _ := json.Marshal(f.Key)
		val, _ := json.Marshal(v)
		b.Write(k)
		b.WriteByte(':')
		b.Write(val)
	}
	b.WriteByte('}')
	return b.String()
}

// Validate checks form input for category c and returns normalized specs plus
// per-field error messages keyed by field key (Indonesian, docs/PRD.md FR-PROP-09).
// Inputs for specs that do not apply to c are rejected. now supplies the year
// bounds so the function stays pure.
func Validate(c Category, in map[string]string, now time.Time) (Specs, map[string]string) {
	out := Specs{Columns: map[string]any{}, JSON: map[string]any{}}
	errs := map[string]string{}
	year := now.Year()

	for _, f := range fields {
		raw := strings.TrimSpace(in[f.Key])
		label := LabelFor(c, f)
		req := RequirementOf(c, f.Key)

		if req == NotApplicable {
			if raw != "" && !isFalsy(raw) {
				errs[f.Key] = fmt.Sprintf("%s tidak berlaku untuk %s.", label, strings.ToLower(c.Label()))
			}
			continue
		}
		if raw == "" {
			if req == Required {
				errs[f.Key] = label + " wajib diisi."
			}
			continue
		}

		var val any
		var msg string
		switch f.Type {
		case TypeInt:
			min, max := f.Min, f.Max
			switch f.Key {
			case "bedrooms":
				if c != Apartemen {
					min = 1 // 0 (studio) only for apartments
				}
			case "year_built":
				min, max = 1950, float64(year)
			case "hgb_expiry_year":
				min, max = float64(year), float64(year+80)
			}
			val, msg = parseIntField(label, raw, min, max)
		case TypeDecimal:
			val, msg = parseDecimalField(label, raw, f.Min, f.Max)
		case TypeBool:
			val, msg = parseBoolField(label, raw)
		case TypeEnum:
			if OptionLabel(f, raw) == "" {
				msg = label + " tidak valid. Pilih salah satu dari daftar."
			} else {
				val = raw
			}
		case TypeText:
			if n := len([]rune(raw)); n > f.MaxLen {
				msg = fmt.Sprintf("%s maksimal %d karakter.", label, f.MaxLen)
			} else {
				val = raw
			}
		}
		if msg != "" {
			errs[f.Key] = msg
			continue
		}
		if f.IsColumn {
			out.Columns[f.Key] = val
		} else {
			out.JSON[f.Key] = val
		}
	}

	// HGB expiry only makes sense for HGB certificates.
	if _, has := out.JSON["hgb_expiry_year"]; has && errs["hgb_expiry_year"] == "" {
		if out.JSON["certificate"] != "hgb" {
			errs["hgb_expiry_year"] = "Masa Berlaku HGB hanya diisi untuk sertifikat HGB."
			delete(out.JSON, "hgb_expiry_year")
		}
	}
	return out, errs
}

func isFalsy(s string) bool {
	switch strings.ToLower(s) {
	case "0", "false", "tidak", "off", "no":
		return true
	}
	return false
}

func parseBoolField(label, raw string) (any, string) {
	switch strings.ToLower(raw) {
	case "1", "true", "ya", "on", "yes":
		return true, ""
	case "0", "false", "tidak", "off", "no":
		return false, ""
	}
	return nil, label + " harus Ya atau Tidak."
}

// ParseInt accepts Indonesian thousand separators ("2.200", "2 200"). Commas are rejected.
func ParseInt(raw string) (int, error) {
	s := strings.NewReplacer(".", "", " ", "").Replace(strings.TrimSpace(raw))
	if s == "" || strings.ContainsAny(s, ",") {
		return 0, fmt.Errorf("not an integer: %q", raw)
	}
	n, err := strconv.Atoi(s)
	if err != nil {
		return 0, fmt.Errorf("not an integer: %q", raw)
	}
	return n, nil
}

// ParseDecimal accepts "72,5", "72.5" and thousand-separated "1.250,5" / "1.000".
// A lone dot is a decimal point only when followed by one or two digits;
// "1.000" is read as one thousand.
func ParseDecimal(raw string) (float64, error) {
	s := strings.ReplaceAll(strings.TrimSpace(raw), " ", "")
	if s == "" {
		return 0, fmt.Errorf("empty")
	}
	switch {
	case strings.Contains(s, ","):
		s = strings.ReplaceAll(s, ".", "")
		s = strings.Replace(s, ",", ".", 1)
	case strings.Count(s, ".") > 1:
		s = strings.ReplaceAll(s, ".", "")
	case strings.Count(s, ".") == 1:
		if i := strings.IndexByte(s, '.'); len(s)-i-1 == 3 {
			s = strings.ReplaceAll(s, ".", "")
		}
	}
	v, err := strconv.ParseFloat(s, 64)
	if err != nil || math.IsNaN(v) || math.IsInf(v, 0) {
		return 0, fmt.Errorf("not a number: %q", raw)
	}
	return math.Round(v*100) / 100, nil
}

func parseIntField(label, raw string, min, max float64) (any, string) {
	n, err := ParseInt(raw)
	if err != nil {
		return nil, label + " harus berupa bilangan bulat."
	}
	if float64(n) < min {
		return nil, fmt.Sprintf("%s minimal %s.", label, num(min))
	}
	if float64(n) > max {
		return nil, fmt.Sprintf("%s maksimal %s.", label, num(max))
	}
	return n, ""
}

func parseDecimalField(label, raw string, min, max float64) (any, string) {
	v, err := ParseDecimal(raw)
	if err != nil {
		return nil, label + " harus berupa angka."
	}
	if v <= min && min == 0 {
		return nil, label + " harus lebih dari 0."
	}
	if v < min {
		return nil, fmt.Sprintf("%s minimal %s.", label, num(min))
	}
	if v > max {
		return nil, fmt.Sprintf("%s maksimal %s.", label, num(max))
	}
	return v, ""
}

// num formats a bound for messages with Indonesian thousand dots ("1.000.000").
func num(f float64) string {
	s := strconv.FormatFloat(f, 'f', -1, 64)
	neg := strings.HasPrefix(s, "-")
	s = strings.TrimPrefix(s, "-")
	intPart, frac, _ := strings.Cut(s, ".")
	var b strings.Builder
	for i, r := range intPart {
		if i > 0 && (len(intPart)-i)%3 == 0 {
			b.WriteByte('.')
		}
		b.WriteRune(r)
	}
	out := b.String()
	if frac != "" {
		out += "," + frac
	}
	if neg {
		out = "-" + out
	}
	return out
}
