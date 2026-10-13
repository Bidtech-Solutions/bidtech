package view

import (
	"html/template"
	"io/fs"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"testing"
)

const viewsDir = "../../../resources/views"

func loadViews(t *testing.T) *template.Template {
	t.Helper()
	root := template.New("root").Funcs(Funcs(Deps{PublicDir: "../../../public"}))
	err := filepath.WalkDir(viewsDir, func(p string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() || !strings.HasSuffix(p, ".tmpl") {
			return err
		}
		b, err := os.ReadFile(p)
		if err != nil {
			return err
		}
		// AGENTS.md §6: the define name must equal the relative file path.
		rel, _ := filepath.Rel(viewsDir, p)
		rel = filepath.ToSlash(rel)
		if !strings.Contains(string(b), `{{ define "`+rel+`" }}`) {
			t.Errorf("%s: missing {{ define %q }}", rel, rel)
		}
		_, err = root.Parse(string(b))
		return err
	})
	if err != nil {
		t.Fatal(err)
	}
	return root
}

func TestViewsParseAndHomeRenders(t *testing.T) {
	root := loadViews(t)
	data := map[string]any{
		"Meta": map[string]any{
			"Title": "T", "Description": "D", "Canonical": "https://x.test/", "Robots": "index, follow",
			"OGType": "website", "Image": "", "ImageAlt": "", "Schema": []any{map[string]any{"@type": "WebSite"}},
		},
		"Site": map[string]any{
			"Name": "Semesta Pro", "LegalName": "PT", "Address": "Jl", "MapsURL": "https://m.test",
			"WhatsApp": "628", "PhoneDisplay": "0812", "Email": "a@b.c", "Instagram": "https://i.test", "Facebook": "https://f.test",
		},
		"Year": 2026,
	}
	var b strings.Builder
	if err := root.ExecuteTemplate(&b, "public/home.tmpl", data); err != nil {
		t.Fatal(err)
	}
	out := b.String()
	for _, want := range []string{`<html lang="id">`, `<h1 id="hero-title"`, `rel="canonical"`, `application/ld+json`, `id="isi"`, `Lewati ke isi halaman`} {
		if !strings.Contains(out, want) {
			t.Errorf("home output missing %q", want)
		}
	}
}

// AGENTS.md rule 8: no loose colours in templates.
var looseColour = regexp.MustCompile(`#[0-9a-fA-F]{6}\b|rgba?\(`)

func TestNoLooseColoursInViews(t *testing.T) {
	_ = filepath.WalkDir(viewsDir, func(p string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() || !strings.HasSuffix(p, ".tmpl") {
			return err
		}
		b, _ := os.ReadFile(p)
		for _, m := range looseColour.FindAllString(string(b), -1) {
			// theme-color meta needs a literal hex; it mirrors primary-900.
			if m == "#0A2F66" && strings.HasSuffix(p, "seo_head.tmpl") {
				continue
			}
			t.Errorf("%s: loose colour %q (use design tokens)", p, m)
		}
		return nil
	})
}
