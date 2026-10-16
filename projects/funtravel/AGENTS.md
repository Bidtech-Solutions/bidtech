# AGENTS.md — Fun Travel & Transport Website

Instruksi untuk semua coding agent (Claude Code, Codex, Cursor, dll.). Baca ini sebelum mengubah kode.

## Ringkasan

Website company profile **statis** untuk **PT Fun Batam Holiday** (brand **FUN TRAVEL & TRANSPORT**), dikerjakan Bidtech. Dua layanan: **paket liburan Batam / Batam–Bintan** (wisatawan Malaysia & Singapura, harga dasar MYR) dan **sewa kendaraan** (mobil dengan sopir, motor lepas kunci; harga dasar IDR). Tujuan utama setiap halaman: konversi ke WhatsApp admin.

Dokumen (baca sesuai tugas): `docs/PRD.md` (bisnis & scope) · `docs/ARCHITECTURE.md` (struktur, **anggaran anti-melebar**, deploy) · `docs/DESIGN.md` (token & UI).

## Prinsip nomor satu: tetap ramping

Proyek ini sengaja **kecil dan tidak modular**. Versi sebelumnya runtuh karena terlalu banyak komponen/util. Anda cepat, jadi Anda berisiko melebarkan proyek — jangan.

- Komponen hanya 4: `header`, `footer`, `cta`, `whatsapp-floater`. Composable hanya 1: `useSite.ts`.
- **Jangan** membuat komponen/composable/util/folder baru, `index.ts`/`types.ts`/`constants.ts`/`helpers.ts`, atau skrip build. Komponen baru hanya bila dipakai ≥ 3 tempat, >25 baris, tidak bisa dengan Tailwind — dan lewat ADR di `docs/ARCHITECTURE.md` §15.
- Tidak ada folder `scripts/ server/ shared/ generated/ utils/ plugins/ middleware/ deploy/`.
- Perubahan konten: JSON (`app/assets/data`) → i18n → halaman. Jangan "merapikan" dengan mengekstrak potongan halaman. Duplikasi kecil lebih baik daripada abstraksi dini.
- Halaman ±300 baris = peringatan; 400 = batas. Atasi dengan memindahkan data ke JSON/i18n.
- Akhiri setiap tugas dengan daftar **file yang ditambah/dihapus** dan alasannya.

## Perintah

> **npm 11 wajib** (`packageManager: npm@11.21.0`): `npm install -g npm@11.21.0`.

```bash
npm install          # postinstall: nuxt prepare
npm run dev          # http://localhost:3000/en
npm run typecheck    # nuxt typecheck
npm run generate     # nuxt generate → .output/public (prerender failOnError)
npm run preview      # sajikan .output/public (tanpa redirect Nginx)
npm run verify       # typecheck + generate — WAJIB lolos sebelum selesai

# Uji image + redirect bahasa (Nginx container):
docker compose up -d --build && curl -sI -H 'CF-IPCountry: MY' http://127.0.0.1:3050/
```

Untuk perubahan UI: buka `npm run dev` di 360/375 dan 1280 px; konsol harus bebas *Hydration mismatch*. Mengubah `nginx.conf` → uji dengan `docker compose up --build` (atau job `image` di CI).

## Aturan keras

### Statis
- Hanya `nuxt generate` (preset `static`). **Dilarang**: `server/`, `ssr: false`, `routeRules` swr/isr, fetch data saat runtime untuk isi halaman, middleware.
- Route dinamis baru wajib masuk daftar prerender di `nuxt.config.ts` (dibangun dari JSON). Slug tak dikenal → `createError({ statusCode: 404, fatal: true })`.
- SSR dan klien harus identik: **jangan** membaca `window/document/localStorage/cookie/Date.now()` saat render. Perubahan state klien (`ft-currency`, `ft-rates`) hanya di `initClient()` (dipanggil `onNuxtReady`).
- URL **tanpa trailing slash**. Tautan internal pakai `useLocalePath()` / `<NuxtLink :to="localePath(...)">`; jangan menulis `/en/...` manual.
- URL situs dari `useSiteConfig().url` (`NUXT_PUBLIC_SITE_URL`), bukan `process.env` di kode klien.

### Bahasa (`id`, `en`, `ms`, `zh`)
- **Tidak ada teks UI hard-coded.** Teks UI → `app/i18n/locales/{id,en,my,zh}.json` (`t()`); konten produk → objek `L10n` di JSON data (`loc(v)`).
- Menambah key = menambah ke **keempat** file (CI menggagalkan bila tidak paritas). Hindari `@ | { }` di teks biasa (karakter vue-i18n).
- Kode locale **`ms`**, tetapi berkasnya **`my.json`**. Jangan membuat locale `my`.
- `ms` = Bahasa Melayu Malaysia (*pakej*, *tempahan*, *percutian*), bukan bahasa Indonesia. `zh` = Mandarin Sederhana gaya Singapura. Terjemahan baru dari agent diberi catatan "perlu review penutur asli" di ringkasan.

### Mata uang
- Mata uang tidak pernah masuk URL. Paket: dasar MYR, tampil MYR/SGD (IDR → MYR + catatan). Kendaraan: dasar IDR, tampil IDR/MYR/SGD.
- Semua konversi/format lewat `useSite()` (`pkgPrice`, `vehPrice`, `fmt`). Pembulatan **selalu ke atas** (MYR/SGD ke unit, IDR ke Rp 1.000). Harga dalam mata uang dasar tidak dibulatkan ulang.
- JSON-LD selalu pakai mata uang dasar.

### Data & aturan bisnis
- Sumber data: `app/assets/data/*.json`. Halaman, JSON-LD, `llms.txt`, dan pesan WhatsApp **harus** membaca dari sini — jangan menyalin harga/fasilitas ke template.
- Mobil = dengan sopir; motor = lepas kunci (diturunkan dari `type`). Jangan membuat toggle.
- Setiap kartu & detail paket menampilkan catatan terminal ferry (harga dari terminal Malaysia; add-on dari Singapura).
- Jumlah destinasi yang dapat dipilih = `maxDestinations` paket (jangan hard-code). Destinasi adalah bagian `packages.json`; tidak ada halaman destinasi.
- Paket memakai label "Mulai dari/From". Surcharge & keperluan pribadi = exclude; tip seikhlasnya = catatan.
- **Jangan mengarang** harga, nama hotel, testimoni, rating, alamat, nomor izin, atau destinasi. Data belum ada (lihat Open Questions di PRD) → `null` + tampilan fallback ("Tanyakan admin") + komentar `TODO(OQ-xx)`.
- Nomor rekening, QRIS, dan nomor admin hanya dari `site.json`.

### SEO / AEO / GEO
- Canonical/hreflang/og dari `useLocaleHead` di layout; sitemap, robots, `llms.txt` dari modul di `nuxt.config.ts` — **jangan** menulis ulang dengan server route/skrip.
- Judul & deskripsi tiap halaman via `useSeoMeta` dengan key i18n. Halaman detail: answer text 2–3 kalimat faktual di atas konten + JSON-LD (`TouristTrip`/`Product` + `BreadcrumbList`).
- Satu `<h1>` per halaman; heading berurutan. Tidak ada `AggregateRating`/`Review` tanpa ulasan asli.

### Desain & aksesibilitas
- Tailwind utility di template. CSS tulisan tangan hanya di `app/assets/css/main.css` (token `@theme`, `@font-face`, `@utility`, kasus khusus). Jangan hex lepas; pakai token (`bg-sun`, `text-navy`, …).
- Jangan teks kuning di atas latar terang. Target WCAG 2.2 AA. Hormati `prefers-reduced-motion`; carousel tanpa autoplay.
- Foto lewat `img('packages/a4-1.webp')` (file di `app/assets/images/`, WebP sudah dioptimasi). Belum ada → placeholder `.ph` berlabel. **Jangan** memakai poster AI klien sebagai foto.
- Ikon: `@lucide/vue`.

### Privasi & keamanan
- Form hanya membangun URL `wa.me`; tidak ada data dikirim ke server.
- Tidak ada secret di repo. Env: `NUXT_PUBLIC_SITE_URL`, `NUXT_PUBLIC_GA_ID`.
- Domain pihak ketiga baru → perbarui CSP di `nginx.conf`.

## Konvensi kode

- `<script setup lang="ts">`, TypeScript strict, tanpa `any`. Alias `~/` = `app/`.
- Nama file komponen **kebab-case** (`whatsapp-floater.vue`) dan dipakai sebagai `<WhatsappFloater />`; composable `useXxx`; slug URL kebab-case Inggris.
- Commit: Conventional Commits (`feat:`, `fix:`, `content:`, `chore:`, `docs:`); perubahan harga/paket memakai `content:`.

## Tugas umum

| Tugas | Langkah |
|---|---|
| Ubah harga/fasilitas paket | `packages.json` → `npm run verify` → cek detail paket & pesan WA |
| Tambah kendaraan | entri di `vehicles.json` + foto `app/assets/images/vehicles/<slug>-1.webp`, `images: ["vehicles/<slug>-1.webp"]` |
| Tambah destinasi | `packages.json` → `destinations[]`, rujuk id di `packages[].destinations` |
| Tambah teks UI | key yang sama di 4 `locales/*.json` |
| Ubah kontak/rekening | `site.json` saja |
| Tambah halaman | konfirmasi scope di PRD → `app/pages/…` + prerender di `nuxt.config.ts` + i18n |
| Ubah redirect/cache/CSP | `nginx.conf` → smoke test |

## Deploy (ringkas)

Workflow `.github/workflows/deploy-funtravel.yml` (di root repo): verify → image (smoke test, push GHCR) → VPS `docker compose pull && up -d --wait` → purge Cloudflare. Rollback: Run workflow dengan `image_tag`. `/` **wajib bypass cache** di Cloudflare. Jangan menjalankan perintah Docker destruktif global di VPS bersama. Detail: `docs/ARCHITECTURE.md` §12.
