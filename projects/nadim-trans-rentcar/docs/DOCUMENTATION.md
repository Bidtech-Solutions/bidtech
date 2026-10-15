# Dokumentasi Proyek Website NadimTrans RentCar (PT. Nadim Auto Transindo)

Dokumentasi resmi arsitektur sistem, struktur data armada, panduan tema warna, dan alur pengerjaan untuk website **NadimTrans RentCar Batam**.

---

## 1. Profil & Identitas Bisnis

| Komponen | Keterangan |
| :--- | :--- |
| **Nama Legal** | PT. Nadim Auto Transindo |
| **Brand Layanan** | NadimTrans RentCar |
| **Slogan** | LIBURAN, KERJAAN, dan SEMUA URUSAN, INGAT NADIMTRANS |
| **Domisili / Wilayah Operasional** | Batam, Kepulauan Riau |
| **Alamat Kantor Fisik** | Perum KDA Cluster Nuri Kepodang, Jl. Kepodang 3 No. 2, Belian, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29464 |
| **Google Maps** | https://maps.app.goo.gl/uVKJECyfgTPvikvn9 |
| **Nomor Kontak / WhatsApp** | `+62 812-7600-3870` (Admin 1) / `+62 813-3141-2062` (Admin 2) |
| **Email Resmi** | `nadimtransindobatam@yahoo.com` |
| **Instagram** | @nadimtransrentcar.batam |
| **TikTok** | @nadim.trans.batam |
| **Fokus Layanan** | Rental Mobil Lepas Kunci, Sewa Mobil + Supir, Antar Jemput Bandara Hang Nadim, Carter Pariwisata & Pernikahan Batam |

---

## 2. Panduan Desain & Identitas Visual (Branding)

### A. Palet Warna (Luxury Gold & Dark Slate)
Website telah diperbarui dari tema biru menjadi tema **Gold & White** yang mewah, harmonis dengan logo resmi:
- **Primary Gold**: `#D4AF37` (Tailwind: `gold-500` / `amber-500`)
- **Accent Gold Light**: `#F5E4BE` & `#E4B35D` (Tailwind: `gold-200` & `gold-400`)
- **Dark Luxury Background**: `#020617` (Tailwind: `slate-950`)
- **Card Background**: `#0B0F19` & `#FFFFFF`
- **Text**: `text-white`, `text-slate-900`, `text-amber-400`, `text-gray-300`

### B. Logo & Icon Resmi
- **File Asset**: `/public/icons/icon-2.webp` (dan `/public/images/icon-2.webp`)
- **Penerapan**: Digunakan pada `components/layout/Header.tsx`, `components/layout/Footer.tsx`, serta favicon/app icon di `app/layout.tsx` dalam bentuk emblem transparan siluet mobil emas dan inisial krom "NTR" dengan drop shadow gold.

### C. Tipografi
- **Headline / Judul Utama**: `Bebas Neue` (display uppercase bold & dynamic)
- **Body & Teks Bacaan**: `Inter` (sans-serif modern, bersih, dan mudah dibaca)

---

## 3. Struktur Folder Proyek

```plaintext
projects/nadim-trans-rentcar/
├── app/                                 # Next.js 14 App Router
│   ├── layout.tsx                       # Root layout, Google Fonts (Inter + Bebas Neue), SEO Metadata
│   ├── page.tsx                         # Halaman Beranda (Landing Page Utama)
│   ├── kendaraan/                       
│   │   ├── page.tsx                     # Katalog Seluruh Armada (Search & Filter Kategori)
│   │   └── [id]/                        
│   │       ├── page.tsx                 # Dynamic SSG page (generateStaticParams untuk ID 1-8)
│   │       └── VehicleDetailClient.tsx  # Halaman detail unit, gallery selector, form booking & WA
│   ├── layanan/                         
│   │   └── page.tsx                     # Halaman detail layanan rental (Lepas Kunci, Driver, Airport)
│   └── faq/                             
│       └── page.tsx                     # Halaman tanya-jawab umum & bantuan pelanggan
│
├── components/                          # Komponen Antarmuka (Modular)
│   ├── layout/                          
│   │   ├── Header.tsx                   # Navbar fixed dengan logo resmi & link navigasi
│   │   └── Footer.tsx                   # Footer luxury dark slate dengan legalitas PT & kontak Batam
│   ├── sections/                        # Komponen per-section di halaman utama
│   │   ├── Hero.tsx                     # Hero banner (Background Bandara Hang Nadim + Alphard Cutout)
│   │   ├── Features.tsx                 # Carousel armada mobil unggulan
│   │   ├── WhyChooseUs.tsx              # Keunggulan perusahaan & foto nyata kantor fisik Batam (background-1.webp)
│   │   ├── howtobook.tsx                # 3 Langkah mudah alur penyewaan mobil
│   │   ├── Testimonials.tsx             # Testimoni asli pelanggan & tamu VIP Bandara
│   │   └── Faq.tsx                      # Accordion pertanyaan umum di beranda
│   ├── providers/                       
│   │   └── SmoothScroll.tsx             # Lenis smooth-scroll provider
│   └── ui/                              # Komponen UI atomik (Button, Badge, Modal)
│
├── constants/                           
│   └── navigation.ts                    # Daftar link rute menu navigasi website
│
├── lib/                                 
│   ├── data.ts                          # Pusat Data: Daftar 8 armada Batam, spesifikasi, tarif, & info PT
│   └── utils.ts                         # Class merging helper (cn utility)
│
├── public/                              # Aset Statis
│   ├── icons/                           
│   │   ├── icon-2.webp                  # Emblem & icon resmi transparan PT. Nadim Auto Transindo
│   │   ├── icon-3.webp                  # Emblem horizontal teks besar PT. Nadim Auto Transindo
│   │   └── logo.webp                    # Badge logo square
│   └── images/                          # Foto armada transparan & background asli Batam
│       ├── background-3.webp            # Foto latar belakang luxury showroom NTR & emblem dinding
│       ├── background-1.webp            # Foto nyata kantor fisik & armada Batam
│       ├── background.webp              # Foto latar belakang VVIP Hang Nadim Airport
│       ├── hero_background.webp         # Foto latar belakang hero
│       ├── harga-list-2.webp            # Brosur daftar harga resmi PT. Nadim Auto Transindo
│       ├── Alphard.webp                 # Cutout unit Toyota Alphard VIP
│       ├── Hiace-Commuter.webp          # Cutout unit Toyota Hiace Commuter
│       ├── Hiace-Premio.webp            # Cutout unit Toyota Hiace Premio
│       ├── Fortuner.webp                # Cutout unit Toyota Fortuner GR Sport
│       ├── Innova-Zenix.webp            # Cutout unit Toyota Innova Zenix
│       ├── Innova-Reborn.webp           # Cutout unit Toyota Innova Reborn
│       ├── Hyundai-Stargazer.webp       # Cutout unit Hyundai Stargazer
│       ├── New-Avanza.webp              # Cutout unit Toyota New Avanza
│       ├── New-Xenia.webp               # Cutout unit Daihatsu New Xenia
│       ├── Raize.webp                   # Cutout unit Toyota Raize
│       ├── Rocky.webp                   # Cutout unit Daihatsu Rocky
│       ├── New-Brio.webp                # Cutout unit Honda New Brio
│       ├── New-Agya.webp                # Cutout unit Toyota New Agya
│       ├── New-Calya.webp               # Cutout unit Toyota New Calya
│       └── New-Ayla.webp                # Cutout unit Daihatsu New Ayla
│
├── styles/                              
│   └── globals.css                      # Global Tailwind directives & styling
├── tailwind.config.js                   # Konfigurasi token warna gold & utilitas
├── DOCUMENTATION.md                     # File dokumentasi ini
└── package.json                         # Dependencies & scripts
```

---

## 4. Daftar Armada & Sinkronisasi Data Nyata Batam

Seluruh armada diatur terpusat di file [`lib/data.ts`](file:///c:/Users/User/Documents/Bidtech/bidtech-landing/projects/nadim-trans-rentcar/lib/data.ts). Informasi daftar harga asli diekstrak langsung dari brosur resmi (`harga-list-2.webp`):

| ID | Nama Unit | Kategori | Tarif Sewa Harian | Keterangan Paket | Aset Gambar |
| :---: | :--- | :---: | :--- | :--- | :--- |
| **1** | **Toyota Alphard VIP** | MPV | **Rp 3.000.000** | per 12 Jam *(Include Driver & BBM)* | `Alphard.webp` |
| **2** | **Toyota Hiace Commuter** | Minibus | **Rp 1.300.000** | per Day *(Include BBM & Driver)* | `Hiace-Commuter.webp` |
| **3** | **Toyota Hiace Premio** | Minibus | **Rp 2.000.000** | per Day *(Include BBM & Driver)* | `Hiace-Premio.webp` |
| **4** | **Toyota Fortuner GR Sport** | SUV | **Rp 1.300.000** | per Day *(Mobil Only)* \| Rp 2.000.000 *(+Driver 12 Jam)* | `Fortuner.webp` |
| **5** | **Toyota Innova Zenix** | MPV | **Rp 600.000** | per Day *(Mobil Only)* \| Rp 1.200.000 *(+Driver 12 Jam)* | `Innova-Zenix.webp` |
| **6** | **Toyota Innova Reborn** | MPV | **Rp 550.000** | per Day *(Mobil Only)* \| Rp 1.000.000 *(+Driver 12 Jam)* | `Innova-Reborn.webp` |
| **7** | **Hyundai Stargazer** | MPV | **Rp 400.000** | per Day *(Mobil Only)* | `Hyundai-Stargazer.webp` |
| **8** | **Toyota New Avanza** | MPV | **Rp 350.000** | per Day *(Mobil Only)* | `New-Avanza.webp` |
| **9** | **Daihatsu New Xenia** | MPV | **Rp 350.000** | per Day *(Mobil Only)* | `New-Xenia.webp` |
| **10** | **Toyota Raize** | SUV | **Rp 350.000** | per Day *(Mobil Only)* | `Raize.webp` |
| **11** | **Daihatsu Rocky** | SUV | **Rp 350.000** | per Day *(Mobil Only)* | `Rocky.webp` |
| **12** | **Honda New Brio** | City Car | **Rp 300.000** | per Day *(Mobil Only)* | `New-Brio.webp` |
| **13** | **Toyota New Agya** | City Car | **Rp 300.000** | per Day *(Mobil Only)* | `New-Agya.webp` |
| **14** | **Toyota New Calya** | MPV | **Rp 300.000** | per Day *(Mobil Only)* | `New-Calya.webp` |
| **15** | **Daihatsu New Ayla** | City Car | **Rp 250.000** | per Day *(Mobil Only)* | `New-Ayla.webp` |

---

## 5. Implementasi Khusus Section Hero

- **Latar Belakang (`background-3.webp`)**: Foto showroom & lobby kantor megah **PT. Nadim Auto Transindo** dengan logo 3D NTR emas & perak pada dinding. Posisi background diatur naik (`object-[75%_18%] md:object-[82%_18%]`) agar logo megah 3D NTR tampak jelas di atas atap kendaraan.
- **Unit Mobil Utama (`Alphard-2.webp`)**: Cutout resolusi tinggi unit Toyota Alphard putih VIP dengan ukuran proporsional sedang (*medium*), kontak bayangan lantai yang realistis, dan efek interaktif *mouse-parallax*.
- **Tanpa Elemen Mengganggu**: Tampilan hero bersih, proporsional, dan logo NTR tetap terlihat megah tanpa tertutup badan mobil.

---

## 6. Panduan Pengelolaan (Cara Tambah / Edit Mobil)

Untuk menambah atau mengedit harga mobil, Anda cukup mengedit file **`lib/data.ts`**:

```typescript
// Contoh struktur objek mobil di lib/data.ts:
{
  id: 9,
  name: "Toyota Hiace Commuter",
  type: "Minibus Pariwisata",
  category: "Minibus",
  price: 1100000,
  priceFormatted: "1.100.000",
  priceNote: "per Hari (Include Supir)",
  image: "/images/mobil-nama.webp",
  gallery: ["/images/mobil-nama.webp", "/images/interior.webp"],
  rating: 4.9,
  reviews: 32,
  specs: {
    seats: 14,
    luggage: 6,
    transmission: "Manual",
    fuel: "Solar Diesel",
  },
  featured: true,
  description: "Pilihan terbaik untuk rombongan wisata atau dinas di Batam...",
  features: ["Kapasitas 14 Kursi", "Full AC Dingin", "Audio Multimedia"],
  included: ["Unit Kendaraan Prima", "Asuransi Perjalanan", "Bantuan Darurat 24 Jam"],
  terms: ["KTP / Paspor asli", "SIM aktif", "Deposit jaminan sewa"]
}
```

---

## 7. Fitur Khusus & Multi-Bahasa Internasional

### A. Dukungan Multi-Bahasa (4 Locale)
Website mendukung 4 locale lengkap dengan navigasi otomatis dan switcher interaktif:
1. **Indonesia (`/` atau `/id`)**: Bahasa default Indonesia.
2. **English Global (`/en`)**: Untuk wisatawan mancanegara.
3. **Singapore English (`/en-sg`)**: Khusus wisatawan Singapura dengan konversi otomatis mata uang ke **SGD** dan opsi terminal feri Batam.
4. **Bahasa Melayu (`/ms`)**: Khusus wisatawan Malaysia dengan konversi otomatis mata uang ke **MYR**.

### B. Konversi Kurs Otomatis (IDR, SGD, MYR)
- **IDR**: Format `Rp X.XXX.XXX`.
- **SGD**: Dikonversi otomatis berdasarkan rate kurs dinamis dengan format `S$ XX.XX`.
- **MYR**: Dikonversi otomatis dengan format `RM XX.XX`.

### C. Peta Interaktif Titik Antar / Jemput (Delivery Map Picker)
- Menggunakan **Leaflet & OpenStreetMap** terintegrasi.
- Pengguna dapat memilih preset titik lokasi populer di Batam (Bandara Hang Nadim, Batam Centre Ferry Terminal, Harbour Bay, Sekupang, Nongsapura, Mega Mall, Nagoya Hill, dll) atau menggeser pin koordinat langsung di peta.
- Dilengkapi tombol **Popup Fullscreen / Expand Map** untuk kenyamanan pengguna di mobile dan iPad/tablet.

### D. Switcher Bahasa & Auto-Close
- Dilengkapi pendeteksi klik di luar (*click outside*) dan tombol `ESC` untuk menutup dropdown bahasa secara instan.
- Menggunakan cookie `NEXT_LOCALE` dengan secure flag saat HTTPS aktif di production hosting.

---

## 8. Perintah Menjalankan & Membangun Proyek

1. **Menjalankan Dev Server Lokal**:
   ```bash
   cd projects/nadim-trans-rentcar
   npm run dev
   ```
   Buka peramban di `http://localhost:3000`.

2. **Membuat Build Produksi (SSG & Dynamic Routes)**:
   ```bash
   cd projects/nadim-trans-rentcar
   npm run build
   ```
   Menghasilkan 116 rute statis teroptimasi penuh untuk seluruh kombinasi locale (`id`, `en`, `en-sg`, `ms`) dan katalog armada.
