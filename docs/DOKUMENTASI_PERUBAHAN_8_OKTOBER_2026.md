# Dokumentasi Perubahan & Pembaruan (8 Oktober 2026) & Rekap Branch Satria

**Repository:** `bidtech-landing`  
**Proyek Terkait:** `bidtech-landing/frontend` & `projects/nadim-trans-rentcar/`  
**Cabang / Branch:** `satria`  
**Status Komit HEAD:** `6cee625` (*feat(landing): update hero responsive layout, mobile copywriting alignment, category filters, and portfolio assets*)  
**Penulis / Author:** `satt12 (Satria)`  
**Tanggal Pelaksanaan:** Kamis, 8 Oktober 2026  

---

## 1. Ringkasan Eksekutif

Pada tanggal **8 Oktober 2026**, dilakukan serangkaian optimalisasi antarmuka pengguna (*UI/UX polishing*), peningkatan responsivitas pada perangkat mobile & tablet/iPad, restrukturisasi tampilan multi-device portofolio, serta pembaruan katalog portofolio pada landing page BidTech.

Pembaruan ini melanjutkan rilis fitur besar dari tanggal **7 Oktober 2026** (komit `823f61e`) yang mencakup penambahan halaman tutorial, hubungi kami, blog, dan dropdown navigasi perusahaan.

---

## 2. Rincian Pembaruan Kemarin (Kamis, 8 Oktober 2026 - Komit `6cee625`)

### A. Layout Hero Section & Penyelarasan Mobile/iPad (`hero-section.tsx` & `hero-showcase.tsx`)
1. **Pemisahan Tampilan Dedicated Mobile/Tablet vs Desktop:**
   - **Mobile & Tablet (< 1024px):** Menggunakan susunan terpusat (*center aligned*) 1-kolom dengan `[text-wrap: balance]` untuk mencegah teks judul atau subjudul patah secara canggung.
   - **Desktop (≥ 1024px):** Layout 2-kolom seimbang dengan visual model ilustrasi dan floating badges.
2. **Efek Ambient Gradiasi Halus:**
   - Menambahkan lapisan latar belakang gradiasi vertikal lembut di mobile dari putih ke hijau pastel (`#bfeab7` dan `#def5d9`) yang memudar kembali ke putih.
   - Memberikan kedalaman visual elegan yang konsisten dengan palet warna brand Bidtech tanpa mengorbankan keterbacaan teks.
3. **Penyempurnaan Tombol CTA Mobile:**
   - Tombol **"Hubungi Kami"** (WhatsApp pill hijau `#5bb82e`) dan **"Cari Design"** (pill putih dengan border) disusun berdampingan (*side-by-side*) secara proporsional.
   - Dilengkapi micro-animation `hover:scale-[1.02]` dan `active:scale-[0.98]` saat ditekan pengguna layar sentuh.
4. **Optimalisasi Floating Badges & Carousel Model:**
   - Penyesuaian koordinat dan skala floating badges (*Pelanggan Baru 236 ↑ 100%*, *Menjangkau Lebih Banyak Pelanggan*, dan *SEO Perfect 100/100 Score*).
   - Transisi *crossfade* yang mulus antara Model 4 (wanita dengan laptop) dan Model 5 (pria dengan smartphone).

### B. Redesain Stage Portofolio Multi-Device (`portfolio-section.tsx`)
1. **Persistent Device Showcase Stage:**
   - Seluruh 5 item portofolio kini berbagi rangka perangkat yang persisten (*iMac Desktop centerpiece, iPad tablet di sisi kiri, dan iPhone mobile di sisi kanan*).
   - Menghilangkan *layout shift* atau kedipan saat berganti slide—hanya tangkapan layar di dalam perangkat yang bertransisi secara halus (*crossfade*).
2. **Pembaruan Aset & Slot Portofolio (VIS Society & AyoCuci):**
   - Menggantikan item slot portofolio lama dengan **VIS Society** (`vissociety.org` - Portal & Komunitas Bisnis Regional).
   - Menambahkan aset gambar perangkat untuk VIS Society: `vis-phone-screen.webp` dan `vis-tablet-screen.webp`.
   - Menambahkan aset mockup resolusi tinggi untuk AyoCuci: `ayocuci-mockup-hd.webp`, `ayocuci-devices.webp`, dan `ayocuci-devices.png`.
3. **Interaksi Tautan Domain & Tombol Aksi:**
   - Tautan domain eksternal dilengkapi ikon panah `ExternalLink` dengan efek animasi translasi saat di-hover.
   - Tombol **"Lihat Semua Portofolio"** berwarna hijau `#6ab135` berlabuh secara penuh (*full-width*) di bagian bawah kartu dan langsung mengarah ke `/template-website`.
4. **Paginasi & Navigasi Mobile:**
   - Navigasi khusus mobile dengan tombol panah kiri-kanan dan indikator titik (*dot pills*) berwarna hijau `#6ab135`.

### C. Desain Interaktif Filter Kategori Template (`template-preview-section.tsx`)
1. **Peningkatan Ukuran & Jarak Tap Target:**
   - Ukuran pill kategori diperbesar dengan padding fleksibel (`px-3.5 xs:px-4.5 sm:px-5 md:px-6 py-2 xs:py-2.5 sm:py-3`) untuk kenyamanan jempol saat browsing di smartphone.
2. **Efek Visual State Aktif:**
   - Status tab aktif diberi bayangan aksen hijau lembut (`shadow-md shadow-[#45a02e]/25`) dan efek interaktif *scale up* saat disentuh.

### D. Penyelarasan Navigasi Header (`site-header.tsx`)
1. **Direct Link "Hubungi Kami":**
   - Menambahkan link langsung **Hubungi Kami** (`/hubungi-kami`) pada navbar utama.
2. **Pemisahan Menu Dropdown Perusahaan:**
   - Menu **Tentang** kini mengarah tepat ke `/tentang` (bukan dialihkan ke `/hubungi-kami`).
3. **Responsif Nav Gap:**
   - Menyesuaikan jarak antar item navigasi (`gap-4.5 lg:gap-7 xl:gap-8`) agar navbar tidak mengalami baris ganda (*wrapping*) pada monitor laptop 13-14 inch atau iPad Pro.

### E. Sinkronisasi Lokalisasi i18n (`frontend/lib/i18n/id.ts` & `en.ts`)
- Memperbarui teks deskripsi, statistik, tag, dan domain link untuk 5 sistem unggulan:
  1. **AyoCuci** (`ayocuci.co.id`) - Aplikasi kasir POS IoT Laundry.
  2. **NadimTrans Rentcar** (`nadimtrans.com`) - Sistem reservasi rental mobil terpadu.
  3. **VIS Society** (`vissociety.org`) - Portal komunitas bisnis regional lintas batas.
  4. **HKTI Batam** (`hktikotabatam.org`) - Portal agribisnis dan database kemitraan tani.
  5. **CRM Piposmart** (`crm.piposmart.com`) - Platform manajemen prospek & automasi sales pipeline.

---

## 3. Rekap Seluruh Pembaruan di Branch `satria`

Berikut adalah kronologi perkembangan fitur dan perbaikan yang telah dibangun di branch `satria`:

| Tanggal | Hash Komit | Pesan Komit & Ruang Lingkup |
| :--- | :--- | :--- |
| **8 Okt 2026** | `6cee625` | **feat(landing):** Update responsive layout hero section, penyelarasan copywriting mobile, filter kategori pills, dan aset portofolio (VIS Society & AyoCuci). |
| **7 Okt 2026** | `823f61e` | **feat:** Penambahan dropdown Perusahaan (Tentang & Blog), workflow interaktif `/tutorial`, halaman kontak `/hubungi-kami`, penyesuaian katalog `/template-website`, dan 15+ aset tampilan perangkat. |
| **7 Okt 2026** | `d355484` | **merge:** Sinkronisasi integrasi branch `main` ke dalam branch `satria`. |
| **7 Okt 2026** | `ca1d1fe` / `d141bd6` | **feat(nadim):** Pembaruan slogan, interaksi tautan & picker peta penjemputan, perbaikan LanguageSwitcher, dan dokumentasi NadimTrans. |
| **6 Okt 2026** | `cb3a86b` | **fix(nadim):** Penanganan bug switch bahasa di hosting serverless (mencegah blank page & redirect loop). |
| **6 Okt 2026** | `0ff7b6c` | **feat:** Perbaikan ringkasan order form, endpoint `/api/set-locale`, dan seksi informasi rekening resmi Bank Mandiri PT Nadim Auto Transindo. |
| **6 Okt 2026** | `8b746d1` | **feat:** Arsitektur multi-bahasa 4 locale (`id`, `en`, `en-sg`, `ms`), konversi kurs otomatis (IDR, SGD, MYR), auto locale detection, dan 17 aset WebP armada. |

---

## 4. Status Integrasi dengan Branch `main`

- **Pengecekan Branch `main`:**
  - Remote repository `origin/main` memiliki **2 komit baru** yang belum ada di local sebelumnya:
    1. `9539e54` (*Adding CI/CD Pipeline based GHCR at Nadimtrans and HKTI*)
    2. `938d6dd` (*Bidtech as Standlone - penyesuaian Dockerfile & konfigurasi build standalone Next.js*)
- **Aksi yang Telah Dijalankan:**
  - Local branch `main` telah berhasil di-**pull / fast-forward** dari `ca1d1fe` ke `938d6dd` sehingga branch `main` lokal kini **100% up to date** dengan GitHub remote.
- **Catatan untuk Branch `satria`:**
  - Branch aktif saat ini tetap berada di `satria` (komit `6cee625`).
  - Tidak dilakukan merge otomatis `main` ke `satria` karena di branch `main` terdapat penghapusan file dokumentasi lama (`docs/DOKUMENTASI_PERUBAHAN_MAIN.md`) yang sebelumnya sempat dimodifikasi di branch `satria`. Penggabungan dapat dilakukan sewaktu-waktu dengan konfirmasi pemilihan versi dokumen yang ingin dipertahankan.
