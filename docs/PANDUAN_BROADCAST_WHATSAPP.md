# 📖 Panduan Penggunaan Fitur Broadcast WhatsApp Bidtech

Dokumen ini memuat panduan lengkap konfigurasi dan tata cara penggunaan fitur **Broadcast WhatsApp Otomatis** untuk Klien dan Admin pada sistem Bidtech.

---

## 📌 Daftar Isi
1. [Konfigurasi Awal (.env)](#1-konfigurasi-awal-env)
2. [Fitur 1: Broadcast WhatsApp ke Klien (Domain & Website Ready)](#2-fitur-1-broadcast-whatsapp-ke-klien-domain--website-ready)
3. [Fitur 2: Notifikasi WhatsApp ke Admin (Pesanan Lunas)](#3-fitur-2-notifikasi-whatsapp-ke-admin-pesanan-lunas)
4. [Mekanisme Pengamanan (Anti-Spam & Gonta-Ganti Status)](#4-mekanisme-pengamanan-anti-spam--gonta-ganti-status)
5. [Format Nomor WhatsApp & Normalisasi](#5-format-nomor-whatsapp--normalisasi)
6. [Troubleshooting & Solusi Kendala](#6-troubleshooting--solusi-kendala)

---

## 1. Konfigurasi Awal (.env)

Fitur broadcast WhatsApp menggunakan gateway **Fonnte API**. Pengaturan utama berada di dalam file `.env` aplikasi backend.

### A. Lokasi File .env
File `.env` terletak di folder backend:
📂 `dashboard-bidtech/.env`

---

### B. Variabel Konfigurasi & Fungsinya

Tambahkan atau pastikan baris berikut tersedia di dalam file `.env`:

```env
# ===================================================
# KONFIGURASI WHATSAPP GATEWAY (FONNTE) & ADMIN
# ===================================================

# 1. Token Fonnte (Wajib untuk mengaktifkan pengiriman WhatsApp)
FONNTE_TOKEN=9aTLRBRuJfNpZndBWXk9

# 2. Nomor WhatsApp Admin Penerima Notifikasi Pesanan Lunas
WHATSAPP_ADMIN_PHONE=081234567890
```

---

### C. Penjelasan Rinci Variabel .env

#### 1. `FONNTE_TOKEN`
- **Fungsi:** Token otentikasi resmi dari layanan gateway Fonnte agar sistem diizinkan mengirim pesan WhatsApp ke nomor klien maupun admin.
- **Cara Mendapatkan Token:**
  1. Daftar / Masuk ke akun Anda di [https://fonnte.com](https://fonnte.com).
  2. Masuk ke menu **Device** lalu hubungkan nomor WhatsApp bot/CS Bidtech dengan melakukan scan QR Code.
  3. Buka menu atau salin **API Token** perangkat Anda.
  4. Tempelkan token tersebut pada variabel `FONNTE_TOKEN=` di file `.env`.
- **Jika Kosong:** Sistem akan mencatat log peringatan (`FONNTE_TOKEN belum dikonfigurasi`) dan tidak akan memicu request ke gateway (aman dari error 500).

#### 2. `WHATSAPP_ADMIN_PHONE`
- **Fungsi:** Menentukan nomor WhatsApp tim Admin/Operasional Bidtech yang akan menerima notifikasi setiap kali ada pesanan baru yang **Lunas**.
- **Contoh Penulisan:**
  - **Satu Nomor Admin:**
    ```env
    WHATSAPP_ADMIN_PHONE=081234567890
    ```
  - **Banyak Nomor Admin (Broadcast Tim):**  
    Pisahkan tiap nomor menggunakan tanda koma (`,`):
    ```env
    WHATSAPP_ADMIN_PHONE=081234567890,085712345678,089876543210
    ```
  - **Dikosongkan (Fallback Otomatis Database):**  
    Jika dibiarkan kosong:
    ```env
    WHATSAPP_ADMIN_PHONE=
    ```
    Sistem secara cerdas akan otomatis mengambil nomor WhatsApp dari semua user yang memiliki peran **`ADMIN`** yang terdaftar di database (`tabel users`).

---

### D. Menerapkan Perubahan Setelah Mengedit .env
Setelah mengubah nilai di file `.env`, pastikan cache konfigurasi Laravel dibersihkan agar pengaturan baru langsung aktif:

Buka terminal pada folder `dashboard-bidtech`, lalu jalankan:
```bash
php artisan config:clear
```

> [!IMPORTANT]
> **Keamanan Kredensial:** File `.env` bersifat rahasia dan tidak boleh di-commit ke Git. Sebagai referensi untuk pengembang lain di tim, daftarkan nama variabel tanpa nilainya di file `.env.example`.

---

## 2. Fitur 1: Broadcast WhatsApp ke Klien (Domain & Website Ready)

Fitur ini memberi kabar gembira kepada klien secara instan saat domain mereka telah aktif atau website mereka telah selesai dan siap diakses.

### Langkah-langkah Penggunaan di Dashboard:
1. Masuk ke **Dashboard Admin** $\rightarrow$ buka menu **Kelola Pesanan** (`/dashboard/order`).
2. Cari pesanan klien yang statusnya sudah **Lunas** (`PAID`).
3. Klik tombol **Update Status** (ikon pensil/edit) pada baris pesanan tersebut.
4. Pada modal pop-up:
   - **Jika Domain Siap:** Ubah pilihan *Status Domain* menjadi **Domain Aktif & Terhubung ke Server** (`registered`).
   - **Jika Website Siap:** Ubah pilihan *Status Pengerjaan Website* menjadi **Website Live (Selesai & Siap Diakses)** (`deployed`).
5. Perhatikan kotak centang di bagian bawah:
   - ✅ **`[✓] Kirim notifikasi WhatsApp ke Klien (08xxxxxxxxxx)`** (Otomatis tercentang dan menampilkan nomor HP/WA klien yang dituju).
   - **Kapan Dicentang:** Biarkan tercentang jika Anda ingin klien menerima pesan pemberitahuan di WhatsApp mereka.
   - **Kapan Dihilangkan:** Hapus centang jika Anda hanya ingin mengubah status secara diam-diam (misal: perbaikan teknis internal, pengujian, atau salah klik status sebelumnya).
6. Masukkan catatan progres (opsional) pada kolom catatan.
7. Klik tombol **Simpan Perubahan**.

---

### Contoh Format Pesan yang Diterima Klien:

#### A. Saat Status Domain Aktif (`registered`):
```text
🌐 *KABAR BAIK: DOMAIN ANDA TELAH AKTIF!* 🚀

Halo *Budi Santoso*,
Kami menginformasikan bahwa pendaftaran domain untuk pesanan *#ORD-20261008-ABCDE* telah berhasil dan domain Anda kini telah *AKTIF*! 🎉

━━━━━━━━━━━━━━━━━━━━
📌 *RINCIAN DOMAIN:*
🌐 *Nama Domain:* tokoku.com
⏳ *Masa Aktif:* 1 Tahun
⚡ *Status Server:* Terhubung ke Server Cloud Bidtech
━━━━━━━━━━━━━━━━━━━━

Saat ini tim developer kami sedang menyelesaikan konfigurasi website Anda agar segera siap diluncurkan.

Pantau linimasa pengerjaan website secara berkala di Dashboard Klien:
🔗 *Dashboard Klien:* https://bidtech.co.id/login

Terima kasih atas kepercayaan Anda bermitra bersama *Bidtech*!

Salam hangat,
*Tim Bidtech Official*
```

#### B. Saat Status Website Live (`deployed`):
```text
🎉 *SELAMAT! WEBSITE ANDA TELAH RESMI LIVE!* 🚀

Halo *Budi Santoso*,
Kabar gembira! Pengerjaan website untuk pesanan *#ORD-20261008-ABCDE* telah rampung 100% dan saat ini telah *LIVE* dan dapat diakses oleh publik.

━━━━━━━━━━━━━━━━━━━━
📌 *INFORMASI WEBSITE:*
🌐 *Tautan Website:* https://tokoku.com
🎨 *Template:* E-Commerce Pro Bidtech
📊 *Status:* Online & Siap Digunakan
━━━━━━━━━━━━━━━━━━━━

🔑 *PANDUAN & PENGELOLAAN:*
Anda dapat masuk ke Dashboard Klien untuk melihat detail proyek dan panduan pengelolaan website Anda:
🔗 *Portal Klien:* https://bidtech.co.id/login
📧 *Email Login:* `budi@bidtech.co.id`

Jika Anda membutuhkan bantuan teknis atau penyesuaian konten, tim support kami siap membantu Anda.

Sukses selalu untuk bisnis dan kehadiran digital Anda bersama *Bidtech*! 🌟

Salam hangat,
*Tim Bidtech Official*
```

---

## 3. Fitur 2: Notifikasi WhatsApp ke Admin (Pesanan Lunas)

Fitur ini secara otomatis memberi tahu tim admin/manajemen Bidtech saat ada pesanan baru yang **lunas** dan diverifikasi, sehingga tim bisa langsung bergerak memproses domain dan server klien.

### Cara Kerja:
Notifikasi ke Admin terpicu melalui 2 jalur:
1. **Otomatis (Payment Gateway Xendit):** Ketika klien menyelesaikan pembayaran tagihan (QRIS / Virtual Account) dan webhook Xendit mengirim status `PAID` / `SETTLED`.
2. **Manual (Admin Dashboard):** Ketika Admin mengubah status pesanan dari `Belum Lunas` menjadi `Lunas` pada modal Kelola Pesanan.

### Contoh Format Pesan yang Diterima Admin:
```text
🔔 *NOTIFIKASI PESANAN LUNAS (ADMIN BIDTECH)* 💰

Halo Tim Admin,
Terdapat pesanan baru yang telah *LUNAS* dan terverifikasi. Berikut rinciannya:

━━━━━━━━━━━━━━━━━━━━
📄 *No. Pesanan:* #ORD-20261008-ABCDE
👤 *Nama Klien:* Budi Santoso
📱 *WhatsApp Klien:* 08123456789
🎨 *Template:* Company Profile Modern
🌐 *Domain Pilihan:* tokoku.com (1 Tahun)
🏷️ *Promo:* -Rp 100.000 (HEMAT10)
💰 *Total Lunas:* *Rp 2.085.000*
⏰ *Waktu Lunas:* 08 Oct 2026, 17:00 WIB
━━━━━━━━━━━━━━━━━━━━

⚡ *TINDAKAN DIBUTUHKAN:*
Silakan segera lakukan verifikasi pendaftaran domain dan konfigurasi website klien melalui panel Admin:
👉 *Buka Kelola Pesanan:* https://bidtech.co.id/dashboard/order

Semangat dan selamat memproses pesanan! 🚀
_Bidtech Automated System_
```

---

## 4. Mekanisme Pengamanan (Anti-Spam & Gonta-Ganti Status)

Bagaimana jika status sering digonta-ganti oleh admin? Sistem telah dilengkapi dengan **3 lapis pengamanan**:

1. **Pemeriksaan Transisi Nyata (*Status Transition Guard*):**
   - Pesan WhatsApp ke klien **hanya dikirim jika terjadi perubahan status sebenarnya** (misal dari *Dikerjakan* $\rightarrow$ *Live*).
   - Jika admin hanya membuka modal untuk mengedit *Catatan Progres* atau nama domain tanpa mengubah status website/domain, sistem **TIDAK akan mengirimkan WA berulang**.
2. **Kendali Manual Checkbox (Opsi 1):**
   - Admin dapat menghapus centang `[ ] Kirim notifikasi WhatsApp ke Klien` kapan pun ingin memperbarui status tanpa mengusik nomor WhatsApp klien.
3. **Kunci 1x untuk Notifikasi Admin:**
   - WhatsApp ke Admin diproteksi dengan kolom audit `admin_paid_wa_sent_at`.
   - Begitu pesanan pertama kali lunas, notifikasi admin dikirim sekali. Jika di kemudian hari admin mengubah status pesanan ke *Batal* lalu kembali ke *Lunas*, WhatsApp ke admin **tidak akan dikirim ulang**.

---

## 5. Format Nomor WhatsApp & Normalisasi

Anda tidak perlu khawatir salah format saat menginput nomor WhatsApp (baik nomor klien saat checkout maupun nomor admin di `.env`).

Sistem secara otomatis menormalisasi semua bentuk format nomor Indonesia ke format internasional standar Fonnte (`628xxx`):
- `08123456789` $\rightarrow$ `628123456789`
- `+62 812-3456-789` $\rightarrow$ `628123456789`
- `8123456789` $\rightarrow$ `628123456789`
- `628123456789` $\rightarrow$ `628123456789`

---

## 6. Troubleshooting & Solusi Kendala

| Masalah | Penyebab Kemungkinan | Solusi |
|---|---|---|
| **Pesan WA tidak masuk ke klien / admin** | Token Fonnte belum diatur atau kuota Fonnte habis. | Periksa `FONNTE_TOKEN` di `.env` dan pastikan perangkat WhatsApp masih terhubung di dashboard [Fonnte](https://fonnte.com). |
| **Pesan WA ke admin tidak terkirim** | `WHATSAPP_ADMIN_PHONE` di `.env` belum diisi dan tidak ada akun admin dengan nomor WA di database. | Isi `WHATSAPP_ADMIN_PHONE=08xxxx` di file `.env`. |
| **Klien tidak menerima WA saat website Live** | Checkbox `Kirim notifikasi WhatsApp` tidak tercentang saat klik Simpan, atau status pesanan belum Lunas. | Pastikan pesanan berstatus **Lunas** dan centang kotak notifikasi WhatsApp sebelum menekan Simpan. |
| **Error / kegagalan API Fonnte** | Server gateway Fonnte timeout atau nomor tidak terdaftar WA. | Sistem mencatat error di `storage/logs/laravel.log`. Transaksi database tetap aman dan tidak akan menyebabkan web crash (*graceful failure*). |
