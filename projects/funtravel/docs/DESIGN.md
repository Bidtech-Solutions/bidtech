# DESIGN — Website Fun Travel & Transport

Panduan visual & UX. Arah final dipilih klien dari draft Google Stitch; token di bawah adalah **fondasi bersama**, lalu diperbarui setelah klien memilih.

> **Implementasi ramping.** Semua blok UI di bawah (kartu, harga, panel pemesanan, dst.) adalah **bagian dari halaman** (`app/pages/*.vue`) yang disusun dengan utilitas Tailwind — bukan komponen terpisah. Komponen hanya `header`, `footer`, `cta`, `whatsapp-floater` (`ARCHITECTURE.md` §2). Token ada di `app/assets/css/main.css` (`@theme`); jangan memakai hex lepas di template.

---

## 1. Esensi Brand

| | |
|---|---|
| Kepribadian | Ceria, hangat, tropis, dapat dipercaya |
| Janji | "Fun Holiday with Fun Travel" — liburan tanpa repot, semua sudah diurus |
| Tagline yang sudah dipakai klien | *Your Best Travel Partner* · *Fun Trip, Fun Travel* · *Explore, Eat, Relax, Repeat* · *Sewa Transport Lengkap untuk Perjalanan Anda* |
| Pilar kepercayaan | Safe & Comfortable · Best Price · Your Happiness Our Priority |
| Nada | Ramah & bersemangat di judul; jelas, faktual, tanpa istilah samar di harga/S&K |

**Tantangan desain:** poster klien sangat ramai (brush stroke, banyak warna, teks bertumpuk). Website harus **mewarisi energinya** tanpa mewarisi kepadatannya — energi di hero, aksen, dan ilustrasi; kejelasan di harga, fasilitas, dan form.

## 2. Warna

Diambil dari logo (perkiraan sampling — kunci ulang dari file vektor bila tersedia).

| Token (Tailwind) | Hex | Peran |
|---|---|---|
| `sun` | `#FFC81E` | Kuning utama logo — highlight, badge harga, tombol sekunder |
| `sun-deep` | `#F59E0B` | Gradasi kuning→oranye |
| `ocean` | `#1E4FD8` | Biru royal — tombol primer, link |
| `navy` | `#0B1B4D` | Teks judul, header gelap, footer |
| `sky` | `#38A8F0` | Latar section, ilustrasi gelombang |
| `palm` | `#2E8B3E` | Ikon "termasuk" (✓), aksen tropis |
| `coral` | `#E5484D` | Ikon "tidak termasuk" (✕), label promo |
| `orchid` | `#E2337A` | Magenta "Bintan" — penanda paket Batam + Bintan |
| `sand` | `#FFF7E6` | Latar hangat section |
| `ink` | `#1A2233` | Teks badan |
| `muted` | `#5B6478` | Teks sekunder |
| `wa` / `wa-dark` | `#25D366` / `#128C7E` | Tombol WhatsApp |

Pemakaian: `bg-sun`, `text-navy`, `border-ocean/20`, dst. Putih memakai `white` bawaan Tailwind.

Warna per kode paket (dari katalog) dipakai sebagai aksen kartu lewat field `accent` di `packages.json` → atribut `data-accent` → variabel `--accent` di `main.css` (A1 biru, A2 hijau, A3 magenta, A4 oranye, B1 tosca, B2 ungu).

**Aturan kontras (WCAG AA):**
- ❌ Teks kuning di atas putih/langit. ✔ Teks navy di atas kuning.
- Tombol primer: teks putih di `ocean` (≥ 4,5:1). Tombol WhatsApp: hijau WhatsApp `#25D366` dengan teks/ikon navy gelap, atau `#128C7E` dengan teks putih.
- Harga besar boleh kuning **hanya** di atas navy/biru tua.

Mode gelap tidak wajib di fase 1 (website marketing berwarna cerah); bila salah satu draft Stitch berbasis navy gelap dipilih, token di atas tetap berlaku dengan latar `navy`.

## 3. Tipografi

| Peran | Font (Latin: id/en/ms) | Bobot | Catatan |
|---|---|---|---|
| Display / judul | **Plus Jakarta Sans** (woff2 variabel lokal) | 700–800 | Tegas, modern, mendukung angka harga yang besar |
| Aksen script (hemat) | **Kaushan Script** (woff2 lokal, kelas `font-script`) | 400 | Gema huruf "Fun Travel" di logo; hanya untuk 1–3 kata ("Fun Holiday", "Explore"), tidak untuk paragraf |
| Badan | Plus Jakarta Sans | 400–600 | 16 px minimal di mobile |
| Angka harga | Plus Jakarta Sans, `font-variant-numeric: tabular-nums` | 800 | |

**Mandarin (`zh`):** pakai system stack `"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif` — tidak memuat font CJK (ukuran file terlalu besar). Font script tidak dipakai pada teks Mandarin.

Skala (mobile → desktop): H1 36→60, H2 28→40, H3 22→28, body 16→18, small 14, price-xl 40→56.

## 4. Bentuk, Ruang, Elevasi

- Kontainer `wrap` (maks 1200 px, gutter 16/24 px) dan `section` (jarak vertikal) dari `main.css`; carousel memakai `.snap-row`.
- Spasi berbasis 4 px: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Radius: kartu 20 px (`rounded-card`), tombol pill, input 12 px, foto polaroid 6 px.
- Bayangan lembut berwarna navy (`shadow-card`); hover naik 2 px.
- Garis luar putih tebal + bayangan seperti stiker untuk badge kode paket (gaya logo stiker).

## 5. Motif Visual

| Motif | Asal | Pemakaian |
|---|---|---|
| **Sapuan kuas (brush stroke)** | latar teks "Trip Batam 3D2N", harga | Di belakang 1 kata kunci di hero dan di belakang harga — maksimal 1 per layar |
| **Bingkai polaroid** | foto destinasi di poster | Strip destinasi, galeri destinasi dengan caption tulisan tangan |
| **Siluet palem & skyline** | logo | Ilustrasi pojok hero/footer, opacity rendah |
| **Gelombang laut** | latar poster | Pemisah antar section (SVG) |
| **Stiker label kode** | "PACKAGE A1" | Badge kode di kartu paket |

Foto: cerah, langit biru, air toska, orang yang menikmati liburan; hindari foto stok yang jelas bukan Batam/Bintan. **Jangan memakai poster AI klien sebagai foto** (teks tertanam, typo "BBATAM", detail tidak nyata).

## 6. Blok UI (bagian dari halaman, bukan komponen)

### 6.1 Header
- Kiri: logo (versi horizontal, tinggi 40 px mobile / 52 px desktop).
- Tengah (desktop): Paket · Kendaraan · Kontak.
- Kanan: **Pemilih Bahasa** (ikon globe + `EN`) dan **Pemilih Mata Uang** (`MYR ▾`) sebagai dua kontrol terpisah, lalu tombol "Chat WhatsApp".
- Mobile: logo + 2 pemilih ringkas + hamburger; menu layar penuh berlatar navy. Wajib muat di 360 px tanpa scroll horizontal (`field-sizing-content` pada `<select>`).
- Sticky, latar putih semi-transparan.

### 6.2 Harga
- Format: label kecil "Mulai dari / From / Dari / 起" + angka besar + satuan "/pax" atau "/hari".
- Mata uang hasil konversi diberi catatan kecil "Kurs per {tanggal}" (FR-05).
- Selalu ada teks, tidak pernah hanya gambar.

### 6.3 Kartu Paket
```
┌───────────────────────────────┐
│ [foto 4:3]          [A4] stiker│
│ ● Full Board   ● 3H2M          │  ← chip
│ Batam 3D2N (Full Board)        │
│ Mulai dari  RM 666 /pax        │  ← harga di atas brush stroke
│ ✓ Ferry PP + tax ✓ Hotel ★3    │
│ ✓ 4× makan      ✓ Tiket wisata │
│ ⓘ Dari terminal Malaysia       │
│ [ Lihat Detail ]  [ WhatsApp ] │
└───────────────────────────────┘
```
Aksen warna tepi kartu mengikuti warna kode paket.

### 6.4 Kartu Kendaraan
Foto 16:10 latar netral → kategori (MPV/SUV/Van/Skuter) → nama → baris spesifikasi ikon (kursi, koper, transmisi) → badge skema (**Dengan Sopir** biru / **Lepas Kunci** kuning) → harga per hari → tombol "Lihat Detail" (link ke `#galeri`).

### 6.5 Include / Exclude / Catatan
- Include: ikon hijau ✓ dalam lingkaran + label tebal + detail kecil (mis. "Ferry 2 arah — termasuk seaport tax").
- Exclude: ikon merah ✕ (gaya rambu dilarang, seperti poster).
- Catatan: ikon ⓘ biru (tip seikhlasnya, surcharge).
- **Kotak Terminal Ferry** (wajib di setiap paket): latar kuning muda, ikon kapal — "Harga berlaku dari terminal ferry Malaysia. Berangkat dari Singapura? Ada tambahan biaya (add-on)."

### 6.6 Pemilih Destinasi (di detail paket)
Grid kartu polaroid dengan checkbox; penghitung "2 dari 3 dipilih"; kartu tak bisa dipilih lagi saat batas tercapai (dengan pesan, bukan diam-diam dinonaktifkan). Data destinasi dari `packages.json`.

### 6.7 Panel Pemesanan (sticky di desktop, bottom sheet di mobile)
- Paket: tanggal, pax, terminal asal (segmented control Malaysia/Singapura), destinasi, catatan → ringkasan → tombol WhatsApp besar.
- Kendaraan: skema (read-only chip), tanggal mulai–selesai, jam antar, titik antar (select + input + "Gunakan lokasi saya"), ringkasan total → tombol WhatsApp → blok **Metode Pembayaran Resmi**.
- Ringkasan memakai tabel 2 kolom (label | nilai), seperti nadimtrans.

### 6.8 Metode Pembayaran (di `/contact#payment`)
Kartu QRIS (gambar asli, bisa diperbesar) + kartu rekening (logo bank, nomor dengan tombol salin, nama pemilik) + peringatan "Pembayaran hanya sah ke rekening/QRIS resmi ini."

### 6.9 Lainnya
- **Answer text:** kartu ringkasan di atas konten detail, latar `sand`, ikon ✦, 2–3 kalimat.
- **Tombol WhatsApp melayang:** kanan bawah, 56 px, label muncul saat hover/desktop ("Chat Admin").
- **Breadcrumbs** di halaman detail (juga `BreadcrumbList` JSON-LD).
- **FAQ:** accordion (`<details>`) di beranda (singkat) dan `/contact#faq` (lengkap).
- **Banner pasar** (locale `id` di halaman paket): biru muda, ikon paspor.

## 7. Tata Letak Halaman

**Beranda:** Hero (foto + headline "Explore Batam & Bintan" + script "Fun Holiday" + 2 CTA + chip "Dari Malaysia & Singapura") → Trust bar 4 ikon → Paket Terpopuler (carousel) → Banner sewa → Kendaraan Terpopuler (carousel) → Destinasi (polaroid) → Cara Pesan (3 langkah) → FAQ singkat → CTA akhir navy dengan kontak Admin 1/2 → Footer.

**Daftar Paket:** judul + intro → tab filter → grid kartu (1/2/3 kolom) → catatan terminal ferry.

**Detail Paket:** breadcrumbs → galeri → judul + chip + harga → answer text → (kiri) Include, Exclude, Catatan, Destinasi / (kanan, sticky di desktop) Panel Pemesanan → paket lain.

**Daftar Kendaraan:** tab Mobil/Motor → grid kartu → info syarat dokumen ringkas.

**Detail Kendaraan:** breadcrumbs → galeri (`#galeri`) → (kiri) nama, tagline, spesifikasi, syarat dokumen, peraturan sewa / (kanan, sticky) Panel Pemesanan + peringatan pembayaran → kendaraan lain.

**Kontak:** admin → sosial media → `#payment` (QRIS + rekening) → `#faq`.

## 8. Responsif

Breakpoint Tailwind bawaan (`sm 640`, `md 768`, `lg 1024`, `xl 1280`). Rancang **mobile-first** — mayoritas trafik dari Instagram/TikTok/WhatsApp. Di mobile panel pemesanan tampil di bawah konten, dan tombol WhatsApp melayang selalu terlihat. Uji di 360, 375, dan 1280 px.

## 9. Gerak

- Durasi 150–250 ms, easing `cubic-bezier(.2,.8,.2,1)`.
- Kartu naik saat hover; carousel geser dengan drag/swipe; tidak ada autoplay yang tak bisa dihentikan.
- Hormati `prefers-reduced-motion`.

## 10. Aksesibilitas

- Fokus terlihat (ring `ocean`).
- Semua ikon fungsional punya label; emoji tidak dipakai sebagai satu-satunya penanda.
- Form: label terlihat, pesan galat teks, `inputmode` tepat.
- Alt text diterjemahkan 4 bahasa (di data).
- `lang` benar di `<html>`; nama bahasa di switcher ditulis dalam bahasanya sendiri (Bahasa Indonesia, English, Bahasa Melayu, 简体中文).

## 11. Bahasa & Gaya Tulisan

| Locale | Panduan |
|---|---|
| `id` | Baku santai, sapaan "Anda" |
| `en` | Simple international English, kalimat pendek |
| `ms` | Bahasa Melayu Malaysia (bukan bahasa Indonesia): *pakej*, *tempahan*, *percutian*, *tiket lawatan*, *pemandu tempatan*. **Wajib direview penutur Malaysia** |
| `zh` | Mandarin Sederhana gaya Singapura, istilah wisata umum (配套, 渡轮, 包车); **wajib direview penutur** |

Istilah tetap: "3D2N/2D1N" dipertahankan di semua bahasa (dikenal pasar MY/SG), diikuti terjemahan ("3 Hari 2 Malam", "3天2夜").

## 12. Do & Don't

| ✔ Lakukan | ✕ Hindari |
|---|---|
| Satu fokus visual per layar | Menumpuk brush stroke, stiker, dan bayangan sekaligus |
| Harga, include/exclude sebagai teks HTML | Menempelkan poster sebagai gambar informasi |
| Logo versi stiker hanya di header/footer/hero | Mendistorsi atau memberi efek tambahan pada logo |
| Foto asli dari klien | Foto AI/stok yang tidak mencerminkan layanan nyata |
| Label skema sewa yang jelas | Menampilkan toggle "Lepas Kunci" untuk mobil |
