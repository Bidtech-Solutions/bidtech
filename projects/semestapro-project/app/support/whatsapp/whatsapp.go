// Package whatsapp builds wa.me links and the prefilled messages from
// docs/PRD.md §6.4.1.
package whatsapp

import (
	"net/url"
	"strings"
)

// Link returns https://wa.me/<digits>?text=<message>. phone may be in any
// notation; only digits are kept.
func Link(phone, message string) string {
	var digits strings.Builder
	for _, r := range phone {
		if r >= '0' && r <= '9' {
			digits.WriteRune(r)
		}
	}
	link := "https://wa.me/" + digits.String()
	if message == "" {
		return link
	}
	// wa.me renders "+" literally in some clients; always use %20 for spaces.
	return link + "?text=" + strings.ReplaceAll(url.QueryEscape(message), "+", "%20")
}

// Property carries the facts included in a property inquiry.
type Property struct {
	Code     string // SP-00012
	Title    string
	Price    string // already formatted, e.g. "Rp 850.000.000"
	Location string // "Tiban Indah, Sekupang, Batam"
	URL      string // absolute public URL
	Sold     bool
}

// PropertyInquiry builds the message for the detail-page WhatsApp button.
func PropertyInquiry(p Property) string {
	var b strings.Builder
	b.WriteString("Halo Semesta Pro, saya tertarik dengan properti berikut:\n\n")
	b.WriteString("Kode: " + p.Code + "\n")
	b.WriteString(p.Title + "\n")
	if p.Price != "" {
		b.WriteString("Harga: " + p.Price + "\n")
	}
	if p.Location != "" {
		b.WriteString("Lokasi: " + p.Location + "\n")
	}
	b.WriteString("Tautan: " + p.URL + "\n\n")
	if p.Sold {
		b.WriteString("Properti ini sudah terjual. Apakah ada properti serupa yang masih tersedia?")
	} else {
		b.WriteString("Apakah properti ini masih tersedia?")
	}
	return b.String()
}

// General is the message for header/footer contact buttons.
const General = "Halo Semesta Pro, saya ingin bertanya tentang properti yang dijual."

// TitipJual is the message for the "Titip Jual via WhatsApp" CTA.
const TitipJual = "Halo Semesta Pro, saya ingin menitipkan properti saya untuk dijual. Mohon informasi langkah selanjutnya."

// Search is the message for the empty-results "Minta Dicarikan" button.
func Search(query string) string {
	if strings.TrimSpace(query) == "" {
		return "Halo Semesta Pro, mohon bantu carikan properti sesuai kebutuhan saya."
	}
	return "Halo Semesta Pro, saya mencari properti: " + query + ". Mohon dibantu carikan."
}
