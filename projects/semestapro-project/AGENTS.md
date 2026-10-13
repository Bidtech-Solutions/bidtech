# AGENTS.md — Semesta Pro

Instruksi untuk agen AI (Claude Code, Codex, Cursor, Gemini, dll.) dan developer yang bekerja di repositori ini. Baca seluruh berkas ini sebelum menulis kode.

## 1. Proyek dalam satu paragraf

Semesta Pro adalah aplikasi web katalog properti untuk **SemestaPro Batam (PT. Cipta Semesta Baru)**, agen titip jual-beli hunian secondary di Batam. Konsepnya Brighton (`brighton.co.id`) yang disederhanakan: beranda dengan properti terbaru, pencarian dengan filter (jenis, harga, kecamatan Batam), detail properti dengan galeri ≤ 8 foto + tombol WhatsApp + simulasi KPR, direktori staf statis, dan dasbor admin (kelola properti, tandai terjual, ekspor Excel, kelola akun admin). Situs publik dirender di server dan dioptimalkan untuk **SEO, AEO, dan GEO**. Pengguna utama adalah **Gen X dan Boomer**: teks besar, kontras tinggi, sederhana.

## 2. Peta dokumen (baca sesuai tugas)

| Dokumen | Isi | Wajib dibaca saat |
|---|---|---|
| `docs/PRD.md` | Kebutuhan & kriteria penerimaan (ID seperti `FR-SRC-04`) | Menambah/mengubah fitur apa pun |
| `docs/ARCHITECTURE.md` | Struktur folder, lapisan, konvensi kode, rute, SEO, keamanan, deploy | Menulis kode Go, template, JS, CSS |
| `docs/SCHEMA.md` | Skema SQLite, JSON spesifikasi, kunci storage, kueri penting | Menyentuh model, migrasi, kueri, ekspor |
| `docs/DESIGN.md` | Design system: token warna, tipografi, spacing, komponen, pola UI | Menyentuh tampilan apa pun |
| `docs/design-reference/` | Ekspor HTML Google Stitch (referensi visual saja) | Membangun halaman baru |

Jika dokumen dan kode bertentangan, **dokumen menang**, kecuali kodenya jelas lebih benar; dalam hal itu perbarui dokumennya di commit yang sama dan sebutkan alasannya.

## 3. Stack (jangan diganti tanpa persetujuan)

- **Go 1.25+**, **Goravel v1.18**, driver HTTP **gin** (`github.com/goravel/gin`).
- View: `html/template` Goravel, berkas **`.tmpl`** di `resources/views`, dirender di server.
- Database: **SQLite** mode **WAL** lewat `github.com/goravel/sqlite` (berbasis `ncruces/go-sqlite3`, tanpa CGo).
- Storage foto: **RustFS** (S3-compatible) lewat `github.com/goravel/s3`.
- Gambar: `github.com/disintegration/imaging` (resize/orientasi) + `github.com/gen2brain/webp` (encode WebP, tanpa CGo).
- Excel: `github.com/xuri/excelize/v2`.
- CSS: **Tailwind CSS v4** (CLI standalone, tanpa Node di produksi). JS: **vanilla ES modules** + elemen `<dialog>` native. Tanpa React/Vue/Alpine/jQuery.
- Build: binary statis `CGO_ENABLED=0`. Deploy: Docker (Dockerfile, `docker-compose.yml`, `docker-compose.prod.yml`) di balik Nginx host; storage foto RustFS.

## 4. Perintah

```bash
make dev          # air (hot reload Go) + tailwind --watch
make css          # build CSS sekali (minify)
make test         # go test ./... -race -count=1
make lint         # gofmt -l, go vet, golangci-lint run
make build        # CGO_ENABLED=0 go build -o bin/semestapro .

./artisan migrate                 # jalankan migrasi
./artisan migrate:rollback
./artisan db:seed                 # seed kecamatan (+ data contoh di APP_ENV=local)
./artisan app:create-master       # buat akun Admin Master (interaktif)
./artisan app:sweep-uploads       # hapus foto sementara yatim > 24 jam
./artisan app:check-images        # laporkan objek storage tanpa baris DB
```

Sebelum menyatakan pekerjaan selesai: `make lint && make test` harus lulus.

## 5. Aturan emas (invarian bisnis — jangan dilanggar)

1. **Properti terjual tidak pernah tampil** di beranda, pencarian, landing, sitemap, `llms*.txt`. Halaman detailnya tetap bisa dibuka (HTTP 200) dengan badge "TERJUAL" dan `noindex`. Gunakan scope kueri `Available()`; jangan menulis filter status manual.
2. **Maksimal 8 foto per properti**, minimal 1. Divalidasi di klien, server, dan database (`position` 0–7 unik).
3. **Semua foto** yang disimpan: WebP, ≤ 1280×720 (lanskap) / ≤ 720×1280 (potret), **≤ 300 KB**, tanpa EXIF. Thumbnail ≤ 640×360 (potret ≤ 360×640), ≤ 60 KB. Hanya lewat `app/support/imaging`.
4. **Akun Master** tidak dapat diubah, diatur ulang kata sandinya, atau dinonaktifkan oleh admin lain. Dicek di **policy server-side** (`app/policies/user_policy.go`), bukan hanya disembunyikan di UI.
5. **Kategori properti tetap**: `rumah`, `ruko`, `apartemen`, `villa`, `gudang`, `lahan`. Definisi spesifikasi per kategori hanya ada di `app/domain/catalog/specs.go`; form, validasi, tampilan detail, dan ekspor Excel membaca dari sana.
6. **Uang = `int64` rupiah**. Tidak pernah float untuk harga.
7. **Setiap aksi berisiko** memakai dialog konfirmasi; **setiap aksi yang mengubah data** diakhiri dialog sukses; **setiap aksi** menampilkan loading dan mencegah klik ganda. Gunakan komponen bersama (`data-confirm`, flash `success`, `data-loading`), jangan membuat ulang.
8. **Aksesibilitas tidak boleh turun**: teks ≥ 16 px (isi 18 px), kontras ≥ 4,5:1, target sentuh ≥ 48 px, setiap tombol berlabel teks. Gunakan hanya token dari `docs/DESIGN.md`; **tidak ada warna hex lepas** di template.
9. **Teks di atas jingga (`accent`) selalu navy**, tidak pernah putih.
10. Situs publik **berfungsi tanpa JavaScript** (pencarian, navigasi, galeri dasar). JS hanya memperkaya.
11. Halaman publik **dirender di server** lengkap dengan meta SEO dan JSON-LD. Jangan memuat konten utama via fetch di sisi klien.

## 6. Konvensi singkat

- **Bahasa:** identifier kode, nama tabel/kolom, komentar, dan pesan commit dalam **bahasa Inggris**. Teks antarmuka, URL publik, pesan validasi, dan konten dalam **bahasa Indonesia** (sapaan "Anda").
- **Lapisan:** controller tipis → service (logika bisnis) → model/ORM. Template tidak berisi logika bisnis; data disiapkan oleh view model di `app/viewmodels`.
- **Penamaan view:** `{{ define "public/home.tmpl" }}` harus sama dengan path relatif berkas.
- **Galat:** bungkus dengan konteks (`fmt.Errorf("listing.Create: %w", err)`), log sekali di batas HTTP, jangan bocorkan detail ke pengguna.
- **Kueri:** selalu parameterized. Escape `%`/`_` untuk LIKE. Tidak ada SQL dari string gabungan input.
- **Waktu:** simpan UTC, tampilkan `Asia/Jakarta`.
- **Migrasi:** satu perubahan per berkas, tidak mengedit migrasi yang sudah dirilis.
- **Commit:** Conventional Commits (`feat(listing): ...`, `fix(admin): ...`). Satu tujuan per commit.
- Rincian lengkap: `docs/ARCHITECTURE.md`.

## 7. Cara kerja yang diharapkan dari agen

1. Identifikasi ID kebutuhan PRD yang relevan sebelum menulis kode; sebutkan di ringkasan/PR.
2. Untuk perubahan UI, cek komponen yang sudah ada di `resources/views/components/` dan token di `DESIGN.md` sebelum membuat yang baru.
3. Tulis/ubah tes untuk setiap perilaku bisnis (lihat `ARCHITECTURE.md` §13). Tes wajib untuk: filter pencarian, aturan status terjual, proteksi master, validasi spesifikasi per kategori, pipeline gambar, rumus KPR.
4. Jangan menambah dependensi baru tanpa alasan tertulis di PR; utamakan pustaka standar Go.
5. Jangan mengubah stack, struktur URL publik, atau skema tanpa memperbarui dokumen terkait.
6. Jika kebutuhan ambigu, pilih perilaku yang paling sederhana dan aman bagi pengguna lanjut usia, tulis asumsi di PR, dan tandai `// TODO(prd): ...`.
7. Jangan pernah melakukan commit berisi `.env`, database `*.db*`, atau kredensial.

## 8. Definisi selesai

- [ ] Memenuhi kriteria kebutuhan PRD terkait.
- [ ] `make lint && make test` lulus; tes baru untuk logika baru.
- [ ] Halaman baru: lolos cek a11y dasar (label, kontras, fokus, keyboard) dan berfungsi di lebar 360 px.
- [ ] Halaman publik baru: title, description, canonical, OG, JSON-LD, masuk sitemap bila diindeks.
- [ ] Aksi admin baru: konfirmasi (jika berisiko), loading, dialog sukses, dialog galat.
- [ ] Dokumen di `docs/` diperbarui jika ada keputusan baru.
