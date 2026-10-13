# DESIGN — Semesta Pro

> Design system & briefing UI/UX. Sumber kebenaran untuk warna, tipografi, spacing, radius, komponen, dan pola interaksi. Dipakai bersama desain Google Stitch yang dipilih klien (lihat **Lampiran A**). Bila hasil Stitch bertentangan dengan aturan aksesibilitas di dokumen ini, **dokumen ini yang menang**.

---

## 1. Prinsip desain

Pengguna utama adalah **Gen X dan Boomer (45–70 tahun)** yang membuka dari HP Android kelas menengah atau laptop, sering dari tautan media sosial/WhatsApp. Lima prinsip, berurutan menurut prioritas:

1. **Terbaca dulu, cantik kemudian.** Teks besar, kontras tinggi, baris tidak terlalu panjang. Tidak ada abu-abu muda untuk teks.
2. **Satu layar, satu tujuan.** Setiap bagian punya satu aksi utama yang jelas. Kurangi pilihan yang tidak perlu.
3. **Jelas, bukan pintar.** Tombol berlabel kata, bukan ikon saja. Tidak ada interaksi tersembunyi (hover-only, gestur rahasia, carousel otomatis).
4. **Selalu beri tahu apa yang terjadi.** Loading terlihat, sukses dikonfirmasi, aksi berbahaya ditanya dulu, galat dijelaskan dengan bahasa manusia.
5. **Percaya diri & terpercaya.** Biru dari logo memberi rasa aman; jingga memberi kehangatan dan menandai hal penting. Foto nyata, harga dan status selalu terlihat.

## 2. Brand

- Logo: lingkaran dengan wordmark "SemestaPro", siluet gedung, atap rumah jingga, dan globe; teks melingkar "TITIP JUAL-BELI · PROPERTY BATAM", subjudul "HUNIAN SECONDARY".
- Header memakai **wordmark horizontal** (tanpa cincin teks melingkar) agar terbaca di tinggi 40–48 px. Versi lingkaran penuh dipakai di footer, favicon (disederhanakan), dan gambar OG.
- Ruang kosong minimum di sekitar logo = tinggi huruf "S".
- Logo di atas latar navy memakai versi putih/monokrom.
- Nama ditulis **"Semesta Pro"** di teks; "SemestaPro" hanya di logo.
- Tagline: **"Titip Jual-Beli Hunian Secondary di Batam"**.

## 3. Warna

### 3.1 Palet token

| Token | Hex | Peran |
|---|---|---|
| `primary-50` | `#EEF4FC` | Latar seksi lembut, chip filter aktif, latar ringkasan |
| `primary-100` | `#D6E4F7` | Garis/aksen lembut di atas latar biru muda |
| `primary-600` | `#0B4EA2` | **Biru utama**: tombol utama, tautan, elemen aktif, ring fokus |
| `primary-700` | `#083D80` | Hover/aktif tombol utama |
| `primary-900` | `#0A2F66` | **Navy**: judul, footer, CTA band, sidebar admin, teks di atas jingga |
| `accent-50` | `#FFF4E5` | Latar sorotan hangat |
| `accent-400` | `#F9A845` | Hover tombol jingga; ring fokus di atas latar navy |
| `accent-500` | `#F7941D` | **Jingga aksen**: badge "Terbaru", tombol sekunder hangat, garis aksen, ikon sorotan |
| `accent-700` | `#B45309` | Teks berwarna jingga di atas putih (jarang) |
| `success-50` | `#F0FDF4` | Latar notifikasi sukses |
| `success-700` | `#15803D` | **Tombol WhatsApp**, badge "Tersedia", ikon sukses |
| `success-800` | `#166534` | Hover tombol WhatsApp |
| `danger-50` | `#FEF2F2` | Latar galat |
| `danger-700` | `#B91C1C` | Badge "TERJUAL", tombol hapus, teks galat |
| `danger-800` | `#991B1B` | Hover tombol hapus |
| `neutral-900` | `#111827` | Teks utama |
| `neutral-700` | `#374151` | Teks sekunder, label |
| `neutral-600` | `#4B5563` | Teks keterangan kecil (paling muda yang diizinkan untuk teks) |
| `neutral-500` | `#6B7280` | **Border input** & ikon nonaktif (bukan teks isi) |
| `neutral-300` | `#D1D5DB` | Garis pemisah dekoratif, border kartu |
| `neutral-100` | `#F3F4F6` | Latar baris tabel bergaris, skeleton |
| `neutral-50` | `#F5F7FA` | Latar aplikasi admin, seksi alternatif |
| `white` | `#FFFFFF` | Latar halaman, kartu |

Mode terang saja (tidak ada dark mode di rilis 1).

### 3.2 Pasangan warna yang diizinkan (sudah diuji kontras WCAG)

| Teks / elemen | Di atas | Rasio | Status |
|---|---|---|---|
| `white` | `primary-600` | 8,0 : 1 | ✅ AA/AAA |
| `white` | `primary-700` | 10,6 : 1 | ✅ |
| `white` | `primary-900` | 13,0 : 1 | ✅ |
| `primary-900` | `accent-500` | 5,7 : 1 | ✅ |
| `primary-900` | `accent-400` | 6,7 : 1 | ✅ |
| `primary-900` | `accent-50` | 12,0 : 1 | ✅ |
| `accent-700` | `white` | 5,0 : 1 | ✅ |
| `white` | `success-700` | 5,0 : 1 | ✅ |
| `white` | `danger-700` | 6,5 : 1 | ✅ |
| `neutral-900` | `white` | 17,7 : 1 | ✅ |
| `neutral-700` | `white` / `neutral-50` | 10,3 / 9,6 : 1 | ✅ |
| `neutral-600` | `white` / `neutral-50` | 7,6 / 7,0 : 1 | ✅ |
| `primary-600` | `primary-50` | 7,2 : 1 | ✅ |
| `primary-100` (teks sidebar & footer) | `primary-900` | 10,1 : 1 | ✅ |
| `neutral-500` (border) | `white` | 4,8 : 1 | ✅ non-teks ≥ 3:1 |
| `primary-600` (ring fokus) | `white` | 8,0 : 1 | ✅ |
| `accent-400` (ring fokus) | `primary-900` | 6,7 : 1 | ✅ |
| ❌ `white` | `accent-500` | 2,3 : 1 | **DILARANG** |
| ❌ abu-abu lebih muda dari `neutral-600` (mis. `#9CA3AF`) sebagai teks | `white` | 2,5 : 1 | **DILARANG** |

**Aturan pemakaian:**
- Biru mendominasi (±60% elemen berwarna), jingga sebagai aksen (±10%), sisanya netral. Jingga **bukan** warna tombol aksi utama (tombol utama selalu biru; tombol kontak selalu hijau WhatsApp).
- **Teks di atas jingga selalu `primary-900`.**
- Warna **tidak pernah satu-satunya** pembawa makna: status "Terjual" = merah + teks "TERJUAL"; galat = merah + ikon + teks.
- Hijau hanya untuk WhatsApp dan status sukses/tersedia; merah hanya untuk terjual, hapus, dan galat.

## 4. Tipografi

### 4.1 Keluarga huruf

| Peran | Font | Bobot | Alasan |
|---|---|---|---|
| Judul (H1–H4), harga | **Plus Jakarta Sans** | 700, 800 | Dirancang di Indonesia, geometris ramah, tegas di ukuran besar |
| Isi, label, UI | **Atkinson Hyperlegible Next** (cadangan: Atkinson Hyperlegible, system-ui) | 400, 700 | Dirancang Braille Institute untuk pembaca dengan penglihatan rendah; huruf mirip (I/l/1, 0/O) dibedakan jelas |

Self-hosted woff2 subset latin, `font-display: swap`. Angka harga & tabel memakai `font-variant-numeric: tabular-nums`.

### 4.2 Skala

| Token | Mobile (< 768) | Desktop (≥ 1024) | Line-height | Bobot | Pemakaian |
|---|---|---|---|---|---|
| `display` | 36 px | 52 px | 1.15 | 800 | Judul hero |
| `h1` | 30 px | 40 px | 1.2 | 800 | Judul halaman (satu per halaman) |
| `h2` | 26 px | 32 px | 1.25 | 700 | Judul seksi |
| `h3` | 22 px | 24 px | 1.3 | 700 | Judul kartu/panel |
| `h4` | 20 px | 20 px | 1.35 | 700 | Sub-judul, judul dialog |
| `price-xl` | 32 px | 40 px | 1.1 | 800 | Harga di halaman detail |
| `price` | 22 px | 24 px | 1.2 | 800 | Harga di kartu |
| `body-lg` | 20 px | 20 px | 1.6 | 400 | Paragraf pengantar |
| `body` | **18 px** | **18 px** | 1.6 | 400 | **Teks isi default**, input, tombol |
| `body-sm` | 16 px | 16 px | 1.5 | 400/700 | Keterangan, label chip, meta kartu — **ukuran minimum mutlak** |

- **Tidak ada teks di bawah 16 px**, termasuk footer, legal, badge, label tabel, placeholder.
- Panjang baris paragraf maks. **70 karakter** (`max-width: 70ch`).
- Huruf kapital penuh hanya untuk badge pendek ("TERJUAL", "TERBARU") dengan `letter-spacing: 0.04em`.
- Kapitalisasi: **Title Case untuk tombol, menu, dan judul seksi** ("Lihat Semua Properti", "Properti Terbaru"); **sentence case untuk paragraf, label form, dan pesan** ("Harga bisa nego", "Suku bunga harus lebih dari 0%.").
- Tidak ada teks miring untuk paragraf panjang.

## 5. Spacing, grid, ukuran

### 5.1 Skala spacing (basis 4 px)

| Token | px | Pemakaian umum |
|---|---|---|
| `1` | 4 | Jarak ikon–teks rapat |
| `2` | 8 | Jarak ikon–teks, antar chip |
| `3` | 12 | Padding badge, jarak label–input |
| `4` | 16 | Padding dalam kecil, **gutter mobile**, jarak antar kolom form |
| `5` | 20 | Jarak antar item daftar spesifikasi |
| `6` | 24 | Padding kartu, gutter grid, jarak antar field form |
| `8` | 32 | Padding panel, **gutter desktop** |
| `12` | 48 | Padding vertikal seksi (mobile) |
| `16` | 64 | Padding vertikal seksi (desktop) |
| `24` | 96 | Hero (desktop) |

Hanya nilai di skala ini yang boleh dipakai.

### 5.2 Layout

| Breakpoint | Lebar | Kolom kartu | Gutter samping |
|---|---|---|---|
| `base` | < 640 | 1 | 16 px |
| `sm` | ≥ 640 | 2 | 16 px |
| `md` | ≥ 768 | 2 | 24 px |
| `lg` | ≥ 1024 | 3 | 32 px |
| `xl` | ≥ 1280 | 3 | 32 px |

- Kontainer konten maks. **1200 px**, di tengah. Halaman detail: kolom utama 2/3 + sidebar 1/3 (≥ 1024), satu kolom di bawahnya.
- Admin: sidebar tetap 280 px (≥ 1024), konten maks. 1280 px; < 1024 sidebar menjadi menu laci dengan tombol "Menu".
- Uji wajib di **360 px**, 390 px, 768 px, 1440 px. Tidak boleh ada scroll horizontal halaman.

### 5.3 Target sentuh & kontrol

| Elemen | Tinggi minimum |
|---|---|
| Tombol utama/sekunder | **52 px** (desktop & mobile) |
| Tombol kecil (aksi tabel) | 44 px, lebar ≥ 44 px |
| Input, select | 52 px |
| Chip filter | 44 px |
| Item menu/navigasi | 48 px |
| Jarak antar target sentuh | ≥ 8 px |

## 6. Radius, border, bayangan

| Token | Nilai | Pemakaian |
|---|---|---|
| `radius-sm` | 6 px | Badge, checkbox |
| `radius-md` | 8 px | Tombol, input, select, chip persegi |
| `radius-lg` | 12 px | Kartu properti, foto kartu, panel admin |
| `radius-xl` | 16 px | Dialog, panel pencarian hero, kartu harga |
| `radius-full` | 9999 px | Chip pill, avatar, spinner |

Nilai default di atas mengikuti **Gaya A**; gaya terpilih boleh menyesuaikan radius di Lampiran A, tetapi tetap memakai 5 token ini.

| Border | Nilai |
|---|---|
| Input, select, checkbox | 2 px `neutral-500`; fokus 2 px `primary-600` + ring |
| Kartu | 1 px `neutral-300` |
| Pemisah | 1 px `neutral-300` |
| Galat | 2 px `danger-700` |

| Bayangan | Nilai | Pemakaian |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgb(17 24 39 / .06)` | Kartu diam |
| `shadow-md` | `0 4px 12px rgb(17 24 39 / .10)` | Kartu hover, dropdown, bar lengket |
| `shadow-lg` | `0 16px 40px rgb(17 24 39 / .18)` | Dialog, panel pencarian hero |

## 7. Ikon, foto, ilustrasi

- **Ikon:** Lucide, garis 2 px, ukuran 24 px (20 px di dalam chip/badge, 32 px di kartu kategori). Ikon selalu didampingi teks; ikon dekoratif `aria-hidden="true"`.
- Ikon standar: Rumah `house`, Ruko `store`, Apartemen `building-2`, Villa `trees`, Gudang `warehouse`, Lahan `land-plot`; spesifikasi: `ruler` (luas), `bed-double`, `bath`, `layers` (lantai), `zap` (listrik), `file-badge` (sertifikat), `compass` (hadap), `sofa`, `car`; lokasi `map-pin`; WhatsApp memakai logo resmi WhatsApp (SVG).
- **Foto properti:** rasio **16:9** di kartu dan galeri (`object-fit: cover`), latar `neutral-100` saat memuat; selalu ada `width`/`height`; `alt` = judul properti + "foto n". Foto pertama halaman detail `fetchpriority="high"`, lainnya `loading="lazy"`.
- Foto properti terjual ditampilkan dengan `filter: saturate(.6)` + badge.
- **Foto staf:** rasio 4:5, latar netral seragam, wajah di sepertiga atas.
- **Hero:** foto jalan/rumah hunian Batam yang terang, overlay gradien `primary-900` 70% → 30% agar teks putih kontras ≥ 4,5:1 di semua titik.
- Ilustrasi hanya untuk keadaan kosong (gaya garis sederhana, biru + jingga).

## 8. Komponen

Setiap komponen punya satu template di `resources/views/components/` dan satu kelas komponen CSS. Status wajib untuk komponen interaktif: **default, hover, fokus, aktif, disabled, loading** (bila relevan).

### 8.1 Tombol

| Varian | Latar | Teks | Border | Pemakaian |
|---|---|---|---|---|
| `btn-primary` | `primary-600` → hover `primary-700` | white | – | Aksi utama: Cari, Simpan, Masuk, Lihat Detail |
| `btn-whatsapp` | `success-700` → hover `success-800` | white + ikon WhatsApp | – | Semua kontak WhatsApp |
| `btn-accent` | `accent-500` → hover `accent-400` | `primary-900` | – | Sorotan sekunder di CTA band (jarang) |
| `btn-outline` | white → hover `primary-50` | `primary-600` | 2 px `primary-600` | Aksi sekunder: Batal, Lihat Semua, Ekspor |
| `btn-outline-light` | transparan → hover white/10% | white | 2 px white | Aksi sekunder di latar navy |
| `btn-danger` | `danger-700` → hover `danger-800` | white | – | Konfirmasi hapus di dialog |
| `btn-text-danger` | transparan | `danger-700`, garis bawah saat hover | – | Tautan "Hapus" di tabel |
| `btn-text` | transparan | `primary-600`, garis bawah | – | "Hapus Semua Filter", "Kembali" |

- Tinggi 52 px, padding horizontal 24 px, teks `body` 700, ikon 24 px di kiri dengan jarak 8 px, radius `radius-md`.
- **Fokus:** `outline: 3px solid primary-600; outline-offset: 3px` (di latar navy: `accent-400`).
- **Disabled:** latar `neutral-100`, teks `neutral-600`, border `neutral-300`, kursor not-allowed. Hindari menonaktifkan tombol tanpa menjelaskan alasannya di dekatnya.
- **Loading:** spinner 20 px menggantikan ikon, label berubah ("Menyimpan…", "Mengunggah…", "Menghapus…", "Menyiapkan berkas…"), `aria-busy="true"`, tombol disabled, lebar tidak berubah.
- Di mobile, tombol aksi utama dalam form = lebar penuh.

### 8.2 Input & form

- Label **selalu terlihat di atas** input (bukan placeholder sebagai label), `body` 700 `neutral-900`. Tanda wajib ditulis "(wajib)" atau opsional "(opsional)" dalam teks `neutral-600` — tidak hanya bintang.
- Input: tinggi 52 px, padding 12×16 px, teks 18 px, border 2 px `neutral-500`, radius `radius-md`, latar white.
- Teks bantuan di bawah input: `body-sm` `neutral-600`.
- **Galat:** border `danger-700`, ikon `circle-alert` + pesan `body-sm` 700 `danger-700` di bawah input, `aria-invalid="true"`, `aria-describedby` ke pesan. Ringkasan galat di atas form (panel `danger-50`, judul "Periksa kembali isian berikut:", daftar tautan ke kolom), fokus dipindah ke ringkasan.
- Input angka uang: prefiks "Rp" di dalam kolom, pemisah ribuan titik saat mengetik, pratinjau ringkas di bawah ("Rp 850 Juta").
- Input persen: sufiks "%", menerima koma atau titik desimal.
- Satuan (m², Watt, m) sebagai sufiks di dalam kolom.
- Select memakai `<select>` native (aksesibel, familiar), ikon panah 24 px.
- Checkbox & radio: 24×24 px, seluruh label dapat diklik, area klik ≥ 44 px tinggi.
- Pemilih kategori di form admin: 6 **ubin** besar (ikon 32 px + label), radio di dalamnya, terpilih = border 2 px `primary-600` + latar `primary-50` + ikon centang.
- Form panjang dibagi bagian bernomor ("1. Informasi Utama") dalam panel terpisah; bar aksi lengket di bawah ("Batal" + "Simpan Properti").

### 8.3 Kartu properti

```
┌───────────────────────────────┐
│ [Rumah]          [TERBARU]    │  foto 16:9, radius-lg atas
│            (foto)             │
├───────────────────────────────┤
│ Rp 850 Juta                   │  price, primary-900
│ Rumah 2 Lantai Siap Huni di   │  h3 (maks. 2 baris, elipsis)
│ Tiban Indah                   │
│ ⌖ Tiban Indah, Sekupang       │  body-sm neutral-700
│ ─────────────────────────────  │
│ ▭ LT 120 m²   ▭ LB 90 m²      │  ikon + label teks, body-sm
│ ▭ 3 Kamar Tidur  ▭ 2 K. Mandi │
│ [        Lihat Detail       ] │  btn-outline lebar penuh
└───────────────────────────────┘
```

- Seluruh kartu dapat diklik (tautan pada judul dengan *stretched link*), tetapi tombol "Lihat Detail" tetap ada sebagai petunjuk yang jelas.
- Chip kategori: latar white 95%, teks `primary-900` `body-sm` 700, radius-full, di kiri atas foto.
- Badge "TERBARU" (≤ 14 hari): latar `accent-500`, teks `primary-900`.
- Spesifikasi kartu menurut kategori: Rumah/Villa → LT, LB, KT, KM · Ruko → LT, LB, Lantai · Apartemen → Luas Unit, KT, KM · Gudang → LT, LB, Listrik · Lahan → LT, Sertifikat.
- Hover (desktop): `shadow-md`, foto zoom 1.03 (dimatikan bila `prefers-reduced-motion`).

### 8.4 Badge status

| Badge | Latar | Teks | Ikon |
|---|---|---|---|
| Tersedia | `success-700` | white "TERSEDIA" | `circle-check` |
| Terjual | `danger-700` | white "TERJUAL" | `ban` |
| Terbaru | `accent-500` | `primary-900` "TERBARU" | – |
| Pilihan | `primary-900` | white "PILIHAN" | `star` |
| Master (admin) | `primary-900` | white "MASTER" | `lock` |
| Nonaktif (admin) | `neutral-100` | `neutral-700` "NONAKTIF" | `circle-slash` |

Ukuran: tinggi 32 px (28 px di kartu), padding 4×12 px, `body-sm` 700, radius-sm.

### 8.5 Panel pencarian & filter

- **Hero (beranda):** panel white, radius-xl, shadow-lg, padding 24 px; desktop satu baris: kata kunci (lebar) · Jenis · Kecamatan · tombol "Cari"; mobile bertumpuk lebar penuh.
- **Halaman hasil (desktop):** bar pencarian lebar penuh di atas; sidebar filter 320 px kiri dengan grup berjudul `h4`: "Jenis Properti" (radio besar), "Harga" (radio preset + 2 input), "Kecamatan" (select), tombol "Terapkan Filter" lebar penuh, "Hapus Semua Filter" (btn-text).
- **Mobile:** bar lengket di bawah header berisi tombol "Filter (2)" dan "Urutkan"; filter dibuka sebagai lembar layar penuh (`<dialog>`) dengan bar bawah lengket "Tampilkan 24 Properti" + "Hapus Semua".
- **Chip filter aktif:** latar `primary-50`, teks `primary-900`, border 1 px `primary-600`, tombol "×" dengan `aria-label="Hapus filter Sekupang"`, tinggi 44 px.

### 8.6 Galeri (detail properti)

- Foto utama 16:9, radius-lg; di bawahnya baris thumbnail (maks. 7) 96×54 px, thumbnail aktif border 3 px `primary-600`.
- Label posisi "Foto 3 dari 8" selalu terlihat.
- Tombol navigasi berlabel "‹ Sebelumnya" / "Berikutnya ›" (52 px), bukan hanya panah kecil di tepi foto.
- Tombol "Lihat Layar Penuh" membuka `<dialog>` latar hitam 95% dengan foto contain, tombol besar "Tutup ✕" di kanan atas, navigasi keyboard ← → Esc, geser sentuh.
- Tanpa JS: semua foto tampil berurutan vertikal.

### 8.7 Kartu harga & WhatsApp (detail)

- Desktop: sidebar lengket (top 24 px), panel white radius-xl shadow-md, padding 24 px: harga `price-xl` `primary-900`, harga lengkap `body` `neutral-700` ("Rp 850.000.000"), label "Harga bisa nego", badge status, tombol `btn-whatsapp` lebar penuh **"Hubungi via WhatsApp"**, teks bantuan, tombol `btn-outline` "Bagikan".
- Mobile: bar lengket bawah (tinggi 76 px, shadow-md atas, latar white): harga ringkas kiri, tombol WhatsApp kanan; konten halaman diberi padding bawah agar tidak tertutup.

### 8.8 Daftar spesifikasi

- `<dl>` dua kolom (desktop) / satu kolom (mobile); tiap baris: ikon 24 px `primary-600`, label `body` `neutral-700`, nilai `body` 700 `neutral-900` rata kanan; pemisah 1 px `neutral-300`; tinggi baris ≥ 56 px.
- Nilai kosong tidak ditampilkan. Boolean: "Ya"/"Tidak".

### 8.9 Kalkulator KPR

- Kartu white border `neutral-300` radius-lg padding 24 px, judul `h3` "Simulasi Cicilan KPR".
- Input: Harga Properti (hanya-baca, latar `neutral-50`), Uang Muka (% + nilai rupiah di bawah), Suku Bunga per Tahun (%), Jangka Waktu: 4 tombol pilihan 5/10/15/20 Tahun (toggle, terpilih = `primary-600` putih) + input bulan.
- Hasil: kotak `primary-50` radius-lg: label "Perkiraan Cicilan per Bulan" `body` 700, angka `price-xl` `primary-900`, di bawahnya baris Pokok Pinjaman & Total Pembayaran.
- Galat bunga 0: "Suku bunga harus lebih dari 0%." (pola galat §8.2), hasil menjadi "–".
- `aria-live="polite"` pada kotak hasil.
- Disclaimer `body-sm` `neutral-600`.

### 8.10 Dialog

Semua memakai `<dialog>` native, `aria-labelledby` judul, fokus awal ke tombol paling aman, Esc = Batal (kecuali loading), latar backdrop `rgb(17 24 39 / .6)`.

| Jenis | Ikon (48 px dalam lingkaran 72 px) | Judul | Tombol |
|---|---|---|---|
| Konfirmasi berbahaya | `triangle-alert` `danger-700` di `danger-50` | "Hapus Properti Ini?" | **"Batal"** (btn-outline, kiri, fokus awal) · **"Ya, Hapus"** (btn-danger, kanan) |
| Konfirmasi biasa | `circle-help` `primary-600` di `primary-50` | "Tandai Sebagai Terjual?" | "Batal" · "Ya, Tandai Terjual" (btn-primary) |
| Sukses | `circle-check` `success-700` di `success-50` | "Berhasil" | "OK" (btn-primary, fokus awal) |
| Galat | `circle-x` `danger-700` di `danger-50` | "Gagal Menyimpan" | "Tutup" · "Coba Lagi" bila relevan |
| Loading (overlay) | spinner 48 px `primary-600` | "Sedang mengunggah foto, mohon tunggu…" | tanpa tombol; progres bila ada |

- Lebar maks. 520 px (mobile: lebar penuh − 32 px), radius-xl, padding 32 px, shadow-lg; teks isi `body`; tombol 52 px; di mobile tombol bertumpuk lebar penuh dengan aksi utama di bawah.
- Isi konfirmasi **menyebut objeknya**: "Properti **SP-00012 Rumah 2 Lantai Siap Huni di Tiban Indah** beserta 8 fotonya akan dihapus permanen dan tidak bisa dikembalikan."
- Label tombol konfirmasi = kata kerja aksinya ("Ya, Hapus", "Ya, Nonaktifkan"), tidak pernah hanya "OK"/"Ya".
- Dialog sukses tidak menutup otomatis.

**Aksi yang wajib konfirmasi:** hapus properti, hapus foto, tandai terjual, batalkan terjual, nonaktifkan admin, atur ulang sandi admin lain, ganti kategori saat mengubah properti, keluar dari form yang belum disimpan, keluar (logout) bila ada form belum disimpan.

### 8.11 Tabel admin

- Header `body-sm` 700 `neutral-700` huruf biasa (bukan kapital), latar `neutral-50`, lengket saat scroll.
- Baris tinggi ≥ 64 px, teks `body`, garis 1 px `neutral-300`, hover `primary-50`.
- Kolom angka rata kanan, tabular-nums.
- Kolom aksi: tombol berlabel teks kecil (44 px): "Lihat", "Ubah", "Tandai Terjual"/"Batalkan Terjual", "Hapus" (btn-text-danger). Tidak memakai menu tiga titik.
- < 1024 px: setiap baris menjadi kartu bertumpuk dengan label kolom terlihat dan tombol aksi lebar penuh.
- Paginasi di bawah: "‹ Sebelumnya" · nomor halaman (44 px) · "Berikutnya ›" + teks "Menampilkan 1–20 dari 128".

### 8.12 Kartu statistik (dasbor)

- Panel white radius-lg padding 24 px, ikon 32 px dalam kotak `primary-50`, label `body` `neutral-700`, angka 36 px 800 `primary-900`, keterangan opsional `body-sm`.
- Grafik batang horizontal sederhana dengan label kategori & angka tertulis di ujung batang (biru = tersedia, jingga = terjual, dengan legenda teks). Tidak ada grafik pai.

### 8.13 Navigasi

- **Header publik:** tinggi 76 px (mobile 64 px), latar white, border bawah 1 px `neutral-300`, lengket saat scroll. Menu teks `body` 700 `neutral-900`, aktif = `primary-600` + garis bawah 3 px `accent-500`. Tombol "Hubungi Kami" `btn-whatsapp`.
- **Menu mobile:** tombol berlabel "Menu" (ikon + teks) → panel layar penuh, tautan 56 px, tombol WhatsApp di bawah, tombol "Tutup ✕".
- **Breadcrumb:** `body-sm`, pemisah "›", item terakhir tidak bertaut (`aria-current="page"`); di mobile disingkat ke item induk "‹ Rumah di Sekupang".
- **Sidebar admin:** latar `primary-900`, item 56 px dengan ikon + label, teks `primary-100`, aktif = latar `primary-700` + garis kiri 4 px `accent-500` + teks white. Bawah: nama pengguna + tombol "Keluar".
- **Skip link** "Langsung ke konten utama" muncul saat fokus.

### 8.14 CTA band (sebelum footer, semua halaman publik)

Latar `primary-900`, padding vertikal 64 px (48 mobile), judul `h2` white "Ingin Menjual Properti Anda?", teks `body-lg` `primary-100`, tombol `btn-whatsapp` "Titip Jual via WhatsApp" + `btn-outline-light` "Lihat Properti Dijual". Aksen garis/ornamen atap jingga tipis diizinkan.

### 8.15 Footer

Latar `primary-900` sedikit lebih gelap atau sama dengan CTA dipisah garis 1 px white/15%; teks `primary-100` `body`; judul kolom `h4` white; tautan white garis bawah saat hover; ikon sosial 24 px **dengan label**; bar bawah `body-sm` (tetap ≥ 16 px).

### 8.16 Keadaan kosong, loading, galat halaman

- **Kosong:** ilustrasi 160 px, judul `h3`, kalimat penjelasan, 1–2 tombol aksi.
- **Skeleton:** blok `neutral-100` berkedip lembut (matikan bila reduced motion) — hanya untuk bagian yang dimuat JS (mis. pratinjau foto); halaman SSR tidak butuh skeleton.
- **404/410/500:** judul jelas, satu kalimat, tombol "Kembali ke Beranda" dan "Cari Properti", layout publik penuh.

## 9. Pola halaman (ringkas)

| Halaman | Urutan blok |
|---|---|
| Beranda | Header · Hero + panel pencarian + 6 tombol kategori · Properti Terbaru (6) · Properti Pilihan (opsional) · Cari Berdasarkan Jenis · Cari Berdasarkan Lokasi · Mengapa Semesta Pro · CTA · Footer |
| Hasil pencarian | Header · Breadcrumb · Judul + jumlah + ringkasan landing · Bar pencarian · [Sidebar filter | chip aktif + urutkan + grid kartu + paginasi] · CTA · Footer |
| Detail | Header · Breadcrumb · (Banner terjual) · Galeri · [Judul, lokasi, kode, Ringkasan, Spesifikasi, Deskripsi, KPR | Kartu harga lengket + kantor] · Properti lain di kecamatan · CTA · Footer |
| Staf | Header · Breadcrumb · Judul + pengantar · Grid kartu staf · CTA · Footer |
| Detail staf | Header · Breadcrumb · [Foto | Nama, jabatan, bio, kontak, WhatsApp] · tautan kembali · CTA · Footer |
| Admin – login | Kartu tengah: logo, judul, email, sandi (toggle "Tampilkan"), "Masuk" |
| Admin – dasbor | Sidebar · Top bar (judul + sapaan) · 4 kartu statistik · 2 kartu tambahan · Grafik per jenis · Tabel listing terbaru · Aksi cepat |
| Admin – kelola properti | Judul + "+ Tambah Properti" + "Ekspor ke Excel" · Bar filter · Jumlah · Tabel · Paginasi |
| Admin – form properti | 5 bagian bernomor · Bar aksi lengket |
| Admin – kelola pengguna | Judul + "+ Tambah Admin" · Tabel · Form tambah/ubah (halaman terpisah) |
| Admin – pengaturan | Panel Profil Saya · Panel Ubah Kata Sandi |

## 10. Penulisan & konten (UX writing)

- **Bahasa Indonesia baku yang ramah**, sapaan **"Anda"**, kalimat pendek (≤ 20 kata), tanpa jargon teknis ("unggah" bukan "upload"; "kata sandi" bukan "password"; "dasbor" bukan "dashboard" di teks).
- Tombol = kata kerja + objek: "Simpan Properti", "Tambah Admin", "Hubungi via WhatsApp".
- Pesan galat: apa yang salah + cara memperbaiki. ✅ "Foto terlalu besar. Pilih foto di bawah 15 MB." ❌ "Error 413".
- Pesan sukses spesifik: "Properti SP-00012 berhasil ditandai terjual."
- **Format:**

| Jenis | Format | Contoh |
|---|---|---|
| Harga lengkap | `Rp` + spasi + titik ribuan | Rp 850.000.000 |
| Harga ringkas | Juta / Miliar, maks. 2 desimal koma, nol dibuang | Rp 850 Juta · Rp 1,25 Miliar · Rp 3 Miliar |
| Luas | angka + spasi + m² | 120 m² · 72,5 m² |
| Tanggal | d MMMM yyyy | 10 Oktober 2026 |
| Tanggal + waktu | d MMM yyyy, HH.mm WIB | 10 Okt 2026, 14.05 WIB |
| Telepon | 0812-8555-2016 | |
| Kode listing | SP-00012 | |
| Persen | koma desimal | 7,5% |

## 11. Implementasi token (Tailwind v4)

Cuplikan wajib di `resources/css/app.css`:

```css
@import "tailwindcss";
@source "../views";

@theme {
  --font-heading: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Atkinson Hyperlegible Next", "Atkinson Hyperlegible", ui-sans-serif, system-ui, sans-serif;

  --color-primary-50: #EEF4FC;  --color-primary-100: #D6E4F7;
  --color-primary-600: #0B4EA2; --color-primary-700: #083D80; --color-primary-900: #0A2F66;
  --color-accent-50: #FFF4E5;   --color-accent-400: #F9A845;
  --color-accent-500: #F7941D;  --color-accent-700: #B45309;
  --color-success-50: #F0FDF4;  --color-success-700: #15803D; --color-success-800: #166534;
  --color-danger-50: #FEF2F2;   --color-danger-700: #B91C1C;  --color-danger-800: #991B1B;
  --color-neutral-50: #F5F7FA;  --color-neutral-100: #F3F4F6; --color-neutral-300: #D1D5DB;
  --color-neutral-500: #6B7280; --color-neutral-600: #4B5563; --color-neutral-700: #374151;
  --color-neutral-900: #111827;

  --text-body-sm: 1rem;      --text-body-sm--line-height: 1.5;
  --text-body: 1.125rem;     --text-body--line-height: 1.6;
  --text-body-lg: 1.25rem;   --text-body-lg--line-height: 1.6;
  --text-h4: 1.25rem;        --text-h3: 1.5rem;   --text-h2: 2rem;
  --text-h1: 2.5rem;         --text-display: 3.25rem;
  --text-price: 1.5rem;      --text-price-xl: 2.5rem;

  --radius-sm: 6px; --radius-md: 8px; --radius-lg: 12px; --radius-xl: 16px;

  --shadow-sm: 0 1px 2px rgb(17 24 39 / 0.06);
  --shadow-md: 0 4px 12px rgb(17 24 39 / 0.10);
  --shadow-lg: 0 16px 40px rgb(17 24 39 / 0.18);
}

html { font-size: 100%; }            /* hormati pengaturan ukuran huruf pengguna; jangan set px */
body { @apply font-body text-body text-neutral-900 bg-white antialiased; }
:focus-visible { outline: 3px solid var(--color-primary-600); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; } }
```

- Ukuran mobile dari §4.2 diterapkan lewat varian responsif pada kelas komponen (`.h1 { @apply text-[1.875rem] lg:text-h1 }` dsb.) — di satu tempat, bukan di setiap template.
- **Dilarang:** hex/rgb lepas di template, `text-xs`/`text-sm` bawaan Tailwind (di bawah 16 px), `text-gray-400/300` untuk teks, `opacity` untuk meredupkan teks.
- Gunakan `rem` untuk ukuran huruf agar ikut membesar bila pengguna memperbesar huruf di browser/HP.

## 12. Aksesibilitas — checklist per halaman

- [ ] Satu `h1`, hierarki heading berurutan.
- [ ] Landmark `header`, `nav` (berlabel), `main`, `footer`; skip link berfungsi.
- [ ] Semua teks ≥ 16 px; isi 18 px; kontras sesuai §3.2.
- [ ] Target sentuh ≥ 44–52 px sesuai §5.3.
- [ ] Setiap input punya `<label>` terlihat; galat terhubung `aria-describedby`.
- [ ] Semua fungsi bisa dijalankan dengan keyboard; fokus terlihat; urutan fokus logis; dialog menjebak fokus dan mengembalikannya.
- [ ] Gambar punya `alt` bermakna; ikon dekoratif disembunyikan.
- [ ] Status tidak hanya disampaikan dengan warna.
- [ ] Perbesaran 200% tanpa kehilangan konten; tidak ada scroll horizontal di 360 px (reflow 320 CSS px).
- [ ] `prefers-reduced-motion` dihormati; tidak ada animasi otomatis > 5 detik.
- [ ] Bahasa halaman `lang="id"`.
- [ ] Hasil KPR & pesan dinamis diumumkan via `aria-live`.

## 13. Gerak (motion)

- Durasi 150–200 ms, `ease-out`; hanya untuk hover, buka/tutup dialog (fade + skala 0,98→1), dan lembar filter (geser naik).
- Tidak ada parallax, carousel otomatis, atau animasi saat scroll.

---

## Lampiran A — Gaya terpilih (diisi setelah klien memilih desain Stitch)

| Atribut | Nilai |
|---|---|
| Gaya dipilih | _(A Terpercaya & Bersih / B Hangat & Ramah / C Premium Editorial / D Kontras Tinggi)_ |
| Tanggal persetujuan klien | _ |
| Font heading final | _Plus Jakarta Sans (default) / Lora untuk Gaya C_ |
| `radius-md` / `radius-lg` / `radius-xl` | _8 / 12 / 16 px (default)_ |
| Bayangan kartu | _shadow-sm (default)_ |
| Latar seksi alternatif | _`primary-50` / `accent-50` / `neutral-50`_ |
| Perlakuan hero | _foto + overlay navy / navy solid_ |
| Ukuran isi (Gaya D) | _18 px default; 20 px untuk Gaya D_ |
| Referensi ekspor | `docs/design-reference/<gaya>/` |
| Catatan penyimpangan dari Stitch | _mis. "Stitch memakai teks abu-abu #9CA3AF; diganti neutral-600 sesuai §3.2"_ |

Aturan: Lampiran ini hanya boleh **mengubah nilai** token yang ada (radius, bayangan, font heading, latar seksi), tidak menambah warna baru dan tidak menurunkan ukuran/kontras di bawah §3–§5.

## Riwayat perubahan

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | 2026-10-13 | Design system awal dari briefing & logo |
