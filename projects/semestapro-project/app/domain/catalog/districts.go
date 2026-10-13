package catalog

// District is a kecamatan of Kota Batam. The seeder and URL validation both read
// this list so there is a single source of truth (docs/SCHEMA.md §4.2).
type District struct {
	ID   int
	Slug string
	Name string
}

// Districts lists the 12 kecamatan of Kota Batam in alphabetical order.
var Districts = []District{
	{1, "batam-kota", "Batam Kota"},
	{2, "batu-aji", "Batu Aji"},
	{3, "batu-ampar", "Batu Ampar"},
	{4, "belakang-padang", "Belakang Padang"},
	{5, "bengkong", "Bengkong"},
	{6, "bulang", "Bulang"},
	{7, "galang", "Galang"},
	{8, "lubuk-baja", "Lubuk Baja"},
	{9, "nongsa", "Nongsa"},
	{10, "sagulung", "Sagulung"},
	{11, "sei-beduk", "Sei Beduk"},
	{12, "sekupang", "Sekupang"},
}

// DistrictBySlug returns the district for a URL slug.
func DistrictBySlug(slug string) (District, bool) {
	for _, d := range Districts {
		if d.Slug == slug {
			return d, true
		}
	}
	return District{}, false
}
