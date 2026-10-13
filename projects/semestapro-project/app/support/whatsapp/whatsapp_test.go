package whatsapp

import (
	"net/url"
	"strings"
	"testing"
)

func TestLink(t *testing.T) {
	got := Link("+62 812-8555-2016", "Halo & selamat siang")
	if !strings.HasPrefix(got, "https://wa.me/6281285552016?text=") {
		t.Fatalf("link = %s", got)
	}
	if strings.Contains(got, "+") && strings.Contains(strings.SplitN(got, "?", 2)[1], "+") {
		t.Errorf("plus signs must be %%20: %s", got)
	}
	u, err := url.Parse(got)
	if err != nil {
		t.Fatal(err)
	}
	if u.Query().Get("text") != "Halo & selamat siang" {
		t.Errorf("text round-trip = %q", u.Query().Get("text"))
	}
	if Link("0812", "") != "https://wa.me/0812" {
		t.Error("empty message must omit text")
	}
}

func TestPropertyInquiry(t *testing.T) {
	p := Property{
		Code: "SP-00012", Title: "Rumah 2 Lantai Siap Huni di Tiban Indah", Price: "Rp 850.000.000",
		Location: "Tiban Indah, Sekupang, Batam", URL: "https://semestapro.co.id/properti/x-sp-00012",
	}
	msg := PropertyInquiry(p)
	for _, want := range []string{"Kode: SP-00012", "Harga: Rp 850.000.000", "Lokasi: Tiban Indah, Sekupang, Batam", "Tautan: https://semestapro.co.id/properti/x-sp-00012", "Apakah properti ini masih tersedia?"} {
		if !strings.Contains(msg, want) {
			t.Errorf("message missing %q:\n%s", want, msg)
		}
	}
	p.Sold = true
	if !strings.Contains(PropertyInquiry(p), "sudah terjual") {
		t.Error("sold message")
	}
}
