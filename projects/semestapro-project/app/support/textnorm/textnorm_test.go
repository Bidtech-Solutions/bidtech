package textnorm

import (
	"reflect"
	"strings"
	"testing"
)

func TestSlugify(t *testing.T) {
	cases := []struct {
		in   string
		max  int
		want string
	}{
		{"Rumah 2 Lantai Siap Huni di Tiban Indah", 80, "rumah-2-lantai-siap-huni-di-tiban-indah"},
		{"  Jl. Ahmad Yani -- Blok C/12!  ", 80, "jl-ahmad-yani-blok-c-12"},
		{"Café Résidence", 80, "cafe-residence"},
		{"日本語", 80, ""},
		{"rumah mewah dengan kolam renang pribadi dan taman luas dekat pusat kota batam", 40, "rumah-mewah-dengan-kolam-renang-pribadi"},
	}
	for _, c := range cases {
		got := Slugify(c.in, c.max)
		if got != c.want {
			t.Errorf("Slugify(%q) = %q, want %q", c.in, got, c.want)
		}
		if c.max > 0 && len(got) > c.max {
			t.Errorf("too long: %q", got)
		}
	}
}

func TestSearchTokens(t *testing.T) {
	got := SearchTokens("  Rumah   di  BATAM Centre  x ")
	want := []string{"rumah", "di", "batam", "centre"}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("got %v, want %v", got, want)
	}
	if n := len(SearchTokens("a1 b2 c3 d4 e5 f6 g7 h8 i9 j0")); n != MaxTokens {
		t.Errorf("tokens = %d, want %d", n, MaxTokens)
	}
	long := strings.Repeat("abc ", 60)
	if joined := strings.Join(SearchTokens(long), " "); len(joined) > MaxQueryLen {
		t.Errorf("query not truncated: %d", len(joined))
	}
	if SearchTokens("   ") != nil {
		t.Error("blank query must give no tokens")
	}
}

func TestEscapeLike(t *testing.T) {
	if got := EscapeLike(`50%_off\`); got != `50\%\_off\\` {
		t.Errorf("got %q", got)
	}
}
