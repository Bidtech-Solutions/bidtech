# Dokumentasi Fitur Realtime View Counter & Perbaikan Bug Dashboard

**Repository:** `bidtech-landing`  
**Fitur Utama:** Template View Counter Realtime & Clean Data Tracking  
**Aplikasi Terkait:**
- `frontend/` (Next.js 15 App Router)
- `dashboard-bidtech/` (Laravel 11 Dashboard & REST API)  
**Tanggal:** 8 Oktober 2026  
**Status:** Selesai, Teruji, dan Siap Digunakan (Production Ready)  

---

## 1. Ringkasan Eksekutif

Fitur ini mengimplementasikan pelacakan jumlah pengunjung (*views / watch counter*) pada setiap template website Bidtech yang diakses oleh calon klien. Seluruh akumulasi penayangan dipantau secara **real-time** di dua tempat:
1. **Dashboard Admin Bidtech** (pada KPI card katalog, tabel kelola template, dan detail template).
2. **Kartu Template Publik** (pada Beranda / Landing Page dan halaman Katalog `/template-website`), sehingga calon klien dapat melihat popularitas dan bukti sosial (*social proof*) template secara langsung.

Pembaruan ini mencakup 5 aspek penting:
1. **Penghapusan Seluruh Data Dummy:** Menghapus angka *views* tiruan bawaan seeder (142, 98, 115, dst.) sehingga kalkulasi dimulai dari **0** murni.
2. **Perbaikan Jalur Integrasi API Frontend ke Backend:** Memperbaiki rute pemanggilan view counter agar tidak mengalami *404 Not Found* dan menghapus penguncian *session storage* permanen.
3. **Mekanisme Pembaruan Real-Time (Live Update) Multi-Platform:** 
   - Di **Dashboard Admin**: sistem *live polling* (interval 2.5 detik) dengan efek *scale-pulse & green-highlight*.
   - Di **Frontend Publik**: hook `useTemplateViews` yang mendengarkan event klik lokal instan serta sinkronisasi berkala (interval 3.5 detik) ke endpoint `/api/templates/views/realtime` dengan animasi highlight emerald.
4. **Tampilan Badge Interaktif pada Kartu Template:** Menampilkan badge `[ 👁️ {views} kali ]` yang rapi, modern, dan informatif di samping kategori template.
5. **Perbaikan Bug Encoding / Mojibake:** Memperbaiki teks emoji yang rusak (`ðŸ”¥` dan `ðŸ‘ ï¸ `) pada dropdown filter & tabel di halaman Kelola Template dan Kelola Pesanan.

---

## 2. Arsitektur & Alur Kerja (Workflow)

```
[ Pengunjung Website ]
         │
         ▼ Klik "Lihat Live Demo" / Card Template
[ Frontend Next.js ]
         │
         │  1. recordTemplateView(templateId)
         │  2. Debounce 2 detik (mencegah spam double-click)
         │  3. POST /api/templates/view/{id} (keepalive, non-blocking)
         ▼
[ Backend Laravel 11 ]
         │
         │  4. Template::increment('views')
         │  5. Database MySQL (tabel templates, kolom views bertambah +1)
         ▼
[ Dashboard Admin Bidtech ]
         │
         │  6. Polling otomatis /dashboard/api/template-views (tiap 2.5 detik)
         │  7. Deteksi perubahan nilai views
         │  8. Update angka di layar + Animasi Pulse Hijau Real-Time
         ▼
[ Admin Layar Monitor ]
   (Angka bertambah seketika tanpa perlu reload/F5)
```

---

## 3. Rincian Perubahan Berdasarkan Komponen

### A. Frontend (`frontend/`)

1. **[frontend/lib/api/template-api.ts](file:///d:/magang/Bidtech/bidtech-landing/frontend/lib/api/template-api.ts)**:
   - **Koreksi Host API (`API_BASE_URL`):** Menggunakan resolusi host dinamis browser (`localhost` / `127.0.0.1` / domain produksi) untuk mencegah kendala CORS.
   - **Koreksi Jalur Endpoint:** Mengarahkan pengiriman statistik dari `${API_BASE_URL}/templates/view/${id}` ke jalur kanonik `${API_BASE_URL}/api/templates/view/${templateId}`.
   - **Debounce Cerdas:** Mengganti penguncian permanen sesi tab (*sessionStorage lock*) dengan debounce waktu **2 detik**, sehingga pengujian dan klik riil tetap tercatat akurat.
   - **Event Dispatching:** Memicu custom event `bidtech:template-viewed` di browser untuk sinkronisasi UI instan tanpa reload.
   - **Fungsi `fetchRealtimeViews()`:** Mengambil map seluruh views `{ [id]: views }` langsung dari endpoint `/api/templates/views/realtime`.

2. **[frontend/lib/hooks/use-template-views.ts](file:///d:/magang/Bidtech/bidtech-landing/frontend/lib/hooks/use-template-views.ts)** (Hook Baru):
   - Hook terpusat yang mengatur status views secara realtime untuk seluruh komponen kartu template.
   - Mendengarkan event `bidtech:template-viewed` untuk update instan saat pengunjung mengklik preview di halaman aktif.
   - Melakukan live polling setiap **3.5 detik** ke endpoint realtime stats (otomatis *pause* saat tab disembunyikan / *document.hidden* dan langsung sinkron ulang saat tab dibuka).
   - Menyediakan status animasi visual highlight (`isHighlighted(id)`) selama 2 detik setiap kali view bertambah.

3. **[frontend/components/home/sections/template-preview-section.tsx](file:///d:/magang/Bidtech/bidtech-landing/frontend/components/home/sections/template-preview-section.tsx)**:
   - Terintegrasi dengan hook `useTemplateViews`.
   - Menampilkan badge view realtime di samping kategori template pada kartu beranda.
   - Menerapkan efek transisi highlight emerald dan ikon pulse saat ada pengunjung yang melihat.

4. **[frontend/components/template-website/components/template-card.tsx](file:///d:/magang/Bidtech/bidtech-landing/frontend/components/template-website/components/template-card.tsx)** & **[frontend/app/template-website/page.tsx](file:///d:/magang/Bidtech/bidtech-landing/frontend/app/template-website/page.tsx)**:
   - Menampilkan badge view realtime pada seluruh kartu di halaman katalog `/template-website`.
   - Terhubung dengan sinkronisasi realtime multi-client otomatis.

---

### B. Backend & REST API (`dashboard-bidtech/`)

1. **[database/seeders/TemplateSeeder.php](file:///d:/magang/Bidtech/bidtech-landing/dashboard-bidtech/database/seeders/TemplateSeeder.php)**:
   - Seluruh properti `'views'` pada 19 template diubah dari angka dummy menjadi `0`.
   - Mencegah kembalinya angka dummy jika seeder dijalankan ulang di kemudian hari.

2. **Database Reset**:
   - Kolom `views` pada tabel `templates` di-update menjadi `0` untuk seluruh entri aktif:
     ```php
     App\Models\Template::query()->update(['views' => 0]);
     ```

3. **[app/Http/Controllers/Api/TemplateController.php](file:///d:/magang/Bidtech/bidtech-landing/dashboard-bidtech/app/Http/Controllers/Api/TemplateController.php)**:
   - Method `trackView(int $id)`: Menerima pencatatan view dan mengembalikan JSON respons dengan CORS terbuka.
   - Method `realtimeStats()`: Endpoint data views instan yang mengembalikan total akumulasi views dan daftar views per ID template untuk kebutuhan live polling dashboard.

4. **[routes/api.php](file:///d:/magang/Bidtech/bidtech-landing/dashboard-bidtech/routes/api.php) & [routes/web.php](file:///d:/magang/Bidtech/bidtech-landing/dashboard-bidtech/routes/web.php)**:
   - Mendaftarkan rute:
     - `POST /api/templates/view/{id}`
     - `GET /api/templates/views/realtime`
     - `GET /dashboard/api/template-views` (alias internal dashboard)
     - `POST /templates/view/{id}` (alias fallback kompatibilitas)

---

### C. Antarmuka Dashboard Admin (`dashboard-bidtech/resources/views/`)

1. **[resources/views/layouts/dashboard.blade.php](file:///d:/magang/Bidtech/bidtech-landing/dashboard-bidtech/resources/views/layouts/dashboard.blade.php)**:
   - Menambahkan script **Realtime Live Update Poller**:
     - Polling berkala setiap **2.5 detik** ke endpoint `/dashboard/api/template-views`.
     - Otomatis memformat angka sesuai lokalisasi Indonesia (misal: `1.250`).
     - Menerapkan efek transisi **scale-110 & emerald highlight** saat angka berubah.
     - **Efisiensi Daya & Bandwidth:** Otomatis *pause* ketika tab diminimalkan atau disembunyikan (*document.hidden*), dan langsung menyinkronkan ulang saat tab dibuka kembali.

2. **[resources/views/pages/dashboard.blade.php](file:///d:/magang/Bidtech/bidtech-landing/dashboard-bidtech/resources/views/pages/dashboard.blade.php)**:
   - Kartu KPI *Katalog Template* ditandai dengan ID `dashboard-total-views`.
   - Leaderboard template terpopuler ditandai dengan kelas `template-view-badge` dan `data-template-id="{{ $tt->id }}"`.

3. **[resources/views/pages/kelola-template.blade.php](file:///d:/magang/Bidtech/bidtech-landing/dashboard-bidtech/resources/views/pages/kelola-template.blade.php)**:
   - Kartu *Total Penayangan* ditandai dengan ID `kelola-total-views`.
   - Kolom *Views* pada tabel template dan header edit template ditandai dengan `template-view-badge` untuk update realtime.

---

### D. Perbaikan Bug Encoding Karakter (Mojibake)

Pada dropdown sortir dan badge di halaman admin sebelumnya terdapat karakter UTF-8 yang rusak akibat kesalahan enkripsi simbol emoji:

| Lokasi File | Tampilan Sebelum (Bug) | Tampilan Sesudah (Perbaikan) |
|---|---|---|
| `kelola-template.blade.php` (Dropdown) | `ðŸ”¥ Urut: Paling Laku (Terlaris)` | `Urut: Paling Laku (Terlaris)` |
| `kelola-template.blade.php` (Dropdown) | `ðŸ‘ ï¸  Urut: Paling Banyak Dilihat` | `Urut: Paling Banyak Dilihat` |
| `kelola-template.blade.php` (Badge) | `ðŸ”¥ Best` | `Best Seller` (bersih) |
| `order.blade.php` (Informasi Mitra) | `ðŸ¤  Mitra:` | `Mitra:` |
| `order.blade.php` (Program Kemitraan) | `ðŸ¤  Terdaftar dalam Program...` | `Terdaftar dalam Program...` |

---

## 4. Panduan Verifikasi & Pengujian

### A. Pengujian Real-Time antar Tab Browser
1. Buka browser dan login ke **Dashboard Bidtech**:  
   `http://localhost:8000/dashboard`  
   *(Perhatikan indikator **Dilihat** pada kartu Katalog Template).*
2. Buka tab baru dan akses **Landing Page**:  
   `http://localhost:3000`
3. Gulir ke bagian **Katalog Template** dan klik salah satu tombol **Lihat Live Demo** (misal *Rentcar* atau *Deny Restaurant*).
4. Kembali ke tab Dashboard (langkah 1).  
   **Hasil yang Diharapkan:** Angka penayangan bertambah secara otomatis (+1) dengan efek highlight hijau tanpa perlu menekan tombol F5 / refresh.

### B. Pengujian Endpoint via Terminal (cURL)
Jalankan perintah berikut untuk mensimulasikan penambahan view:
```bash
curl -X POST http://localhost:8000/api/templates/view/1
```
Respons yang diterima:
```json
{
  "status": "success",
  "message": "View count berhasil diperbarui",
  "id": 1,
  "name": "Rentcar - Sewa Mobil #1",
  "views": 1
}
```

Jalankan perintah berikut untuk memeriksa status polling realtime:
```bash
curl http://localhost:8000/dashboard/api/template-views
```
Respons yang diterima:
```json
{
  "status": "success",
  "total_views": 1,
  "templates": [
    { "id": 1, "name": "Rentcar - Sewa Mobil #1", "views": 1 },
    ...
  ]
}
```

---

## 5. Ringkasan File Terdampak

```
bidtech-landing/
├── docs/
│   └── DOKUMENTASI_FITUR_VIEW_COUNTER_TEMPLATE_REALTIME.md (DOKUMENTASI BARU)
├── frontend/
│   ├── lib/api/template-api.ts                             (PERBAIKAN ENDPOINT & DEBOUNCE)
│   ├── components/home/sections/template-preview-section.tsx
│   └── components/template-website/components/template-card.tsx
└── dashboard-bidtech/
    ├── app/Http/Controllers/Api/TemplateController.php     (ENDPOINT REALTIME VIEWS)
    ├── database/seeders/TemplateSeeder.php                 (RESET DUMMY KE 0)
    ├── routes/api.php                                      (RUTE API VIEWS)
    ├── routes/web.php                                      (RUTE DASHBOARD VIEWS)
    └── resources/views/
        ├── layouts/dashboard.blade.php                     (SCRIPT LIVE POLLER 2.5 DETIK)
        ├── pages/dashboard.blade.php                       (MARKUP TARGET LIVE VIEWS)
        ├── pages/kelola-template.blade.php                 (FIX ENCODING & MARKUP VIEWS)
        └── pages/order.blade.php                           (FIX ENCODING MITRA)
```
