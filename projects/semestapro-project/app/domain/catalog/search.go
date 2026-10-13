package catalog

// PriceRange is a preset price filter. Min/Max of 0 mean "unbounded".
type PriceRange struct {
	Key      string
	Label    string
	Min, Max int64
}

// PriceRanges are the presets shown in the filter panel (docs/PRD.md FR-SRC-04).
var PriceRanges = []PriceRange{
	{"bawah-300jt", "Di bawah Rp 300 Juta", 0, 300_000_000},
	{"300-500jt", "Rp 300 – 500 Juta", 300_000_000, 500_000_000},
	{"500jt-1m", "Rp 500 Juta – 1 Miliar", 500_000_000, 1_000_000_000},
	{"1m-2m", "Rp 1 – 2 Miliar", 1_000_000_000, 2_000_000_000},
	{"2m-5m", "Rp 2 – 5 Miliar", 2_000_000_000, 5_000_000_000},
	{"atas-5m", "Di atas Rp 5 Miliar", 5_000_000_000, 0},
}

// PriceRangeByKey looks up a preset by its URL key.
func PriceRangeByKey(key string) (PriceRange, bool) {
	for _, r := range PriceRanges {
		if r.Key == key {
			return r, true
		}
	}
	return PriceRange{}, false
}

// NormalizeBounds swaps min and max when both are set and min > max (FR-SRC-04).
func NormalizeBounds(min, max int64) (int64, int64) {
	if min > 0 && max > 0 && min > max {
		return max, min
	}
	return min, max
}

// Sort is a result ordering.
type Sort string

const (
	SortNewest    Sort = "terbaru"
	SortPriceAsc  Sort = "harga-terendah"
	SortPriceDesc Sort = "harga-tertinggi"
)

// Sorts lists the options in display order.
var Sorts = []Sort{SortNewest, SortPriceAsc, SortPriceDesc}

// Label returns the Indonesian display name.
func (s Sort) Label() string {
	switch s {
	case SortPriceAsc:
		return "Harga Terendah"
	case SortPriceDesc:
		return "Harga Tertinggi"
	default:
		return "Terbaru"
	}
}

// ParseSort returns the sort for a query value, defaulting to newest.
func ParseSort(v string) Sort {
	for _, s := range Sorts {
		if string(s) == v {
			return s
		}
	}
	return SortNewest
}
