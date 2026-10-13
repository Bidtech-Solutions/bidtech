// Package format renders numbers, money, phones and dates the Indonesian way
// (docs/DESIGN.md §10). Pure functions, no framework imports.
package format

import (
	"math"
	"strconv"
	"strings"
	"time"
	_ "time/tzdata" // embed tz database so Asia/Jakarta works in a static binary
	"unicode"
)

// Thousands formats n with dot thousand separators: 1250000 -> "1.250.000".
func Thousands(n int64) string {
	neg := n < 0
	s := strconv.FormatInt(n, 10)
	if neg {
		s = s[1:]
	}
	var b strings.Builder
	for i, r := range s {
		if i > 0 && (len(s)-i)%3 == 0 {
			b.WriteByte('.')
		}
		b.WriteRune(r)
	}
	if neg {
		return "-" + b.String()
	}
	return b.String()
}

// Rupiah renders the full price: "Rp 850.000.000".
func Rupiah(n int64) string { return "Rp " + Thousands(n) }

// trimDecimal renders v with at most 2 decimals, comma separated, trailing zeros removed.
func trimDecimal(v float64) string {
	s := strconv.FormatFloat(math.Round(v*100)/100, 'f', 2, 64)
	s = strings.TrimRight(strings.TrimRight(s, "0"), ".")
	return strings.Replace(s, ".", ",", 1)
}

// RupiahShort renders compact prices: "Rp 850 Juta", "Rp 1,25 Miliar", "Rp 500.000".
func RupiahShort(n int64) string {
	switch {
	case n >= 1_000_000_000:
		v := math.Round(float64(n)/1e9*100) / 100
		whole, frac := math.Modf(v)
		if frac == 0 {
			return "Rp " + Thousands(int64(whole)) + " Miliar"
		}
		return "Rp " + Thousands(int64(whole)) + strings.TrimPrefix(trimDecimal(frac), "0") + " Miliar"
	case n >= 1_000_000:
		v := math.Round(float64(n)/1e6*100) / 100
		if v >= 1000 { // e.g. 999.999.999 rounds up to 1.000 Juta
			return "Rp 1 Miliar"
		}
		return "Rp " + trimDecimal(v) + " Juta"
	default:
		return Rupiah(n)
	}
}

// Area renders square metres: "120 m²", "72,5 m²".
func Area(v float64) string { return trimDecimal(v) + " m²" }

// Percent renders "7,5%".
func Percent(v float64) string { return trimDecimal(v) + "%" }

// DigitsOnly keeps only the digits of s.
func DigitsOnly(s string) string {
	var b strings.Builder
	for _, r := range s {
		if unicode.IsDigit(r) {
			b.WriteRune(r)
		}
	}
	return b.String()
}

// NormalizePhone converts a local or international Indonesian mobile number to
// E.164 ("+6281285552016"). ok is false when the result is not 10–14 digits.
func NormalizePhone(raw string) (string, bool) {
	d := DigitsOnly(raw)
	switch {
	case strings.HasPrefix(d, "62"):
	case strings.HasPrefix(d, "0"):
		d = "62" + d[1:]
	case strings.HasPrefix(d, "8"):
		d = "62" + d
	default:
		return "", false
	}
	if len(d) < 10 || len(d) > 14 {
		return "", false
	}
	return "+" + d, true
}

// PhoneDisplay renders a number as local format in groups of four: "0812-8555-2016".
func PhoneDisplay(raw string) string {
	d := DigitsOnly(raw)
	if strings.HasPrefix(d, "62") {
		d = "0" + d[2:]
	}
	var parts []string
	for len(d) > 4 {
		parts = append(parts, d[:4])
		d = d[4:]
	}
	if d != "" {
		parts = append(parts, d)
	}
	return strings.Join(parts, "-")
}

var (
	monthsLong  = [...]string{"Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"}
	monthsShort = [...]string{"Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"}
)

// Jakarta is the display time zone (WIB). Falls back to a fixed +7 zone.
var Jakarta = func() *time.Location {
	if l, err := time.LoadLocation("Asia/Jakarta"); err == nil {
		return l
	}
	return time.FixedZone("WIB", 7*3600)
}()

// DateID renders "10 Oktober 2026" in WIB.
func DateID(t time.Time) string {
	t = t.In(Jakarta)
	return strconv.Itoa(t.Day()) + " " + monthsLong[t.Month()-1] + " " + strconv.Itoa(t.Year())
}

// DateTimeID renders "10 Okt 2026, 14.05 WIB".
func DateTimeID(t time.Time) string {
	t = t.In(Jakarta)
	return strconv.Itoa(t.Day()) + " " + monthsShort[t.Month()-1] + " " + strconv.Itoa(t.Year()) +
		", " + t.Format("15.04") + " WIB"
}

// ParseRupiah reads a user-typed amount such as "850.000.000", "Rp 850.000.000"
// or "850000000". Decimals are not allowed.
func ParseRupiah(raw string) (int64, bool) {
	d := DigitsOnly(raw)
	if d == "" || len(d) > 15 {
		return 0, false
	}
	n, err := strconv.ParseInt(d, 10, 64)
	return n, err == nil
}
