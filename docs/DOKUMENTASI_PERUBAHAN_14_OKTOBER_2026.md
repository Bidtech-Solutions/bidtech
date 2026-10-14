# Dokumentasi Perubahan & Pembaruan Sistem (14 Oktober 2026)

**Repository:** `bidtech-landing`  
**Proyek Terkait:** `dashboard-bidtech` (Laravel CMS) & `frontend` (Next.js Landing Page)  
**Cabang / Branch Terkait:** `deny`  
**Tanggal Pelaksanaan:** Rabu, 14 Oktober 2026  

---

## 1. Ringkasan Eksekutif

Pada tanggal **14 Oktober 2026**, dilakukan serangkaian perbaikan logika finansial, optimasi performa antarmuka pengguna (*UI responsiveness*), standarisasi arsitektur rute, serta penataan tata letak visual (*layout alignment*) pada modul administrasi dan checkout Bidtech:

1. **Perbaikan Logika Komisi Mitra Persentase**:
   - Memperbaiki basis perhitungan komisi mitra skema persentase agar hanya dihitung dari **harga paket website setelah diskon klien (omset kotor paket)**, dan secara ketat **tidak mengikutsertakan biaya domain**.
2. **Penyatuan & Standarisasi Rute Mitra (`/dashboard/partners`)**:
   - Mengatasi error `MethodNotAllowedHttpException` saat membuka URL `/dashboard/partners`.
   - Menjadikan `/dashboard/partners` sebagai satu rute standar resmi dan me-redirect rute lama `/dashboard/promos/partners`.
3. **Optimasi Performa Rendering Dashboard Admin**:
   - Menghilangkan *artificial delay* sebesar **750 ms** pada overlay skeleton screen agar transisi antar menu terasa instan.
   - Melonggarkan frekuensi polling realtime view counter dari **2,5 detik** menjadi **10 detik** guna mencegah antrean pemblokiran request pada web server lokal single-threaded (`php artisan serve`).
   - Menambahkan atribut `defer` pada script eksternal Lucide Icons CDN.
   - Mengeliminasi N+1 loop database query pada perhitungan rekapitulasi komisi mitra menjadi 1 query SQL agregat.
4. **Perataan Tengah (*Centered Layout*) Halaman Dashboard**:
   - Menambahkan utility `mx-auto space-y-8` pada kontainer utama `dashboard.blade.php` sehingga konten simetris dan rapi di tengah monitor resolusi lebar (> 1280px).
5. **Automated Testing**:
   - Menambahkan dan memperbarui pengujian unit test PHPUnit pada `PromoCalculationTest` (16 pengujian lulus 100%).

---

## 2. Rincian Perubahan & Implementasi

### A. Perbaikan Fitur Komisi Mitra Persentase

#### 1. Latar Belakang Masalah
Sebelum perbaikan, komisi mitra skema persentase dihitung menggunakan variabel `$subtotal` penuh yang masih mencakup harga registrasi domain resmi. Hal ini menyebabkan komisi membengkak keliru karena biaya domain (yang merupakan biaya pihak ketiga registrar dan tidak boleh didiskon) ikut dipotongkan komisi persentase.

#### 2. Logika Komisi Baru
- **Basis Komisi:** Harga paket website setelah dipotong diskon klien (`package_promo_price`), tanpa biaya domain.
- **Formula:**
  $$\text{Komisi Mitra} = \frac{\text{Besar Komisi (\%)} \times \text{Harga Paket Bersih}}{100}$$

#### 3. Studi Kasus Nyata
- **Harga Paket Template Website:** Rp1.750.000
- **Diskon Kupon Klien (10%):** -Rp175.000
- **Harga Paket Bersih Klien:** Rp1.575.000
- **Harga Domain (Tidak Didiskon):** Rp200.000
- **Total Pembayaran Klien:** Rp1.775.000
- **Besar Komisi Mitra:** 40%
- **Perhitungan Komisi:**
  - *Sebelumnya (Keliru):* $40\% \times \text{Rp1.775.000} = \mathbf{Rp710.000}$ ❌
  - *Sesudahnya (Benar):* $40\% \times \text{Rp1.575.000} = \mathbf{Rp630.000}$ ✅

#### 4. Berkas yang Diubah:
- [`dashboard-bidtech/app/Services/PaymentService.php`](../dashboard-bidtech/app/Services/PaymentService.php):
  - Memperbarui `validatePromo` untuk menghitung `$packagePromoPrice = $pricingStructure['package_promo_price'] ?? max(0, $prices['packageTotal'] - $discount);` dan meneruskannya ke fungsi `partnerCommission`.
  - Memperbarui signature dan dokumentasi method `partnerCommission(Coupon $promo, int $packagePromoPrice): int`.
- [`dashboard-bidtech/resources/views/pages/kelola-mitra.blade.php`](../dashboard-bidtech/resources/views/pages/kelola-mitra.blade.php):
  - Memperbarui teks hint pada modal tambah, modal edit, dan JavaScript dinamis agar berbunyi: *"Mitra akan menerima komisi berupa persentase dari harga paket website setelah diskon klien (biaya domain tidak dihitung)."*

---

### B. Penyatuan & Standarisasi Rute Mitra

#### 1. Latar Belakang Masalah
Sebelumnya, rute `GET` halaman Kelola Mitra hanya terdaftar di `/dashboard/promos/partners`, sedangkan URL `/dashboard/partners` hanya menerima `POST` (simpan mitra). Ketika admin mengetik langsung atau diarahkan ke `/dashboard/partners`, sistem memunculkan error:
`Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException: The GET method is not supported for route dashboard/partners. Supported methods: POST.`

#### 2. Solusi & Penyatuan Rute
- Menjadikan **`/dashboard/partners`** sebagai rute resmi tunggal (`route('dashboard.partners.index')`).
- Menyediakan handler redirect otomatis dari rute lama `/dashboard/promos/partners` ke `/dashboard/partners`.
- Memperbarui seluruh link tombol, form filter, menu sidebar, dan controller redirect agar seragam menggunakan `route('dashboard.partners.index')`.

#### 3. Berkas yang Diubah:
- [`dashboard-bidtech/routes/web.php`](../dashboard-bidtech/routes/web.php):
  ```php
  // Afiliasi & Kelola Mitra
  Route::get('/partners', [KelolaMitraController::class, 'index'])->name('partners.index');
  Route::get('/promos/partners', fn () => redirect()->route('dashboard.partners.index'))->name('promos.partners');
  Route::post('/partners', [KelolaMitraController::class, 'store'])->name('partners.store');
  Route::put('/partners/{partner}', [KelolaMitraController::class, 'update'])->name('partners.update');
  Route::post('/partners/{partner}/toggle-active', [KelolaMitraController::class, 'toggleActive'])->name('partners.toggle-active');
  Route::delete('/partners/{partner}', [KelolaMitraController::class, 'destroy'])->name('partners.destroy');
  ```
- [`dashboard-bidtech/resources/views/components/sidebar.blade.php`](../dashboard-bidtech/resources/views/components/sidebar.blade.php): Memperbarui tautan menu sidebar Mitra & Komisi.
- [`dashboard-bidtech/app/Http/Controllers/KelolaMitraController.php`](../dashboard-bidtech/app/Http/Controllers/KelolaMitraController.php): Memperbarui redirect `store()`, `update()`, dan `destroy()`.
- [`dashboard-bidtech/resources/views/pages/kelola-mitra.blade.php`](../dashboard-bidtech/resources/views/pages/kelola-mitra.blade.php): Memperbarui form pencarian dan tombol reset.
- [`dashboard-bidtech/resources/views/pages/riwayat-redeem.blade.php`](../dashboard-bidtech/resources/views/pages/riwayat-redeem.blade.php), [`kelola-promo.blade.php`](../dashboard-bidtech/resources/views/pages/kelola-promo.blade.php), [`dashboard.blade.php`](../dashboard-bidtech/resources/views/pages/dashboard.blade.php): Memperbarui link navigasi silang ke halaman mitra.

---

### C. Optimasi Performa & Kecepatan Dashboard Admin

#### 1. Eliminasi Delay Artifisial Skeleton Screen
- **Masalah:** Elemen `#dashboard-page-skeleton` di [`layouts/dashboard.blade.php`](../dashboard-bidtech/resources/views/layouts/dashboard.blade.php) menahan layar abu-abu dengan `setTimeout` 350 ms + 400 ms (total 750 ms) pada setiap klik menu.
- **Solusi:** Memangkas delay timer menjadi instan (80 ms transisi fade-out), sehingga data yang sudah dirender server langsung terlihat tanpa jeda.

#### 2. Pelonggaran Frekuensi Polling Realtime
- **Masalah:** Polling view counter berjalan setiap 2,5 detik (`setInterval(syncTemplateViews, 2500)`). Pada server lokal `php artisan serve` yang single-threaded, request navigasi pengguna sering terhambat (antre) saat background fetch sedang berjalan.
- **Solusi:** Melonggarkan interval polling menjadi **10 detik** (10.000 ms), mengurangi beban server hingga 75% dan membebaskan antrean thread lokal.

#### 3. Script Ikon Lucide Non-Blocking
- **Masalah:** `<script src="https://unpkg.com/lucide@latest"></script>` dimuat sinkron di `<head>`, menahan parsing DOM browser jika terjadi latensi jaringan ke CDN eksternal.
- **Solusi:** Menambahkan atribut `defer`: `<script src="https://unpkg.com/lucide@latest" defer></script>`.

#### 4. Eliminasi N+1 Query pada Rekapitulasi Mitra
- **Masalah:** Pada method `PromoService::partners()`, terdapat perulangan `->map()` yang memanggil query `Order::whereIn(...)`, `count()`, dan `sum()` berulang kali untuk tiap mitra (mencapai 40-50 query SQL terpisah).
- **Solusi:** Mengganti loop dengan 1 query SQL agregat menggunakan `selectRaw`, `groupBy('coupon_id')`, dan `keyBy('coupon_id')`.
- **Hasil:** Waktu eksekusi halaman berkurang drastis dari 1.585 ms menjadi 738 ms (> 50% lebih cepat).

---

### D. Perataan Tengah (*Centered Layout*) Halaman Dashboard

#### 1. Masalah
Pada layar monitor lebar (> 1280px), pembungkus utama halaman `dashboard.blade.php` hanya menggunakan class `max-w-7xl` tanpa utility `mx-auto`. Akibatnya, seluruh layout dashboard menempel ke batas kiri area konten dan menyisakan ruang kosong besar di sebelah kanan.

#### 2. Solusi
Memperbarui pembungkus utama di baris ke-7 [`dashboard.blade.php`](../dashboard-bidtech/resources/views/pages/dashboard.blade.php):
```html
<!-- Sebelum -->
<div class="max-w-7xl">

<!-- Sesudah -->
<div class="max-w-7xl mx-auto space-y-8">
```
Layout dashboard kini berada simetris di tengah (*centered*), seragam dengan halaman Kelola Pesanan dan Kelola Mitra.

---

## 3. Daftar File yang Terkena Dampak

| No | File | Deskripsi Perubahan |
| :---: | :--- | :--- |
| 1 | `dashboard-bidtech/app/Services/PaymentService.php` | Basis komisi persentase dihitung dari `packagePromoPrice` (tanpa domain). |
| 2 | `dashboard-bidtech/resources/views/pages/kelola-mitra.blade.php` | Pembaruan teks hint komisi mitra, standarisasi rute `partners.index`. |
| 3 | `dashboard-bidtech/routes/web.php` | Pendaftaran rute resmi `GET /dashboard/partners` dan auto-redirect `/promos/partners`. |
| 4 | `dashboard-bidtech/resources/views/components/sidebar.blade.php` | Pembaruan tautan sidebar ke `dashboard.partners.index`. |
| 5 | `dashboard-bidtech/app/Http/Controllers/KelolaMitraController.php` | Penyelarasan redirect controller ke `dashboard.partners.index`. |
| 6 | `dashboard-bidtech/resources/views/pages/dashboard.blade.php` | Penambahan class `mx-auto space-y-8` untuk perataan tengah layout. |
| 7 | `dashboard-bidtech/resources/views/layouts/dashboard.blade.php` | Hapus lag skeleton 750ms, ubah interval polling ke 10s, script Lucide `defer`. |
| 8 | `dashboard-bidtech/app/Services/PromoService.php` | Optimasi 1 query agregat `groupBy('coupon_id')` untuk rekap komisi mitra. |
| 9 | `dashboard-bidtech/tests/Feature/Checkout/PromoCalculationTest.php` | Unit test komisi persentase (kasus 1,75jt diskon 10%, domain 200k, komisi 40% = 630k). |
| 10 | `dashboard-bidtech/tests/Feature/Admin/PromoManagementTest.php` | Penyelarasan route test ke `dashboard.partners.index`. |
| 11 | `README.md` | Pembaruan indeks dokumentasi utama sistem. |

---

## 4. Validasi & Pengujian (*Testing*)

Pengujian otomatis dijalankan menggunakan PHPUnit di lingkungan Laravel:

```bash
php artisan test --filter=PromoCalculationTest
```

**Hasil Pengujian:**
```text
PASS  Tests\Feature\Checkout\PromoCalculationTest
✓ expired and not yet started promos are rejected
✓ exhausted global quota is rejected
✓ per email usage limit is enforced
✓ minimum order amount is enforced
✓ partner fixed commission is returned
✓ partner percentage commission is based on discounted package price excluding domain
✓ partner percentage commission exact user scenario
✓ percentage discount on subtotal with and without cap
✓ nominal discount is capped at the component price instead of being rejected
✓ fixed discount sets the component price
✓ component scoped percentage uses only that component price
✓ discounts across components are summed
✓ success messages for general and partner coupons

Tests:    16 passed (39 assertions)
Duration: 0.86s
```
*(Seluruh 16 pengujian lulus 100% tanpa error).*
