// Package catalog holds the fixed business vocabulary of the property catalog:
// categories, statuses, districts, price presets and per-category specifications.
// It is pure (no I/O, no framework imports) so it can be shared by forms,
// validation, templates and the Excel export. See docs/SCHEMA.md §5.
package catalog

// Category is one of the six fixed property categories (docs/PRD.md §8).
type Category string

const (
	Rumah     Category = "rumah"
	Ruko      Category = "ruko"
	Apartemen Category = "apartemen"
	Villa     Category = "villa"
	Gudang    Category = "gudang"
	Lahan     Category = "lahan"
)

// Categories lists all categories in display order.
var Categories = []Category{Rumah, Ruko, Apartemen, Villa, Gudang, Lahan}

var categoryLabels = map[Category]string{
	Rumah: "Rumah", Ruko: "Ruko", Apartemen: "Apartemen",
	Villa: "Villa", Gudang: "Gudang", Lahan: "Lahan",
}

// Label returns the Indonesian display name.
func (c Category) Label() string { return categoryLabels[c] }

// Valid reports whether c is one of the fixed categories.
func (c Category) Valid() bool { _, ok := categoryLabels[c]; return ok }

// ParseCategory converts a URL/form slug into a Category.
func ParseCategory(slug string) (Category, bool) {
	c := Category(slug)
	return c, c.Valid()
}

// Photo and listing limits shared by the image pipeline, validation and DB checks.
const (
	MinPhotos = 1
	MaxPhotos = 8

	PhotoMaxBytes      = 300 * 1024 // 307200, matches property_photos CHECK
	PhotoMaxLandscapeW = 1280
	PhotoMaxLandscapeH = 720
	ThumbMaxBytes      = 60 * 1024 // 61440
	ThumbMaxLandscapeW = 640
	ThumbMaxLandscapeH = 360

	MinPriceRupiah int64 = 1_000_000
	MaxPriceRupiah int64 = 1_000_000_000_000
)

// Status is the sale state of a property.
type Status string

const (
	Available Status = "available"
	Sold      Status = "sold"
)

// Label returns the Indonesian display name.
func (s Status) Label() string {
	if s == Sold {
		return "Terjual"
	}
	return "Tersedia"
}

// Valid reports whether s is a known status.
func (s Status) Valid() bool { return s == Available || s == Sold }
