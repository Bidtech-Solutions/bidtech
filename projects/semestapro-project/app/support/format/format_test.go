package format

import (
	"testing"
	"time"
)

func TestRupiah(t *testing.T) {
	cases := map[int64]string{850_000_000: "Rp 850.000.000", 0: "Rp 0", 1_250_000_000: "Rp 1.250.000.000"}
	for in, want := range cases {
		if got := Rupiah(in); got != want {
			t.Errorf("Rupiah(%d) = %q, want %q", in, got, want)
		}
	}
}

func TestRupiahShort(t *testing.T) {
	cases := map[int64]string{
		850_000_000:       "Rp 850 Juta",
		12_500_000:        "Rp 12,5 Juta",
		1_250_000_000:     "Rp 1,25 Miliar",
		3_000_000_000:     "Rp 3 Miliar",
		1_500_000_000:     "Rp 1,5 Miliar",
		999_999_999:       "Rp 1 Miliar",
		500_000:           "Rp 500.000",
		1_000_000:         "Rp 1 Juta",
		1_000_000_000_000: "Rp 1.000 Miliar",
	}
	for in, want := range cases {
		if got := RupiahShort(in); got != want {
			t.Errorf("RupiahShort(%d) = %q, want %q", in, got, want)
		}
	}
}

func TestAreaPercent(t *testing.T) {
	if Area(120) != "120 m²" || Area(72.5) != "72,5 m²" || Percent(7.5) != "7,5%" || Percent(20) != "20%" {
		t.Error("area/percent")
	}
}

func TestPhone(t *testing.T) {
	cases := map[string]string{
		"0812-8555-2016": "+6281285552016", "+62 812 8555 2016": "+6281285552016",
		"6281285552016": "+6281285552016", "81285552016": "+6281285552016",
	}
	for in, want := range cases {
		if got, ok := NormalizePhone(in); !ok || got != want {
			t.Errorf("NormalizePhone(%q) = %q, %v", in, got, ok)
		}
	}
	for _, bad := range []string{"", "12345", "abc", "0812"} {
		if _, ok := NormalizePhone(bad); ok {
			t.Errorf("NormalizePhone(%q) should fail", bad)
		}
	}
	if got := PhoneDisplay("+6281285552016"); got != "0812-8555-2016" {
		t.Errorf("PhoneDisplay = %q", got)
	}
}

func TestDates(t *testing.T) {
	// 2026-10-10 07:05 UTC = 14:05 WIB
	ts := time.Date(2026, 10, 10, 7, 5, 0, 0, time.UTC)
	if got := DateID(ts); got != "10 Oktober 2026" {
		t.Errorf("DateID = %q", got)
	}
	if got := DateTimeID(ts); got != "10 Okt 2026, 14.05 WIB" {
		t.Errorf("DateTimeID = %q", got)
	}
	// 20:00 UTC rolls over to next day in WIB
	if got := DateID(time.Date(2026, 12, 31, 20, 0, 0, 0, time.UTC)); got != "1 Januari 2027" {
		t.Errorf("rollover = %q", got)
	}
}

func TestParseRupiah(t *testing.T) {
	for in, want := range map[string]int64{"850.000.000": 850_000_000, "Rp 850.000.000": 850_000_000, "850000000": 850_000_000} {
		if got, ok := ParseRupiah(in); !ok || got != want {
			t.Errorf("ParseRupiah(%q) = %d, %v", in, got, ok)
		}
	}
	if _, ok := ParseRupiah("abc"); ok {
		t.Error("abc must fail")
	}
}
