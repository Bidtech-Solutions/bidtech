package catalog

import (
	"strings"
	"testing"
	"time"
)

var now = time.Date(2026, 10, 13, 9, 0, 0, 0, time.UTC)

func TestCategories(t *testing.T) {
	if len(Categories) != 6 {
		t.Fatalf("want 6 categories, got %d", len(Categories))
	}
	for _, c := range Categories {
		if !c.Valid() || c.Label() == "" {
			t.Errorf("category %q invalid", c)
		}
	}
	if _, ok := ParseCategory("tanah"); ok {
		t.Error("tanah must not parse")
	}
}

func TestDistrictsMatchSchemaSeed(t *testing.T) {
	if len(Districts) != 12 {
		t.Fatalf("want 12 districts, got %d", len(Districts))
	}
	seen := map[string]bool{}
	for i, d := range Districts {
		if d.ID != i+1 {
			t.Errorf("district %s id = %d, want %d", d.Slug, d.ID, i+1)
		}
		if seen[d.Slug] {
			t.Errorf("duplicate slug %s", d.Slug)
		}
		seen[d.Slug] = true
	}
	if d, ok := DistrictBySlug("sekupang"); !ok || d.Name != "Sekupang" {
		t.Error("sekupang lookup failed")
	}
}

func TestMatrixCoversAllFieldsAndCategories(t *testing.T) {
	for _, f := range fields {
		row, ok := matrix[f.Key]
		if !ok {
			t.Errorf("matrix missing %s", f.Key)
			continue
		}
		if len(row) != len(Categories) {
			t.Errorf("matrix row %s has len %d", f.Key, len(row))
		}
	}
	if len(matrix) != len(fields) {
		t.Errorf("matrix has %d rows, fields %d", len(matrix), len(fields))
	}
}

func TestEveryCategoryHasRequiredBasics(t *testing.T) {
	for _, c := range Categories {
		if RequirementOf(c, "certificate") == NotApplicable && c != Gudang {
			// certificate applies to all (optional for villa/gudang)
			t.Errorf("%s: certificate should apply", c)
		}
		if len(FieldsFor(c)) == 0 {
			t.Errorf("%s has no fields", c)
		}
	}
	if RequirementOf(Lahan, "building_area_m2") != NotApplicable {
		t.Error("lahan must not have building area")
	}
	if RequirementOf(Apartemen, "land_area_m2") != NotApplicable {
		t.Error("apartemen must not have land area")
	}
}

func TestApartmentLabel(t *testing.T) {
	for _, fs := range FieldsFor(Apartemen) {
		if fs.Key == "building_area_m2" && fs.Label != "Luas Unit" {
			t.Errorf("label = %q", fs.Label)
		}
	}
}

func TestValidateRumahOK(t *testing.T) {
	in := map[string]string{
		"land_area_m2": "120", "building_area_m2": "72,5", "bedrooms": "3", "bathrooms": "2",
		"floors": "2", "electricity_watt": "2.200", "certificate": "hgb", "facing": "east",
		"furnishing": "semi", "carport_capacity": "1", "is_hook": "ya", "hgb_expiry_year": "2045",
	}
	got, errs := Validate(Rumah, in, now)
	if len(errs) != 0 {
		t.Fatalf("unexpected errors: %v", errs)
	}
	if got.Columns["land_area_m2"] != 120.0 || got.Columns["building_area_m2"] != 72.5 {
		t.Errorf("columns = %v", got.Columns)
	}
	if got.Columns["bedrooms"] != 3 || got.JSON["electricity_watt"] != 2200 {
		t.Errorf("parsed = %v / %v", got.Columns, got.JSON)
	}
	want := `{"floors":2,"electricity_watt":2200,"certificate":"hgb","facing":"east","furnishing":"semi","carport_capacity":1,"is_hook":true,"hgb_expiry_year":2045}`
	if s := got.EncodeJSON(); s != want {
		t.Errorf("json =\n%s\nwant\n%s", s, want)
	}
}

func TestValidateRequiredMissing(t *testing.T) {
	_, errs := Validate(Rumah, map[string]string{}, now)
	for _, k := range []string{"land_area_m2", "building_area_m2", "bedrooms", "bathrooms", "floors", "certificate"} {
		if !strings.HasSuffix(errs[k], "wajib diisi.") {
			t.Errorf("%s error = %q", k, errs[k])
		}
	}
	if len(errs) != 6 {
		t.Errorf("want 6 errors, got %d: %v", len(errs), errs)
	}
}

func TestValidateNotApplicableRejected(t *testing.T) {
	in := map[string]string{"land_area_m2": "500", "certificate": "shm", "bedrooms": "2"}
	_, errs := Validate(Lahan, in, now)
	if !strings.Contains(errs["bedrooms"], "tidak berlaku untuk lahan") {
		t.Errorf("bedrooms error = %q", errs["bedrooms"])
	}
	// "0"/"tidak" on a not-applicable bool is harmless (unchecked checkbox values)
	_, errs = Validate(Lahan, map[string]string{"land_area_m2": "500", "certificate": "shm", "has_private_pool": "0"}, now)
	if len(errs) != 0 {
		t.Errorf("falsy N/A bool should pass: %v", errs)
	}
}

func TestValidateStudioOnlyForApartments(t *testing.T) {
	rumah := map[string]string{"land_area_m2": "100", "building_area_m2": "60", "bedrooms": "0", "bathrooms": "1", "floors": "1", "certificate": "shm"}
	if _, errs := Validate(Rumah, rumah, now); errs["bedrooms"] == "" {
		t.Error("rumah with 0 bedrooms must fail")
	}
	apt := map[string]string{"building_area_m2": "28", "bedrooms": "0", "bathrooms": "1", "certificate": "shmsrs"}
	if _, errs := Validate(Apartemen, apt, now); len(errs) != 0 {
		t.Errorf("studio apartment should pass: %v", errs)
	}
}

func TestValidateHGBExpiryRules(t *testing.T) {
	base := func() map[string]string {
		return map[string]string{"land_area_m2": "100", "building_area_m2": "60", "bedrooms": "2", "bathrooms": "1", "floors": "1"}
	}
	in := base()
	in["certificate"], in["hgb_expiry_year"] = "shm", "2040"
	if _, errs := Validate(Rumah, in, now); errs["hgb_expiry_year"] == "" {
		t.Error("expiry with SHM must fail")
	}
	in = base()
	in["certificate"], in["hgb_expiry_year"] = "hgb", "2020"
	if _, errs := Validate(Rumah, in, now); !strings.Contains(errs["hgb_expiry_year"], "minimal 2.026") {
		t.Errorf("past expiry error = %q", errs["hgb_expiry_year"])
	}
	in["hgb_expiry_year"] = "2050"
	if _, errs := Validate(Rumah, in, now); len(errs) != 0 {
		t.Errorf("valid hgb expiry failed: %v", errs)
	}
}

func TestValidateEnumAndTextAndBounds(t *testing.T) {
	in := map[string]string{
		"land_area_m2": "0", "building_area_m2": "abc", "bedrooms": "2,5", "bathrooms": "99",
		"floors": "1", "certificate": "bogus", "facing": "up",
	}
	_, errs := Validate(Rumah, in, now)
	checks := map[string]string{
		"land_area_m2":     "harus lebih dari 0",
		"building_area_m2": "harus berupa angka",
		"bedrooms":         "bilangan bulat",
		"bathrooms":        "maksimal 50",
		"certificate":      "tidak valid",
		"facing":           "tidak valid",
	}
	for k, sub := range checks {
		if !strings.Contains(errs[k], sub) {
			t.Errorf("%s error = %q, want substring %q", k, errs[k], sub)
		}
	}
	long := strings.Repeat("a", 61)
	_, errs = Validate(Apartemen, map[string]string{"building_area_m2": "30", "bedrooms": "1", "bathrooms": "1", "certificate": "shmsrs", "tower_name": long}, now)
	if !strings.Contains(errs["tower_name"], "maksimal 60 karakter") {
		t.Errorf("tower_name error = %q", errs["tower_name"])
	}
}

func TestParseDecimal(t *testing.T) {
	tests := map[string]float64{
		"72,5": 72.5, "72.5": 72.5, "72.50": 72.5, "1.000": 1000, "1.250,5": 1250.5,
		"1.250.000": 1250000, "120": 120, " 15 ": 15, "0,75": 0.75,
	}
	for in, want := range tests {
		got, err := ParseDecimal(in)
		if err != nil || got != want {
			t.Errorf("ParseDecimal(%q) = %v, %v; want %v", in, got, err, want)
		}
	}
	for _, bad := range []string{"", "abc", "1,2,3", "--5", "NaN", "Inf"} {
		if _, err := ParseDecimal(bad); err == nil {
			t.Errorf("ParseDecimal(%q) should fail", bad)
		}
	}
}

func TestParseInt(t *testing.T) {
	if n, err := ParseInt("2.200"); err != nil || n != 2200 {
		t.Errorf("got %d, %v", n, err)
	}
	for _, bad := range []string{"", "2,5", "x", "1e3"} {
		if _, err := ParseInt(bad); err == nil {
			t.Errorf("ParseInt(%q) should fail", bad)
		}
	}
}

func TestPriceRanges(t *testing.T) {
	r, ok := PriceRangeByKey("500jt-1m")
	if !ok || r.Min != 500_000_000 || r.Max != 1_000_000_000 {
		t.Errorf("range = %+v", r)
	}
	for i := 1; i < len(PriceRanges); i++ {
		if PriceRanges[i].Min != PriceRanges[i-1].Max {
			t.Errorf("gap between presets %d and %d", i-1, i)
		}
	}
	if min, max := NormalizeBounds(900, 100); min != 100 || max != 900 {
		t.Error("bounds not swapped")
	}
	if min, max := NormalizeBounds(0, 100); min != 0 || max != 100 {
		t.Error("open min must be kept")
	}
}

func TestParseSort(t *testing.T) {
	if ParseSort("harga-terendah") != SortPriceAsc || ParseSort("???") != SortNewest {
		t.Error("sort parsing")
	}
}
