package config

import (
	"semestapro/app/facades"
)

// Konfigurasi situs: identitas bisnis, kontak, dan pengaturan SEO/AEO/GEO.
// Semua nilai bisa diubah lewat .env tanpa mengubah kode. Lihat docs/PRD.md §6.1.
func init() {
	config := facades.Config()
	config.Add("site", map[string]any{
		"name":       "Semesta Pro",
		"legal_name": "PT. Cipta Semesta Baru",
		"tagline":    "Titip Jual-Beli Hunian Secondary di Batam",
		"url":        config.Env("APP_URL", "http://localhost:3000"),
		"locale":     "id_ID",

		// Zona waktu tampilan. Penyimpanan tetap UTC (docs/SCHEMA.md D12).
		"timezone": "Asia/Jakarta",

		// Kontak (nomor WhatsApp tanpa "+" dan tanpa spasi, format internasional).
		"whatsapp":      config.Env("SITE_WHATSAPP", "6281285552016"),
		"phone_display": config.Env("SITE_PHONE_DISPLAY", "0812-8555-2016"),
		"email":         config.Env("SITE_EMAIL", "darsonhutagalung20@gmail.com"),
		"address":       config.Env("SITE_ADDRESS", "Komp. Ruko Tanah Mas Blok C No.6, Sei Panas, Batam 29444"),
		"maps_url":      config.Env("SITE_MAPS_URL", "https://maps.app.goo.gl/cs7yhZyvHdCoqpij7"),
		"instagram":     config.Env("SITE_INSTAGRAM", "https://www.instagram.com/semestapro.perty/"),
		"facebook":      config.Env("SITE_FACEBOOK", "https://www.facebook.com/p/SemestaPro-Batam-PT-Cipta-Semesta-Baru-61560938402647/"),

		// security.txt (RFC 9116)
		"security_contact": config.Env("SECURITY_CONTACT", "security@semestapro.co.id"),

		// Crawler AI yang diizinkan di robots.txt (docs/ARCHITECTURE.md §9.5).
		"ai_crawlers_allowed": config.Env("AI_CRAWLERS_ALLOWED", true),
		"ai_crawlers": []string{
			"GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot",
			"Claude-User", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot",
		},

		// Simulasi KPR (docs/PRD.md §6.4.2).
		"kpr": map[string]any{
			"default_rate":         config.Env("KPR_DEFAULT_RATE", 7.5),
			"default_dp_percent":   config.Env("KPR_DEFAULT_DP", 20),
			"default_tenor_months": config.Env("KPR_DEFAULT_TENOR_MONTHS", 180),
		},

		// Pipeline gambar (docs/ARCHITECTURE.md §8).
		"image_max_concurrency": config.Env("IMAGE_MAX_CONCURRENCY", 2),
	})
}
