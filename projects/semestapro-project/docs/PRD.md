# PRD — Semesta Pro

> Product Requirements Document. Sumber kebenaran untuk **apa** yang dibangun dan **kapan dianggap selesai**. Cara membangunnya ada di `ARCHITECTURE.md`, struktur data di `SCHEMA.md`, tampilan di `DESIGN.md`.

| | |
|---|---|
| Klien | SemestaPro Batam — PT. Cipta Semesta Baru |
| Pengembang | Bidtech (PT Solusi Bisnis Jalanin Aja Dulu) |
| Domain | `semestapro.co.id` |
| Versi dokumen | 1.0 — 13 Oktober 2026 |
| Status | Disetujui untuk desain & pengembangan |

---

## 1. Latar belakang

Semesta Pro adalah agen penjualan properti pihak ketiga di Batam yang berfokus pada **titip jual-beli hunian secondary**. Saat ini pemasaran berjalan lewat media sosial dan pencatatan masih manual, sehingga:

- Calon pembeli sering tidak tahu apakah properti masih tersedia atau sudah terjual.
- Belum ada katalog resmi yang bisa ditautkan dari iklan media sosial.
- Admin tidak punya data penjualan real time; laporan disusun manual.

Klien mengambil konsep dari **Brighton** (`brighton.co.id`) yang disederhanakan: katalog, pencarian dengan filter, halaman detail berisi spesifikasi dan simulasi KPR, serta direktori staf.

## 2. Tujuan & ukuran keberhasilan

| Tujuan | Ukuran keberhasilan (3 bulan setelah rilis) |
|---|---|
| Satu tautan resmi untuk setiap properti yang diiklankan | 100% listing aktif tersedia di website dengan status akurat |
| Status penjualan real time | Properti terjual hilang dari beranda & pencarian maksimal 1 menit setelah ditandai |
| Ditemukan di Google dan mesin jawaban AI | Halaman kategori × kecamatan terindeks; muncul untuk kueri "rumah dijual [kecamatan] batam" |
| Kontak calon pembeli lebih cepat | Setiap halaman detail punya tombol WhatsApp berisi pesan otomatis |
| Laporan tanpa kerja manual | Admin mengunduh laporan Excel dalam ≤ 3 klik |
| Nyaman bagi pengguna Gen X/Boomer | Uji pengguna usia 50+ dapat mencari properti & menekan WhatsApp tanpa bantuan |
| Website ringan | LCP < 2,5 dtk di 4G, ukuran foto 50–300 KB |

## 3. Pengguna

| Persona | Deskripsi | Kebutuhan utama |
|---|---|---|
| **Calon pembeli** (utama) | Usia 45–70, Gen X/Boomer, membuka dari HP Android kelas menengah atau laptop, sering datang dari tautan Instagram/Facebook/WhatsApp | Teks besar, harga & status jelas, langsung bisa WhatsApp |
| **Pemilik properti** | Ingin menitipkan properti untuk dijual | Tahu cara menghubungi Semesta Pro (CTA "Titip Jual") |
| **Admin Semesta Pro** | Staf kantor, juga cenderung usia matang, input ±2 listing/hari (±500/tahun) | Form sederhana, aksi cepat "Tandai Terjual", laporan Excel |
| **Admin Master** | Pemilik/penanggung jawab akun | Akunnya tidak bisa diubah/dinonaktifkan admin lain |
| **Mesin pencari & AI** | Googlebot, crawler AI (GPTBot, ClaudeBot, PerplexityBot, dll.) | HTML server-side, metadata, data terstruktur, `llms.txt` |

## 4. Ruang lingkup

### 4.1 Termasuk (rilis 1)

**Situs publik**
1. Beranda
2. Hasil pencarian (+ halaman landing SEO per kategori & kecamatan)
3. Detail properti (dengan simulasi KPR)
4. Daftar staf & detail staf (konten statis)
5. Komponen global: header, CTA sebelum footer, footer
6. Halaman 404, 410 & 500
7. Berkas SEO/AEO/GEO dinamis: `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `/.well-known/security.txt`, `manifest.webmanifest`

**Dasbor admin**
1. Login / logout
2. Dasbor ringkasan (metrik cepat)
3. Kelola properti: daftar, cari, filter, tambah, ubah, hapus, tandai terjual / batalkan terjual
4. Ekspor Excel data properti
5. Kelola pengguna (akun admin), dengan proteksi akun master
6. Pengaturan (profil & kata sandi sendiri)

### 4.2 Tidak termasuk (rilis 1)

- Listing sewa, proyek baru/primary, dan agen per-listing.
- Registrasi/akun untuk pengunjung publik, favorit, bandingkan properti, peta interaktif.
- Pengelolaan data staf dari dasbor (staf bersifat statis di kode).
- Pengelolaan banner/hero dari dasbor (statis).
- Penambahan kategori properti baru dari dasbor (kategori tetap/fixed).
- Kecamatan di luar Kota Batam.
- Multi-bahasa (hanya Bahasa Indonesia).
- Blog/artikel, pemesanan jadwal survei online, pembayaran online.

### 4.3 Pertanyaan terbuka

| # | Pertanyaan | Default bila belum dijawab |
|---|---|---|
| Q1 | Halaman "Tentang Kami" (ada di proposal awal) masuk rilis 1? | Tidak; sediakan rute dan template kosong bila disetujui |
| Q2 | Nomor WhatsApp tujuan: satu nomor admin atau per staf? | Satu nomor admin `0812-8555-2016` (konfigurasi `.env`) |
| Q3 | Alamat email untuk `security.txt` | Gunakan email bisnis; sarankan `security@semestapro.co.id` |
| Q4 | Suku bunga default simulasi KPR | 7,5% per tahun (konfigurasi `.env`) |
| Q5 | Data & foto staf | Diminta dari klien sebelum rilis |
| Q6 | Izinkan crawler AI (GPTBot, ClaudeBot, dll.)? | Izinkan (mendukung tujuan GEO) |

## 5. Peta situs & URL

| Halaman | URL | Indeks |
|---|---|---|
| Beranda | `/` | index |
| Semua properti dijual | `/dijual` | index |
| Per kategori | `/dijual/{kategori}` mis. `/dijual/rumah` | index |
| Per kategori × kecamatan | `/dijual/{kategori}/{kecamatan}` mis. `/dijual/rumah/sekupang` | index |
| Semua kategori di satu kecamatan | `/dijual/properti/{kecamatan}` | index |
| Hasil pencarian bebas | `/cari?q=…&kategori=…&kecamatan=…&harga_min=…&harga_maks=…&urut=…&halaman=…` | noindex, follow |
| Detail properti | `/properti/{slug}` mis. `/properti/rumah-2-lantai-tiban-indah-sp-00012` | index (tersedia) / noindex (terjual) |
| Daftar staf | `/staf` | index |
| Detail staf | `/staf/{slug}` | index |
| Dasbor | `/admin/...` | noindex, disallow |

Slug kategori: `rumah`, `ruko`, `apartemen`, `villa`, `gudang`, `lahan`; `properti` = semua kategori.
Slug kecamatan: `batam-kota`, `batu-aji`, `batu-ampar`, `belakang-padang`, `bengkong`, `bulang`, `galang`, `lubuk-baja`, `nongsa`, `sagulung`, `sei-beduk`, `sekupang`.

## 6. Kebutuhan fungsional — situs publik

Prioritas: **M** = Must, **S** = Should, **C** = Could.

### 6.1 Komponen global

| ID | Kebutuhan | Prio |
|---|---|---|
| FR-GLB-01 | Header berisi logo (tautan ke beranda), menu "Beranda", "Cari Properti", "Staf Kami", dan tombol "Hubungi Kami" (WhatsApp). Di mobile, tombol berlabel "Menu" membuka menu layar penuh. | M |
| FR-GLB-02 | Komponen CTA tampil di **semua halaman publik tepat sebelum footer**: ajakan titip jual + tombol WhatsApp + tombol "Lihat Properti Dijual". | M |
| FR-GLB-03 | Footer berisi tautan navigasi, tautan kategori, alamat, telepon/WhatsApp, email, tautan Google Maps, Instagram, Facebook, dan hak cipta PT. Cipta Semesta Baru. | M |
| FR-GLB-04 | Semua tautan WhatsApp memakai format `https://wa.me/6281285552016?text=<pesan ter-encode>`; nomor dari konfigurasi. | M |
| FR-GLB-05 | Halaman 404, 410 (properti dihapus), dan 500 bergaya situs, dengan tombol ke beranda dan pencarian. | M |

**Data kontak (konfigurasi):** PT. Cipta Semesta Baru · Komp. Ruko Tanah Mas Blok C No.6, Sei Panas, Batam 29444 · 0812-8555-2016 · darsonhutagalung20@gmail.com · Instagram `https://www.instagram.com/semestapro.perty/` · Facebook `https://www.facebook.com/p/SemestaPro-Batam-PT-Cipta-Semesta-Baru-61560938402647/` · Maps `https://maps.app.goo.gl/cs7yhZyvHdCoqpij7`.

### 6.2 Beranda (`/`)

| ID | Kebutuhan | Prio |
|---|---|---|
| FR-HOME-01 | Hero/banner statis dengan judul, subjudul, dan **panel pencarian**: kata kunci, jenis properti, kecamatan, tombol "Cari" → `GET /cari`. | M |
| FR-HOME-02 | Tombol cepat 6 kategori menuju `/dijual/{kategori}`. | M |
| FR-HOME-03 | Seksi **"Properti Terbaru"**: 6 properti berstatus tersedia, urut `created_at` terbaru, + tombol "Lihat Semua Properti" → `/dijual`. | M |
| FR-HOME-04 | Seksi "Cari Berdasarkan Jenis" dengan jumlah properti tersedia per kategori. | S |
| FR-HOME-05 | Seksi "Cari Berdasarkan Lokasi" berisi kecamatan yang memiliki ≥1 properti tersedia, dengan jumlahnya. | S |
| FR-HOME-06 | Seksi "Properti Pilihan" (listing dengan `is_featured`), tampil hanya jika ada. | S |
| FR-HOME-07 | Seksi kepercayaan "Mengapa Semesta Pro" (statis). | S |
| FR-HOME-08 | Properti berstatus **terjual tidak pernah tampil** di beranda. | M |

### 6.3 Hasil pencarian (`/cari`, `/dijual/...`)

| ID | Kebutuhan | Prio |
|---|---|---|
| FR-SRC-01 | Bar pencarian selalu tampil di bagian atas, terisi kueri saat ini. | M |
| FR-SRC-02 | Kata kunci dicocokkan (tidak peka huruf besar/kecil, per kata, semua kata harus cocok) terhadap judul, nama perumahan/kawasan, alamat, kode listing, nama kecamatan, dan label kategori. | M |
| FR-SRC-03 | Filter **jenis properti** (Semua + 6 kategori tetap). | M |
| FR-SRC-04 | Filter **harga**: preset (< 300 jt, 300–500 jt, 500 jt–1 M, 1–2 M, 2–5 M, > 5 M) dan input minimum/maksimum bebas. Minimum > maksimum → ditukar otomatis. | M |
| FR-SRC-05 | Filter **lokasi per kecamatan** Kota Batam (12 kecamatan). | M |
| FR-SRC-06 | Urutan: Terbaru (default), Harga Terendah, Harga Tertinggi. | M |
| FR-SRC-07 | Paginasi bernomor, 12 properti per halaman, parameter `halaman`. | M |
| FR-SRC-08 | Chip filter aktif yang bisa dihapus satu per satu + tombol "Hapus Semua Filter". | M |
| FR-SRC-09 | Judul halaman dinamis, mis. "Rumah Dijual di Sekupang, Batam", dan jumlah hasil. | M |
| FR-SRC-10 | Hanya properti **tersedia** yang tampil. | M |
| FR-SRC-11 | Keadaan kosong: pesan ramah + tombol hapus filter + tombol "Minta Dicarikan via WhatsApp". | M |
| FR-SRC-12 | Bila `/cari` hanya memuat filter kategori dan/atau kecamatan (tanpa q, harga, urut, halaman > 1), server **mengalihkan 301** ke URL bersih `/dijual/{kategori}/{kecamatan}`. | S |
| FR-SRC-13 | Di mobile, filter berada di lembar layar penuh lewat tombol "Filter (n)". | M |
| FR-SRC-14 | Pencarian berfungsi penuh tanpa JavaScript (form `GET`). | M |

### 6.4 Detail properti (`/properti/{slug}`)

| ID | Kebutuhan | Prio |
|---|---|---|
| FR-DTL-01 | Bisa diakses dari kartu di beranda dan hasil pencarian. | M |
| FR-DTL-02 | Galeri foto, **maksimal 8 foto per properti**, foto pertama = foto utama; penampil layar penuh dengan tombol berlabel sebelumnya/berikutnya; dapat digeser di layar sentuh. | M |
| FR-DTL-03 | Harga lengkap (mis. "Rp 850.000.000") dan bentuk ringkas ("Rp 850 Juta"), label "Harga bisa nego" bila diaktifkan. | M |
| FR-DTL-04 | Tombol **"Hubungi via WhatsApp"** dengan pesan otomatis berisi informasi properti (format di §6.4.1). | M |
| FR-DTL-05 | Paragraf "Ringkasan" otomatis satu–dua kalimat (jenis, lokasi, harga, luas, kamar) untuk pembaca & mesin jawaban AI. | M |
| FR-DTL-06 | Daftar **spesifikasi** sesuai kategori (lihat §8); kolom kosong tidak ditampilkan. | M |
| FR-DTL-07 | Deskripsi properti (teks biasa dengan paragraf; tanpa HTML dari admin). | M |
| FR-DTL-08 | **Simulasi Cicilan KPR** (lihat §6.4.2). | M |
| FR-DTL-09 | Kode listing (mis. `SP-00012`) dan tanggal unggah ditampilkan. | M |
| FR-DTL-10 | Breadcrumb: Beranda › Kategori › Kecamatan › Judul. | M |
| FR-DTL-11 | "Properti Lain di {Kecamatan}": hingga 3 properti tersedia lain, kategori sama diutamakan. | S |
| FR-DTL-12 | **Properti terjual tetap bisa dibuka** lewat URL langsung: badge "TERJUAL", pemberitahuan, kalkulator KPR disembunyikan, tombol WhatsApp berganti "Tanyakan Properti Serupa", `noindex`. | M |
| FR-DTL-13 | Bila slug berubah (judul diganti), URL lama dialihkan 301 ke slug baru berdasarkan kode di akhir slug. | M |
| FR-DTL-14 | Tombol "Bagikan" memakai Web Share API, dengan cadangan "Salin Tautan". | S |
| FR-DTL-15 | Tautan "Lihat di Google Maps" bila admin mengisi tautan peta. | S |

#### 6.4.1 Template pesan WhatsApp

```
Halo Semesta Pro, saya tertarik dengan properti berikut:

Kode: SP-00012
Rumah 2 Lantai Siap Huni di Tiban Indah
Harga: Rp 850.000.000
Lokasi: Tiban Indah, Sekupang, Batam
Tautan: https://semestapro.co.id/properti/rumah-2-lantai-siap-huni-di-tiban-indah-sp-00012

Apakah properti ini masih tersedia?
```

Untuk properti terjual: baris terakhir menjadi "Properti ini sudah terjual. Apakah ada properti serupa yang masih tersedia?"

#### 6.4.2 Simulasi Cicilan KPR

| Input | Aturan | Default |
|---|---|---|
| Harga properti | Diambil dari harga listing, hanya-baca | harga listing |
| Uang muka (%) | 0 ≤ DP < 100, desimal diizinkan (koma atau titik) | 20 |
| Suku bunga per tahun (%) | **> 0** dan ≤ 30. Nilai 0 → galat "Suku bunga harus lebih dari 0%" | 7,5 (konfigurasi) |
| Jangka waktu (bulan) | Bilangan bulat 12–360; tombol cepat 5/10/15/20 tahun mengisi 60/120/180/240 | 180 |

Rumus anuitas (bunga tetap):

```
pokok   = harga × (1 − dp/100)
r       = bunga/100/12
cicilan = pokok × r / (1 − (1 + r)^(−tenor))      dibulatkan ke atas ke rupiah
```

Keluaran: nilai uang muka (Rp), pokok pinjaman (Rp), perkiraan cicilan per bulan (Rp), total pembayaran (Rp). Contoh: harga 850 jt, DP 20%, bunga 7,5%, 180 bulan → cicilan **Rp 6.303.685**.

- Perhitungan langsung di browser saat nilai berubah; hasil default juga dirender server (tampil tanpa JS, terbaca crawler).
- Input tidak valid menampilkan pesan galat di bawah kolom dan hasil diganti tanda "–".
- Disclaimer: hasil bersifat perkiraan; ketentuan bank dapat berbeda.

### 6.5 Staf (`/staf`, `/staf/{slug}`)

| ID | Kebutuhan | Prio |
|---|---|---|
| FR-STF-01 | Daftar staf: foto, nama, jabatan, nomor WhatsApp, tombol "Lihat Profil". Dapat diakses dari header dan footer. | M |
| FR-STF-02 | Detail staf: foto besar, nama, jabatan, bio singkat (opsional), kontak (WhatsApp, email opsional), tombol WhatsApp. | M |
| FR-STF-03 | Data staf **statis** di repositori (berkas data + foto), **tidak** dikelola dari dasbor. | M |
| FR-STF-04 | Slug staf tidak dikenal → 404. | M |

## 7. Kebutuhan fungsional — dasbor admin

### 7.1 Autentikasi

| ID | Kebutuhan | Prio |
|---|---|---|
| FR-AUTH-01 | Login dengan email + kata sandi di `/admin/masuk`. Tidak ada pendaftaran publik. | M |
| FR-AUTH-02 | Pesan galat umum "Email atau kata sandi salah." (tidak membedakan email tidak terdaftar). | M |
| FR-AUTH-03 | Pembatasan percobaan: maks. 5 kali gagal per 15 menit per kombinasi IP+email, lalu pesan tunggu. | M |
| FR-AUTH-04 | Akun **nonaktif** tidak bisa login; sesi aktifnya berakhir pada permintaan berikutnya. | M |
| FR-AUTH-05 | Logout lewat `POST`, tombol "Keluar" selalu terlihat di sidebar. | M |
| FR-AUTH-06 | Sesi kedaluwarsa setelah 8 jam tanpa aktivitas; diarahkan ke login dengan pesan. | M |
| FR-AUTH-07 | Setelah login berhasil langsung ke dasbor (tanpa dialog sukses). | M |

### 7.2 Dasbor (`/admin`)

| ID | Metrik | Prio |
|---|---|---|
| FR-DASH-01 | Total listing (semua status) | M |
| FR-DASH-02 | Total tersedia | M |
| FR-DASH-03 | Total terjual / closing | M |
| FR-DASH-04 | Terjual bulan ini & listing baru bulan ini | M |
| FR-DASH-05 | Nilai total properti tersedia (jumlah harga) | S |
| FR-DASH-06 | Jumlah per kategori (tersedia vs terjual), grafik batang sederhana berlabel angka | S |
| FR-DASH-07 | 5 listing terbaru + tautan "Lihat Semua" | M |
| FR-DASH-08 | Tombol cepat "+ Tambah Properti" dan "Unduh Laporan Excel" | M |

Bulan = bulan kalender zona waktu `Asia/Jakarta` (WIB, sama dengan Batam).

### 7.3 Kelola properti (`/admin/properti`)

| ID | Kebutuhan | Prio |
|---|---|---|
| FR-PROP-01 | Tabel properti: foto mini, kode, judul + kawasan, jenis, harga, kecamatan, status, tanggal input, aksi. Di layar sempit menjadi kartu. 20 baris per halaman. | M |
| FR-PROP-02 | Pencarian (kode, judul, kawasan, alamat) dan filter: jenis, status, kecamatan, harga min/maks; urut terbaru/harga. Filter tersimpan di URL. | M |
| FR-PROP-03 | **Tambah properti**: form dengan bagian Informasi Utama, Lokasi, Spesifikasi (dinamis per kategori), Deskripsi, Foto. | M |
| FR-PROP-04 | **Ubah properti**: form sama, terisi data; perubahan kategori memberi peringatan bahwa spesifikasi yang tidak berlaku akan dihapus. | M |
| FR-PROP-05 | **Hapus properti** dengan dialog konfirmasi; menghapus data dan semua foto di storage. | M |
| FR-PROP-06 | **Aksi cepat "Tandai Terjual"** di baris tabel & halaman ubah; dialog konfirmasi dengan kolom tanggal terjual (default hari ini, tidak boleh di masa depan). | M |
| FR-PROP-07 | **"Batalkan Terjual"** mengembalikan status tersedia (konfirmasi), mengosongkan tanggal terjual. | M |
| FR-PROP-08 | Kode listing `SP-` + 5 digit dibuat otomatis, unik, tidak berubah. | M |
| FR-PROP-09 | Validasi server untuk semua kolom; pesan galat di bawah kolom dalam bahasa Indonesia; data yang sudah diisi tidak hilang saat galat. | M |
| FR-PROP-10 | Tombol "Lihat" membuka halaman publik di tab baru. | S |
| FR-PROP-11 | Penanda "Properti Pilihan" (`is_featured`). | S |

#### 7.3.1 Foto properti

| ID | Kebutuhan | Prio |
|---|---|---|
| FR-IMG-01 | Minimal 1, **maksimal 8 foto** per properti (divalidasi di klien dan server). | M |
| FR-IMG-02 | Format masukan: JPG, PNG, WebP (dideteksi dari isi berkas, bukan ekstensi). Maks. 15 MB dan 50 megapiksel per berkas; sisi terpendek minimal 400 px. | M |
| FR-IMG-03 | Server **mengonversi ke WebP**, memutar sesuai EXIF, **mengecilkan agar muat dalam 1280×720** (lanskap) atau **720×1280** (potret) tanpa memperbesar, dan **mengompres hingga ≤ 300 KB** (target tipikal 50–300 KB). Metadata (termasuk GPS) dibuang. | M |
| FR-IMG-04 | Thumbnail ≤ 640×360 (potret ≤ 360×640), ≤ 60 KB, dibuat untuk kartu & tabel. | M |
| FR-IMG-05 | Foto disimpan di bucket S3 **RustFS**; database hanya menyimpan kunci objek. | M |
| FR-IMG-06 | Admin dapat mengubah urutan (tombol "← Geser"/"Geser →"), menjadikan foto utama, dan menghapus foto (konfirmasi). | M |
| FR-IMG-07 | Indikator unggah: progres persen saat mengirim, lalu "Memproses foto…". | M |
| FR-IMG-08 | Pengecilan di sisi browser sebelum unggah (sisi terpanjang 2560 px) untuk menghemat kuota; server tetap otoritatif. | S |

### 7.4 Ekspor Excel

| ID | Kebutuhan | Prio |
|---|---|---|
| FR-XLS-01 | Tombol "Ekspor ke Excel" mengunduh `.xlsx` berisi properti sesuai **filter aktif** (tanpa filter = semua). | M |
| FR-XLS-02 | Sheet "Properti": satu baris per properti, kolom sesuai `SCHEMA.md` §6; **tanpa gambar**; header tebal berwarna, baris header dibekukan, autofilter, lebar kolom rapi, harga berformat rupiah sebagai angka, tanggal sebagai tanggal. | M |
| FR-XLS-03 | Sheet "Ringkasan": waktu dibuat, dibuat oleh, filter yang dipakai, jumlah per status & kategori, total nilai. | S |
| FR-XLS-04 | Nama berkas `semestapro-properti-YYYYMMDD-HHmm.xlsx`. | M |
| FR-XLS-05 | Tampilkan loading selama berkas dibuat dan dialog sukses setelah unduhan dimulai. | M |

### 7.5 Kelola pengguna (`/admin/pengguna`)

| ID | Kebutuhan | Prio |
|---|---|---|
| FR-USR-01 | Daftar admin: nama, email, no. HP, peran (Master/Admin), status, login terakhir. | M |
| FR-USR-02 | Semua admin dapat **menambah akun admin**. | M |
| FR-USR-03 | Admin dapat mengubah data (nama, email, no. HP), mengatur ulang kata sandi, dan menonaktifkan/mengaktifkan **admin lain**. | M |
| FR-USR-04 | **Akun Master**: tepat satu; hak aksesnya sama dengan admin lain, tetapi **tidak dapat diubah datanya, diatur ulang kata sandinya, atau dinonaktifkan oleh admin lain**. Dicek di server, bukan hanya disembunyikan di UI. | M |
| FR-USR-05 | Admin tidak dapat menonaktifkan dirinya sendiri; akun sendiri diubah lewat Pengaturan. | M |
| FR-USR-06 | Akun tidak dihapus, hanya dinonaktifkan (jejak data tetap utuh). | M |
| FR-USR-07 | Akun master dibuat lewat perintah konsol `./artisan app:create-master`, bukan dari UI. | M |

### 7.6 Pengaturan (`/admin/pengaturan`)

| ID | Kebutuhan | Prio |
|---|---|---|
| FR-SET-01 | Ubah profil sendiri: nama, email, no. HP. | M |
| FR-SET-02 | Ubah kata sandi sendiri: wajib kata sandi lama; kata sandi baru minimal 8 karakter, maks. 72 byte; konfirmasi harus sama. | M |
| FR-SET-03 | Setelah ganti kata sandi, sesi lain milik akun tersebut berakhir. | S |

### 7.7 Umpan balik interaksi (berlaku di seluruh dasbor)

| ID | Kebutuhan | Prio |
|---|---|---|
| FR-UX-01 | **Dialog konfirmasi** untuk setiap aksi berisiko: hapus properti, hapus foto, tandai terjual, batalkan terjual, nonaktifkan akun, atur ulang kata sandi orang lain, ganti kategori saat mengubah, meninggalkan form yang belum disimpan. | M |
| FR-UX-02 | **Dialog sukses** setelah setiap aksi yang mengubah data berhasil (simpan, ubah, hapus, tandai/batalkan terjual, tambah/ubah/nonaktifkan/aktifkan admin, atur ulang kata sandi, ubah profil & kata sandi sendiri, ekspor). Tidak untuk login, logout, navigasi, dan filter. | M |
| FR-UX-03 | **Indikator loading** pada setiap aksi: tombol berubah "Menyimpan…" + spinner dan dinonaktifkan (mencegah klik ganda); overlay layar penuh untuk unggah foto & ekspor. | M |
| FR-UX-04 | **Dialog galat** bila aksi gagal karena server/koneksi, dengan tombol "Coba Lagi". Galat validasi tampil di kolomnya. | M |
| FR-UX-05 | Dialog sukses tidak hilang otomatis; ditutup dengan tombol "OK". | M |

## 8. Spesifikasi per kategori

Kategori **tetap**: Rumah, Ruko, Apartemen, Villa, Gudang, Lahan. Kolom yang tidak berlaku untuk kategori tidak ditampilkan di form maupun halaman detail. **W** = wajib, **O** = opsional, – = tidak berlaku.

| Spesifikasi | Satuan | Rumah | Ruko | Apartemen | Villa | Gudang | Lahan |
|---|---|---|---|---|---|---|---|
| Luas tanah | m² | W | W | – | W | W | W |
| Luas bangunan / luas unit | m² | W | W | W | W | W | – |
| Kamar tidur (0 = studio) | – | W | – | W | W | – | – |
| Kamar mandi | – | W | O | W | W | O | – |
| Jumlah lantai | – | W | W | – | O | O | – |
| Daya listrik | Watt | O | O | O | O | W | – |
| Sertifikat | pilihan | W | W | W | O | O | W |
| Hadap | pilihan | O | O | – | O | O | O |
| Kondisi perabot | pilihan | O | O | O | O | – | – |
| Kapasitas carport | mobil | O | O | – | O | – | – |
| Posisi hook | ya/tidak | O | O | – | – | – | O |
| Sumber air | pilihan | O | – | – | O | – | – |
| Tahun dibangun | tahun | O | O | O | O | O | – |
| Lebar depan | m | – | O | – | – | – | O |
| Lantai unit | – | – | – | O | – | – | – |
| Nama tower | teks | – | – | O | – | – | – |
| Biaya IPL / bulan | Rp | – | – | O | – | – | – |
| Kolam renang pribadi | ya/tidak | – | – | – | O | – | – |
| Tinggi plafon | m | – | – | – | – | O | – |
| Lebar akses jalan | m | – | – | – | – | O | O |
| Bisa masuk kontainer | ya/tidak | – | – | – | – | O | – |
| Panjang lahan | m | – | – | – | – | – | O |
| Peruntukan/zonasi | pilihan | – | – | – | – | – | O |
| Kontur tanah | pilihan | – | – | – | – | – | O |
| Masa berlaku HGB | tahun | O | O | O | O | O | O |

Pilihan nilai: **Sertifikat** SHM, HGB, SHMSRS (Strata), AJB, PPJB, Lainnya · **Hadap** Utara, Timur Laut, Timur, Tenggara, Selatan, Barat Daya, Barat, Barat Laut · **Perabot** Kosong, Semi Furnished, Full Furnished · **Sumber air** PDAM/Air Batam, Sumur, Lainnya · **Zonasi** Perumahan, Komersial, Industri, Campuran, Lainnya · **Kontur** Datar, Berkontur.

Definisi teknis (kolom tabel vs JSON, validasi) ada di `SCHEMA.md` §4.

## 9. SEO, AEO, GEO

| ID | Kebutuhan | Prio |
|---|---|---|
| FR-SEO-01 | Semua halaman publik dirender di server (TMPL) dengan HTML semantik (`header`, `nav`, `main`, `article`, `footer`, satu `h1`). | M |
| FR-SEO-02 | `<title>`, meta description, canonical, Open Graph, Twitter Card unik per halaman (pola di `ARCHITECTURE.md` §9). | M |
| FR-SEO-03 | Data terstruktur JSON-LD: `RealEstateAgent` (situs), `WebSite`, `BreadcrumbList`, `ItemList` (daftar), `RealEstateListing` + `Offer` (detail, `availability` InStock/SoldOut), `Person` (staf). | M |
| FR-SEO-04 | `sitemap.xml` dinamis (indeks sitemap → halaman statis, landing kategori×kecamatan yang punya listing, properti tersedia + gambar, staf), `lastmod` akurat. | M |
| FR-SEO-05 | `robots.txt` dinamis: izinkan publik, blokir `/admin`, cantumkan sitemap; daftar crawler AI dikonfigurasi (default diizinkan). | M |
| FR-SEO-06 | `llms.txt` (format llmstxt.org) dan `llms-full.txt` (seluruh listing tersedia + profil perusahaan + penjelasan KPR) dinamis. | M |
| FR-SEO-07 | `/.well-known/security.txt` sesuai RFC 9116 (Contact, Expires, Preferred-Languages, Canonical); `/security.txt` dialihkan ke sana. | M |
| FR-SEO-08 | Properti terjual: `noindex`, dikeluarkan dari sitemap & `llms*.txt`; halaman tetap 200. Properti dihapus: 410 Gone. | M |
| FR-SEO-09 | Halaman pencarian bebas `/cari` dan halaman dengan filter harga/urut: `noindex, follow`, canonical ke URL landing bersih. | M |
| FR-SEO-10 | Paragraf ringkasan faktual per properti & per halaman landing (mis. "Saat ini tersedia 12 rumah dijual di Sekupang, Batam, dengan harga mulai Rp 450 juta."). | M |
| FR-SEO-11 | Versi Markdown halaman detail di `/properti/{slug}.md` untuk agen AI. | C |
| FR-SEO-12 | `manifest.webmanifest`, favicon lengkap, `theme-color`. | S |

## 10. Kebutuhan non-fungsional

### 10.1 Kinerja
- LCP < 2,5 dtk, CLS < 0,1, INP < 200 ms (p75, 4G, HP kelas menengah).
- TTFB halaman publik < 300 ms di server.
- CSS total < 50 KB gzip; JS publik < 30 KB gzip; tidak ada framework SPA.
- Foto: WebP, ≤ 300 KB (besar), ≤ 60 KB (thumbnail), `width`/`height` eksplisit, lazy-load kecuali foto pertama.

### 10.2 Aksesibilitas & keterbacaan (target Gen X/Boomer)
- WCAG 2.2 AA minimum; kontras teks ≥ 4,5:1 (teks besar ≥ 3:1), komponen UI ≥ 3:1.
- Ukuran teks isi 18 px, minimum mutlak 16 px; target sentuh ≥ 48×48 px (tombol utama 52 px).
- Semua tombol berlabel teks; navigasi keyboard penuh; fokus terlihat jelas; `prefers-reduced-motion` dihormati.
- Rincian di `DESIGN.md`.

### 10.3 Keamanan
- HTTPS wajib (HSTS), cookie sesi `Secure`, `HttpOnly`, `SameSite=Lax`.
- CSRF token pada semua form `POST`.
- Kata sandi di-hash (bcrypt/argon2 via `facades.Hash()`), tidak pernah dicatat di log.
- Header keamanan: CSP, `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors 'none'` untuk admin.
- Validasi unggahan berdasarkan isi berkas; batas ukuran & piksel.
- Semua otorisasi (termasuk proteksi akun master) dicek di server.

### 10.4 Keandalan & data
- SQLite mode WAL; cadangan otomatis (Litestream/snapshot) ke lokasi di luar VPS, RPO ≤ 1 jam.
- Bucket foto RustFS dicadangkan harian ke lokasi lain.
- Zona waktu aplikasi `Asia/Jakarta`.

### 10.5 Kompatibilitas
- Chrome/Android 2 versi terakhir, Safari iOS 16+, Edge, Firefox terbaru.
- Lebar layar 360 px – 1920 px.

## 11. Kriteria penerimaan rilis (ringkas)

- [ ] Semua kebutuhan **M** lolos uji.
- [ ] Uji pengguna 3 orang usia 50+: menemukan "rumah di Sekupang di bawah Rp 1 M" dan menekan WhatsApp tanpa bantuan.
- [ ] Lighthouse mobile halaman beranda & detail: Performance ≥ 90, Accessibility ≥ 95, SEO 100.
- [ ] `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, `security.txt` valid dan terisi data nyata.
- [ ] Rich Results Test lulus untuk Breadcrumb; validator schema.org tanpa galat untuk detail properti.
- [ ] Unggah 8 foto ponsel 12 MP → semua ≤ 300 KB, ≤ 1280×720/720×1280, tanpa EXIF.
- [ ] Admin non-master gagal (HTTP 403) mengubah/menonaktifkan akun master walau memanipulasi request.
- [ ] Ekspor Excel terbuka rapi di Microsoft Excel & Google Sheets.
- [ ] Pemulihan dari cadangan database & foto pernah diuji.

## 12. Riwayat perubahan

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | 2026-10-13 | Dokumen awal dari briefing klien |
