# Dokumentasi Perubahan & Pembaruan (13 Oktober 2026) - Branch Satria

**Repository:** `bidtech-landing`  
**Proyek Terkait:** `bidtech-landing/frontend`  
**Cabang / Branch:** `satria`  
**Status Komit Basis:** `58d02d0` (*feat: update hero models (6, 7), cta model (8), portfolio & tentang kami pages*)  
**Penulis / Author:** `Satria & AI Assistant`  
**Tanggal Pelaksanaan:** Selasa, 13 Oktober 2026  

---

## 1. Ringkasan Eksekutif

Pada tanggal **13 Oktober 2026**, dilakukan standardisasi menyeluruh pada arsitektur komponen Call-to-Action (CTA), implementasi sistem paginasi berbasis halaman (*page-based pagination*) pada katalog portofolio, integrasi multi-bahasa (i18n ID/EN), serta pembersihan duplikasi kode di seluruh halaman frontend BidTech.

Pembaruan ini menuntaskan integrasi visual dari komit `58d02d0` sebelumnya (penambahan model hero 6 & 7, model CTA 8, halaman `/tentang`, dan halaman `/portofolio`) sehingga seluruh alur navigasi dan aksi pengguna menjadi konsisten, bersih, dan performan.

---

## 2. Rincian Perubahan Terkini (13 Oktober 2026)

### A. Standardisasi & Refaktor Komponen Universal CTA (`frontend/components/shared/universal-cta.tsx`)

Sebelumnya, beberapa halaman seperti `/blog`, `/hubungi-kami`, dan `/tutorial` mengimplementasikan blok CTA secara manual (hardcoded) dengan ratusan baris kode duplikat yang sulit dikelola.

1. **Konsolidasi Single Source of Truth:**
   - Seluruh halaman kini menggunakan satu komponen terpusat `<UniversalCta />`.
   - Menghilangkan duplikasi markup banner, aset visual model (`/images/cta/model-8.webp`), dan badge checklist.
2. **Context-Aware Navigation (Deteksi Rute Otomatis):**
   - Menggunakan hook `usePathname()` dari Next.js untuk mendeteksi lokasi halaman pengguna.
   - **Pada Halaman Portofolio (`/portofolio`):** Tombol sekunder secara otomatis dialihkan ke katalog template (`/template-website`) dengan label *"Lihat Template"* (ID) atau *"Browse Templates"* (EN). Hal ini mencegah tautan berulang (*circular link*) yang mengarah ke halaman yang sedang dibuka.
   - **Pada Halaman Lainnya (`/`, `/blog`, `/tutorial`, `/hubungi-kami`, `/tentang`):** Tombol sekunder secara default mengarah ke halaman portofolio (`/portofolio`) dengan label *"Lihat Portofolio"* (ID) atau *"View Portfolio"* (EN).
3. **Fleksibilitas Props Tambahan:**
   - Menambahkan properti opsional `secondaryText?: string` dan `secondaryHref?: string` untuk kebutuhan kustomisasi spesifik per halaman jika diperlukan.
4. **Dukungan Dwibahasa Penuh (i18n):**
   - Terkoneksi dengan context `useLanguage()` (`lang === "en"`):
     - **Headline ID:** *"Wujudkan Website & Aplikasi Impian Bersama BidTech"*
     - **Headline EN:** *"Create Your Dream Website & Application Together with BidTech"*
     - **Subheadline ID/EN:** Teks penjelasan konsultasi bisnis digital yang disesuaikan.
     - **WhatsApp Button ID/EN:** *"Konsultasi via WhatsApp"* / *"Consult via WhatsApp"*.
     - **Checklist Garansi ID/EN:**
       - Respon Cepat < 15 Menit (*Fast Response < 15 Minutes*)
       - Konsultasi 100% Gratis & Tanpa Komitmen (*100% Free Consultation & No Commitment*)
       - Garansi Maintenance (*Maintenance Guarantee*)

---

### B. Sistem Paginasi Nyata pada Katalog Portofolio (`frontend/app/portofolio/page.tsx`)

Sebelumnya, kontrol paginasi di bawah grid portofolio hanya menavigasikan item aktif satu per satu secara carousel sederhana, yang tidak mencerminkan perilaku paginasi grid multi-kartu.

1. **Page-Based Grid Pagination (6 Item Per Halaman):**
   - Menetapkan konstanta `ITEMS_PER_PAGE = 6`.
   - Menghitung `totalPages` secara dinamis berdasarkan total data item:
     $$\text{totalPages} = \max\left(1, \lceil \text{items.length} / \text{ITEMS\_PER\_PAGE} \rceil\right)$$
   - Mengiris daftar kartu yang ditampilkan menggunakan `.slice(startIndex, startIndex + ITEMS_PER_PAGE)`.
2. **Interaktivitas & Navigasi Halaman:**
   - Tombol **"Sebelumnya" / "Previous"** dan **"Selanjutnya" / "Next"** dilengkapi state `disabled`, efek transparan `opacity-40`, dan `pointer-events-none` ketika mencapai halaman awal/akhir.
   - Nomor indikator halaman (`1`, `2`, ...) di-render secara dinamis sesuai jumlah `totalPages`.
   - Status halaman aktif ditandai dengan warna hijau BidTech (`bg-[#5bb82e] text-white scale-105`).
3. **Auto Smooth Scrolling:**
   - Menambahkan `gridSectionRef` pada seksi daftar portofolio.
   - Saat pengguna menekan tombol nomor halaman atau panah navigasi, viewport secara otomatis bergeser secara halus (*smooth scroll*) kembali ke posisi atas grid portofolio (`top - 80px`), meningkatkan kenyamanan pengalaman pengguna (*UX*).
4. **Sinkronisasi Otomatis URL Search Query:**
   - Jika pengguna mengakses URL dengan parameter tertentu seperti `?id=vissociety` atau `?item=nadimtrans`, sistem secara otomatis menghitung indeks item dan mengatur `currentPage` ke halaman tempat item tersebut berada.
5. **Penambahan Banner Universal CTA:**
   - Menambahkan `<UniversalCta className="mt-16 sm:mt-24 md:mt-28 px-0" />` di bagian bawah halaman portofolio untuk mengonversi prospek yang selesai meninjau karya BidTech.

---

### C. Pembersihan & Migrasi Halaman Terkait

1. **Halaman Blog (`frontend/app/blog/page.tsx`):**
   - Menghapus box CTA inline lama.
   - Menggantikannya dengan `<UniversalCta className="mt-14 sm:mt-20 px-0" />`.
2. **Halaman Hubungi Kami (`frontend/app/hubungi-kami/page.tsx`):**
   - Menghapus 80+ baris kode hardcoded section CTA dengan visual model.
   - Menggantikannya dengan `<UniversalCta className="pb-16 sm:pb-24" />`.
3. **Halaman Tutorial (`frontend/app/tutorial/page.tsx`):**
   - Menghapus 80+ baris kode hardcoded section CTA dengan visual model.
   - Menggantikannya dengan `<UniversalCta className="py-12 sm:py-20" />`.

---

## 3. Rekap Perubahan Komit `58d02d0` Sebelumnya (9 Oktober 2026)

Sebagai referensi kesinambungan, berikut adalah fitur yang telah dikomit pada sesi sebelumnya:

1. **Aset Visual & Hero Showcase Baru:**
   - Menambahkan model ilustrasi resolusi tinggi: `model-6.webp` dan `model-7.webp` untuk hero carousel.
   - Menambahkan `model-8.webp` (konsultan memegang smartphone) sebagai maskot visual CTA.
   - Screenshot baru aplikasi kasir IoT AyoCuci: `ayocuci-phone-screen.webp`, `ayocuci-tablet-screen.webp`, dan `web_ayocuci.webp`.
2. **Halaman Khusus Portofolio (`/portofolio`):**
   - Pembuatan rute baru dengan `page.tsx` dan `layout.tsx` (metadata SEO lengkap).
   - Komponen panggung interaktif multi-device: `portfolio-showcase-stage.tsx`.
   - Basis data terstruktur `frontend/lib/data/portfolio.ts` yang mendukung dwibahasa (ID & EN).
3. **Redesain Halaman Tentang Kami (`/tentang`):**
   - Pembuatan rute `/tentang` dengan narasi profil perusahaan, visi, misi, nilai utama, serta showcase tim (`team-meeting.webp` dan `cta-woman.webp`).
4. **Otomatisasi Tangkapan Layar:**
   - Skrip `frontend/scripts/capture_ayocuci.mjs` untuk otomatisasi capture tampilan web dan mobile mockup.

---

### D. Pembaruan Proyek Nadim Trans RentCar (`projects/nadim-trans-rentcar`)

1. **Penambahan 9 Butir Peraturan Rental Mobil Resmi:**
   - Menyematkan teks aturan rental mobil verbatim dari poster/flyer resmi Nadim Trans Rent Car Batam pada halaman detail unit mobil (`app/kendaraan/[slug]/VehicleDetailClient.tsx`).
   - Ditampilkan dengan kartu peringatan khusus beraksen emas (*amber alert badge*) `"PERATURAN RENTAL MOBIL - PENTING DIKETAHUI KETENTUAN-KETENTUAN DI BAWAH INI!"` pada:
     1. Tab **Syarat & Ketentuan** (di bawah checklist identitas dokumen).
     2. Tab **Deskripsi & Kenyamanan** (di bawah rincian fasilitas).
   - Seluruh 9 butir aturan dicantumkan persis tanpa penambahan/pengurangan kata:
     1. *Kendaraan mobil/motor yang disewakan tidak dapat dipindah tangankan*
     2. *Kendaraan tidak dapat dijadikan jaminan/digadaikan*
     3. *Pelanggaran No. 1 & 2 akan diproses melalui jalur hukum/pidana. Pemilik kendaraan berhak mengambil kembali kendaraannya.*
     4. *Pengembalian kendaraan harus dalam keadaan seperti pada saat serah terima kendaraan di awal. Jika terjadi lecet/tabrakan, 100% adalah tanggung jawab pihak penyewa dan akan dikenakan denda. Jika kerusakan cukup parah, Penyewa wajib membayar sewa kendaraan selama kendaraan berada di bengkel.*
     5. *Jika terjadi keterlambatan pengembalian kendaraan, akan dikenakan biaya over time mulai dari 50.000 per jam sampai 10% dari harga sewa, dengan batas overtime 3 jam. Jika lebih dari 3 jam, waktu keterlambatan terhitung sebagai 1 hari sewa.*
     6. *Tidak diperbolehkan MEROKOK di dalam mobil. Jika saat pengembalian mobil berbau asap rokok, penyewa akan dikenakan denda sebesar 150K.*
     7. *Penyewa wajib menggunakan SAFETY BELT saat berkendara dan dilarang bermain ponsel. Jika terkena tilang elektronik, seluruh denda (100%) akan dibebankan kepada penyewa kendaraan.*
     8. *Bensin (BBM) yang terpakai wajib di kembalikan, apabila pengembalian kurang dari jarum/balok/range jarak tempuh, penyewa wajib bersedia membayar kekurangan bensin yang telah di gunakan.*
     9. *Mohon untuk tetap menjaga kebersihan kendaraan.*

2. **Integrasi Seluruh Tombol Call-to-Action (CTA) ke WhatsApp Nadim Trans:**
   - **Header Navbar (`components/layout/Header.tsx`):** Tombol CTA *"Hubungi Kami"* di header desktop dan mobile drawer yang sebelumnya mengarah ke `/#faq` kini dialihkan langsung ke WhatsApp resmi Nadim Trans (`+62 813-3141-2062`).
   - **Banner CTA Beranda (`components/sections/CTA.tsx`):** Komponen CTA beranda diimplementasikan dengan visual tema luxury gold & dark slate berlatar belakang gradien, dilengkapi tombol utama *"Chat WhatsApp Sekarang"* yang otomatis membuka WhatsApp Nadim Trans dengan template salam resmi.
   - **Widget Pemesanan Mobil (`VehicleBookingWidget.tsx`):** Tombol utama tetap mengarah ke WhatsApp dengan data rincian unit, jadwal, titik peta pengantaran, dan paket sewa.

3. **Deteksi Otomatis IP Indonesia & Penyelarasan Bahasa Pertama Kali:**
   - **Middleware Server (`middleware.ts`):** Jika request berasal dari IP negara Indonesia (`country === "ID"` atau header `accept-language` mengandung `id`), server langsung menetapkan cookie `user-language-preference = id` dan menyajikan halaman dalam Bahasa Indonesia tanpa redirect.
   - **Client Provider (`components/providers/LocaleRedirect.tsx`):** Mencegah redirect yang keliru ke bahasa Inggris bagi pengunjung di Indonesia yang menggunakan browser berbahasa Inggris. Sistem memprioritaskan pengecekan zona waktu Indonesia (WIB/WITA/WIT) dan Geo-IP (`country.is`). Jika pengunjung terdeteksi di Indonesia, bahasa secara permanen dikunci ke Bahasa Indonesia (`id`).
   - **Library i18n (`lib/i18n.ts`):** Fungsi `detectVisitorLocale()` diperluas untuk mengenali offset UTC+7, UTC+8, UTC+9 dan seluruh identifier timezone Indonesia.

---

### E. Perbaikan Masalah Blank Putih & Responsivitas Mobile/iPad Portofolio

1. **Investigasi Akar Masalah Halaman Blank Putih (`/portofolio`):**
   - **Router Cache Turbopack Stale / Corrupted:** Server dev Next.js 16 (Turbopack) sebelumnya berjalan dengan cache router `.next` yang usang dan korup (hanya mengindeks `/` dan memiliki syntax error pada auto-generated `.next/dev/types/routes.d.ts`), menyebabkan seluruh sub-rute termasuk `/portofolio` mengembalikan status HTTP `404 Not Found`.
   - **Teks Putih di Latar Belakang Putih:** Pada `frontend/app/layout.tsx`, tag `<body>` sebelumnya memiliki utility class `text-white` di atas `bg-white`. Ketika Next.js merender komponen fallback 404, pesan error tertulis dengan teks putih di atas latar putih sehingga tampak sebagai **layar blank putih total**.
   - **Solusi yang Diterapkan:**
     - Membersihkan direktori cache `.next` yang rusak.
     - Memperbaiki `frontend/app/layout.tsx` dengan mengganti `text-white` pada `<body>` menjadi `text-slate-900 antialiased`.
     - Me-reboot server dev Turbopack, sehingga seluruh sub-rute (`/portofolio`, `/tentang`, `/blog`, `/hubungi-kami`, `/tutorial`, `/template-website`) kini terindeks dengan benar dan menyajikan status `HTTP 200 OK`.

2. **Optimalisasi Responsivitas Mobile & Tablet/iPad:**
   - **Skalabilitas Panggung Perangkat (`frontend/components/portfolio/portfolio-showcase-stage.tsx`):**
     - Mengatur container max-width fleksibel: `max-w-[340px] min-[400px]:max-w-[380px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[600px] xl:max-w-[640px]`.
     - Pada layar ponsel kecil (< 400px), mockup 3 perangkat (iMac, iPad, iPhone) diskalakan proporsional agar tidak mengalami overflow horizontal atau clipping bayangan.
   - **Layout Grid Dua Kolom pada iPad (`frontend/app/portofolio/page.tsx`):**
     - Mengubah breakpoint grid featured showcase dari `lg:grid-cols-12` menjadi `md:grid-cols-12` (`md:col-span-7` untuk panggung perangkat dan `md:col-span-5` untuk konten deskripsi).
     - Pada perangkat iPad (768px – 1024px), panggung perangkat dan deskripsi kini tersusun rapi berdampingan (side-by-side) alih-alih menumpuk vertikal panjang.
   - **Penambahan Kategori Tag & Statistik Proyek:**
     - Menampilkan badge kategori tag (`activeItem.tag`) dan 3 kartu metrik ringkas (`activeItem.stats`) pada seksi featured showcase untuk memperkaya estetika mobile dan iPad.
    - **Touch Target & Paginasi Mobile:**
      - Memperbesar area ketuk (*tap target*) tombol halaman paginasi (`size-9 sm:size-10`) dan kartu portofolio untuk kenyamanan interaksi layar sentuh.

### F. Pembaruan Nomor Kontak WhatsApp Utama NadimTrans RentCar

1. **Penetapan Nomor Utama:**
   - Nomor WhatsApp dan telepon utama resmi diubah menjadi **`+62 812-7600-3870`** (format internasional: `6281276003870`).
   - Nomor kedua `+62 813-3141-2062` dialihkan menjadi nomor sekunder (Admin 2 / cadangan).
2. **Sinkronisasi Komponen:**
   - Objek `COMPANY_INFO` pada `projects/nadim-trans-rentcar/lib/data.ts` diperbarui: `phone: "+62 812-7600-3870"` dan `whatsapp: "6281276003870"`.
   - Otomatis memperbarui tombol CTA banner (`components/sections/CTA.tsx`), tombol konsultasi Header (`components/layout/Header.tsx`), Footer kontak & medsos (`components/layout/Footer.tsx`), dan JSON-LD schema SEO (`components/seo/JsonLd.tsx`).
   - Mengubah nomor pemesanan pada widget booking kendaraan (`components/booking/VehicleBookingWidget.tsx`) dan tombol konsultasi FAQ (`app/faq/FaqClient.tsx`).
   - Memperbarui referensi nomor pada `public/llms.txt` dan `docs/DOCUMENTATION.md`.

---

## 4. Matriks File yang Dimodifikasi

| No | File Path | Status | Deskripsi Singkat Perubahan |
| :-: | :--- | :---: | :--- |
| 1 | `frontend/components/shared/universal-cta.tsx` | Modified | Support i18n dwibahasa, deteksi rute via `usePathname()`, switch button portofolio vs template. |
| 2 | `frontend/app/portofolio/page.tsx` | Modified | Implementasi paginasi grid (6 item/halaman), scroll-to-top otomatis, sinkronisasi URL id, penambahan Universal CTA. |
| 3 | `frontend/app/blog/page.tsx` | Modified | Penggantian inline CTA box lama dengan komponen terstandar `UniversalCta`. |
| 4 | `frontend/app/hubungi-kami/page.tsx` | Modified | Menghapus kode hardcoded CTA banner, mengganti dengan `UniversalCta`. |
| 5 | `frontend/app/tutorial/page.tsx` | Modified | Menghapus kode hardcoded CTA banner, mengganti dengan `UniversalCta`. |
| 6 | `projects/nadim-trans-rentcar/app/kendaraan/[slug]/VehicleDetailClient.tsx` | Modified | Menambahkan 9 poin aturan rental mobil pada tab Syarat & Ketentuan dan Deskripsi, serta tombol bantuan langsung ke WhatsApp Admin 1. |
| 7 | `projects/nadim-trans-rentcar/components/sections/CTA.tsx` | Modified | Mengembangkan banner CTA luxury dengan tombol aksi langsung ke WhatsApp Nadim Trans. |
| 8 | `projects/nadim-trans-rentcar/components/layout/Header.tsx` | Modified | Menghubungkan tombol CTA header langsung ke WhatsApp resmi Nadim Trans. |
| 9 | `projects/nadim-trans-rentcar/middleware.ts` | Modified | Auto-lock Bahasa Indonesia bagi pengunjung dengan IP atau header Indonesia. |
| 10 | `projects/nadim-trans-rentcar/components/providers/LocaleRedirect.tsx` | Modified | Menghindari redirect keliru ke /en bagi pengguna ber-IP / timezone Indonesia. |
| 11 | `projects/nadim-trans-rentcar/lib/i18n.ts` | Modified | Penambahan deteksi zona waktu WIB/WITA/WIT pada `detectVisitorLocale`. |
| 12 | `projects/nadim-trans-rentcar/lib/data.ts` | Modified | Menetapkan `+62 812-7600-3870` (`6281276003870`) sebagai nomor WhatsApp dan kontak utama NadimTrans. |
| 13 | `projects/nadim-trans-rentcar/components/booking/VehicleBookingWidget.tsx` | Modified | Mengarahkan checkout booking pemesanan mobil langsung ke WhatsApp utama `6281276003870`. |
| 14 | `projects/nadim-trans-rentcar/app/faq/FaqClient.tsx` | Modified | Mengarahkan tombol konsultasi live chat bantuan FAQ ke WhatsApp utama `6281276003870`. |
| 15 | `frontend/app/layout.tsx` | Modified | Perbaikan warna teks global body dari `text-white` ke `text-slate-900` untuk mencegah halaman/fallback 404 terlihat blank putih. |
| 16 | `frontend/components/portfolio/portfolio-showcase-stage.tsx` | Modified | Responsivitas mockup panggung (iMac, iPad, iPhone) dengan aspect-ratio dan scaling proporsional untuk mobile & tablet. |
| 17 | `docs/DOKUMENTASI_PERUBAHAN_13_OKTOBER_2026.md` | Created/Updated | Dokumen komprehensif seluruh pembaruan sistem landing page dan Nadim Trans RentCar. | |

---

## 5. Status Kualitas & Verifikasi

- **Kompilasi TypeScript & Next.js:** Seluruh kode (`tsc --noEmit`) pada proyek `bidtech-landing` dan `nadim-trans-rentcar` lolos 100% tanpa error.
- **Aksesibilitas (a11y):** Tautan dan tombol WhatsApp dilengkapi `rel="noreferrer"`, target yang tepat, dan atribut pendukung.
- **Deteksi Bahasa:** Pengunjung pertama kali yang mengakses dari IP / wilayah Indonesia langsung disajikan konten Bahasa Indonesia tanpa loop atau pengalihan ke bahasa lain.

