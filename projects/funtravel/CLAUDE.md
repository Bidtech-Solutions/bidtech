# CLAUDE.md

@AGENTS.md

## Konteks tambahan untuk Claude Code

- Proyek klien Bidtech: **PT Fun Batam Holiday — FUN TRAVEL & TRANSPORT**. Website statis **Nuxt 4** (SSG), 4 bahasa (`id`, `en`, `ms`, `zh`) via @nuxtjs/i18n, 3 mata uang (IDR, MYR, SGD). Jangan memakai pola Next/React.
- Dokumen rinci: @docs/PRD.md · @docs/ARCHITECTURE.md · @docs/DESIGN.md — baca bagian yang relevan; jangan memuat semuanya untuk tugas kecil.
- Pola halaman detail kendaraan merujuk nadimtrans.com/kendaraan/[slug] (proyek Bidtech sebelumnya), tetapi **tanpa** toggle lepas kunci/dengan sopir.

## Alur kerja

1. Ubah data dulu (`app/assets/data/*.json`), lalu i18n, lalu halaman. **Edit file yang ada**; file baru adalah pengecualian yang harus dijelaskan.
2. Setelah mengubah halaman: `npm run verify`; untuk UI cek `npm run dev` di 375 dan 1280 px, konsol bebas *Hydration mismatch*.
3. Setelah mengubah teks UI: key ada di keempat `locales/*.json` (`ms` ada di `my.json`).
4. Bergantung pada Open Questions (`docs/PRD.md` §11)? Jangan menebak — buat fallback dan tanda `TODO(OQ-xx)`, lalu laporkan.
5. Ringkasan akhir: apa yang berubah, **file ditambah/dihapus**, dan hal yang perlu review penutur asli.

## Hal yang sering terlewat

- npm 11 (bukan 10) untuk `npm install`/`npm ci`.
- Anggaran struktur: ≤ 4 komponen, 1 composable, tanpa folder baru (`docs/ARCHITECTURE.md` §2). Godaan terbesar: mengekstrak `PackageCard`, `Price`, `Breadcrumbs`, `AnswerBox` — jangan.
- URL tanpa trailing slash; tautan internal lewat `useLocalePath()`.
- Route dinamis baru → daftarkan di `nuxt.config.ts` (prerender), bukan hanya di halaman.
- Catatan terminal ferry di setiap kartu & detail paket.
- Pembulatan konversi kurs ke atas; IDR ke kelipatan Rp 1.000.
- Teks Melayu bukan bahasa Indonesia (*pakej*, *tempahan*, *percutian*).
- Mengubah `nginx.conf` → uji lewat container; mengubah CSP bila menambah domain pihak ketiga.
