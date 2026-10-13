package view

import (
	"html/template"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func render(t *testing.T, d Deps, tpl string, data any) string {
	t.Helper()
	tm, err := template.New("t").Funcs(Funcs(d)).Parse(tpl)
	if err != nil {
		t.Fatal(err)
	}
	var b strings.Builder
	if err := tm.Execute(&b, data); err != nil {
		t.Fatal(err)
	}
	return b.String()
}

func TestHelpers(t *testing.T) {
	dir := t.TempDir()
	if err := os.WriteFile(filepath.Join(dir, "a.css"), []byte("body{}"), 0o600); err != nil {
		t.Fatal(err)
	}
	d := Deps{
		MediaURL:      func() string { return "https://img.example.com/" },
		PublicDir:     dir,
		WhatsAppPhone: func() string { return "6281285552016" },
	}
	cases := []struct{ tpl, want string }{
		{`{{ rupiah 1250000000 }}`, "Rp 1.250.000.000"},
		{`{{ media "/p/1.webp" }}`, "https://img.example.com/p/1.webp"},
		{`{{ add 1 2 }}-{{ sub 5 2 }}`, "3-3"},
		{`{{ range seq 1 3 }}{{ . }}{{ end }}`, "123"},
		{`{{ with dict "a" 1 "b" 2 }}{{ .a }}{{ .b }}{{ end }}`, "12"},
		{`{{ nl2p "a\n\n<b>\nc" }}`, "<p>a</p><p>&lt;b&gt;<br>c</p>"},
		{`{{ asset "missing.css" }}`, "/static/missing.css"},
	}
	for _, c := range cases {
		if got := render(t, d, c.tpl, nil); got != c.want {
			t.Errorf("%s = %q, want %q", c.tpl, got, c.want)
		}
	}
	if got := render(t, d, `{{ asset "a.css" }}`, nil); !strings.HasPrefix(got, "/static/a.css?v=") || len(got) != len("/static/a.css?v=")+10 {
		t.Errorf("asset hash url = %q", got)
	}
	if got := render(t, d, `<script type="application/ld+json">{{ jsonLD . }}</script>`, map[string]string{"x": "</script>"}); strings.Contains(got, "</script></script>") || !strings.Contains(got, `</script`) {
		t.Errorf("jsonLD not escaped: %q", got)
	}
}
