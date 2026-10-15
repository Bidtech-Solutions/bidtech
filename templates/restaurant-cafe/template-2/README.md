# 🍽️ Deny Restaurant — Modern Culinary Web Application

A cutting-edge, high-performance web application designed for **Deny Restaurant**, featuring artisanal wood-fired pizza, craft smash burgers, handmade pasta, and boutique dolci. Built with modern web standards, fluid animations, bilingual localization, and full mobile optimization.

🔗 **Repository:** [https://github.com/Foxxyweb/Deny-Restaurantproject](https://github.com/Foxxyweb/Deny-Restaurantproject)

---

## 💻 Bahasa Pemrograman & Teknologi yang Digunakan (Tech Stack)

### 1. Bahasa Pemrograman (Programming Languages)
* **TypeScript (v5.x)**: Bahasa utama pada seluruh arsitektur proyek, menjamin type-safety penuh untuk model data hidangan (*dishes*), profil staf, kamus terjemahan (*i18n*), dan properti komponen React.
* **JavaScript (ES2024 / Node.js)**: Runtime lingkungan eksekusi dan automasi script data.
* **HTML5 (Semantic)**: Struktur web semantik ramah SEO dan aksesibilitas screen reader.
* **CSS3 & Modern CSS**: Variabel tema, glassmorphism, gradasi warna kurasi, dan keyframe animasi.

### 2. Framework & Library Utama (Frameworks & Libraries)
* **Next.js 15.1 (App Router)**: Framework React fullstack dengan Server & Client Components, Dynamic Routing (`/menu/[id]`, `/staff/[id]`), dan image optimization.
* **React 19**: Library UI komponen reaktif modern berbasis hooks (`useState`, `useEffect`, `useMemo`, `useContext`).
* **Tailwind CSS v4**: Utility-first CSS framework generasi terbaru untuk styling ultra-cepat, performan tinggi, dan desain responsif.
* **Framer Motion 11**: Motion engine untuk animasi transisi halaman, efek kartu melayang (*hover lifts*), spring physics, dan layout animation.
* **GSAP & @gsap/react**: Animasi berkinerja tinggi untuk marquee berjalan halus (*infinite running text*) dan parallax visual.
* **Lenis**: Engine *smooth inertia momentum scrolling* untuk pengalaman navigasi yang mewah dan halus.
* **Lucide React**: Koleksi ikon SVG modern dan ringan.

---

## ⚙️ Sistem & Arsitektur yang Diterapkan (System Architecture)

### 1. 🌐 Sistem Multi-Bahasa Dinamis (Bilingual i18n System)
* Menggunakan **React Context API** (`LanguageProvider`) dan custom hook `useLanguage()`.
* Mendukung pertukaran bahasa secara instan antara **Bahasa Indonesia (ID)** dan **English (EN)** tanpa me-reload halaman.
* Kamus data terjemahan terpusat (`src/lib/i18n-data.ts`) yang mencakup:
  * 34 menu makanan & minuman (nama, deskripsi, bahan baku, alergen).
  * 8 profil koki & kru (jabatan, biografi, kutipan, spesialisasi).
  * Filter kategori, tombol navigasi, footer, dan pesan WhatsApp.

### 2. 💬 Sistem Ulasan Langsung WhatsApp (WhatsApp Direct Review System)
* Menggantikan sistem komentar ulasan publik konvensional menjadi saluran privat langsung ke customer service atau pemilik restoran.
* Otomatis meng-encode nama pelanggan, bintang rating (1–5 bintang), teks ulasan, dan waktu pengiriman ke dalam format pesan resmi WhatsApp melalui URL schema WhatsApp API (`https://wa.me/...`).

### 3. 🖼️ Sistem Galeri Multi-Foto Interaktif & Auto-Slideshow
* Tersemat pada halaman detail menu (`/menu/[id]`).
* Menampilkan tepat **3 foto pendukung** yang unik di bawah foto utama.
* **Auto-cycling interval**: Berganti foto secara otomatis setiap beberapa detik dengan transisi memudar halus.
* **Interactive Switching & Modal**: Foto utama langsung berganti saat thumbnail diklik, dan dapat diperbesar ke resolusi penuh.

### 4. 👨‍🍳 Sistem Modul Tim & Koki Restoran (`/staff` & `/staff/[id]`)
* **Department Filtering System**: Memfilter kru berdasarkan kategori (*Kitchen Masters*, *Bakery & Dolci*, *Bar & Craft*, *Hospitality*).
* **Founder Spotlight**: Bagian sorotan khusus untuk Executive Chef Deny Pratama beserta kutipan filosofi dapur.
* **Dynamic Staff Details**: Halaman profil individual lengkap dengan biografi, hidangan kreasi favorit, tombol apresiasi (*like counter*), dan tombol share link.

### 5. 📱 Sistem Responsif & Framing Wajah Mobile (Adaptive Viewport Framing)
* Menerapkan rasio wadah proporsional vertikal (`aspect-[4/4.2]` di mobile) dan titik jangkar visual (`object-[center_24%]`).
* Memastikan foto potret koki menampilkan seluruh wajah (mata, hidung, senyuman, dagu, hingga seragam) secara sempurna di layar HP tanpa risiko terpotong pada bagian dahi (*no forehead-only crop*).

---

## 📂 Struktur Direktori Proyek (Project Structure)

```text
deny-restaurant/
├── public/                     # Aset statis & foto profil koki
│   ├── logo.webp
│   └── staff/                  # Foto portrait 8 koki & kru (Format WebP terkompresi tinggi)
│       ├── deny-pratama.webp
│       ├── marco-rossi.webp
│       ├── sofia-bianchi.webp
│       ├── david-chen.webp
│       ├── clara-laurent.webp
│       ├── elena-vance.webp
│       ├── julian-meyer.webp
│       └── aria-santos.webp
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (pages)/
│   │   │   ├── menu/           # Halaman katalog menu & detail [id]
│   │   │   ├── staff/          # Halaman staf & detail profil [id]
│   │   │   └── story/          # Halaman cerita filosofi restoran
│   │   ├── globals.css         # Import styling Tailwind & custom CSS
│   │   ├── layout.tsx          # Root layout & providers
│   │   └── page.tsx            # Beranda utama (Homepage)
│   ├── components/
│   │   ├── pages/              # View komponen per halaman
│   │   ├── providers/          # LanguageProvider & SmoothScrollProvider
│   │   ├── sections/           # Bagian-bagian landing page (Hero, Navbar, Footer)
│   │   └── ui/                 # Komponen antarmuka atomik
│   ├── lib/
│   │   ├── restaurant-data.ts  # Database lokal menu, staf, & kategori
│   │   ├── i18n-data.ts        # Kamus terjemahan Bahasa Indonesia & Inggris
│   │   └── utils.ts            # Helper function (cn / tailwind-merge)
│   └── styles/                 # Desain token, tema, dan animasi CSS
├── .gitignore                  # Mengabaikan node_modules, .next, & build cache
├── package.json                # Dependensi proyek
├── tsconfig.json               # Konfigurasi TypeScript
└── README.md                   # Dokumentasi proyek
```

---

## 🚀 Panduan Menjalankan Proyek Secara Lokal

### 1. Clone Repository
```bash
git clone https://github.com/Foxxyweb/Deny-Restaurantproject.git
cd Deny-Restaurantproject
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Jalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```
Buka browser dan akses alamat: `http://localhost:3000`

### 4. Build untuk Produksi
```bash
npm run build
npm run start
```
