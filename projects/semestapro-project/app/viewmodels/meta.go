// Package viewmodels prepares the data passed to templates so that templates stay
// free of business logic (docs/ARCHITECTURE.md §6).
package viewmodels

// Crumb is one breadcrumb item (also emitted as BreadcrumbList JSON-LD).
type Crumb struct {
	Name string
	URL  string
}

// Meta carries the SEO data of a public page (docs/ARCHITECTURE.md §9.1).
// Every public controller must fill it.
type Meta struct {
	Title       string
	Description string
	Canonical   string
	Robots      string
	OGType      string
	Image       string
	ImageAlt    string
	Breadcrumbs []Crumb
	Schema      []any
}

// Robots values.
const (
	RobotsIndex   = "index, follow, max-image-preview:large"
	RobotsNoindex = "noindex, follow"
)

// SiteInfo is the business identity shown in header, footer and JSON-LD.
type SiteInfo struct {
	Name         string
	LegalName    string
	Tagline      string
	URL          string
	WhatsApp     string
	PhoneDisplay string
	Email        string
	Address      string
	MapsURL      string
	Instagram    string
	Facebook     string
}
