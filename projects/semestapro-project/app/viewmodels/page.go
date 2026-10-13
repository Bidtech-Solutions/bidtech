package viewmodels

import (
	"strings"

	"semestapro/app/facades"
)

// Site reads the business identity from config/site.go.
func Site() SiteInfo {
	c := facades.Config()
	return SiteInfo{
		Name:         c.GetString("site.name"),
		LegalName:    c.GetString("site.legal_name"),
		Tagline:      c.GetString("site.tagline"),
		URL:          strings.TrimRight(c.GetString("site.url"), "/"),
		WhatsApp:     c.GetString("site.whatsapp"),
		PhoneDisplay: c.GetString("site.phone_display"),
		Email:        c.GetString("site.email"),
		Address:      c.GetString("site.address"),
		MapsURL:      c.GetString("site.maps_url"),
		Instagram:    c.GetString("site.instagram"),
		Facebook:     c.GetString("site.facebook"),
	}
}

// Page builds the standard template data: .Meta and .Site plus page-specific
// fields from extra. Keys in extra never override the standard ones.
func Page(meta Meta, extra map[string]any) map[string]any {
	site := Site()
	if meta.Canonical != "" && !strings.HasPrefix(meta.Canonical, "http") {
		meta.Canonical = site.URL + meta.Canonical
	}
	if meta.Robots == "" {
		meta.Robots = RobotsIndex
	}
	if meta.OGType == "" {
		meta.OGType = "website"
	}
	data := make(map[string]any, len(extra)+2)
	for k, v := range extra {
		data[k] = v
	}
	data["Meta"] = meta
	data["Site"] = site
	return data
}
