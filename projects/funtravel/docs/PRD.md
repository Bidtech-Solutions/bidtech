# PRD — Website Company Profile Fun Travel & Transport

| | |
|---|---|
| **Klien** | PT Fun Batam Holiday (brand: **FUN TRAVEL & TRANSPORT**) |
| **Vendor** | Bidtech (PT Solusi Bisnis Jalanin Aja Dulu) |
| **Paket proyek** | Website statis company profile (tanpa backend, tanpa database) |
| **Stack** | Nuxt 4 (Vue 3), statis via `nuxt generate` (SSG); struktur ramping — lihat `ARCHITECTURE.md` |
| **Versi dokumen** | 0.2 — scope diperampingkan (6 jenis halaman), 16 Oktober 2026 |
| **Status** | Menunggu konfirmasi klien atas daftar di §11 (Open Questions) |

> **Catatan penamaan:** brief menyebut "PT Fun Holiday Batam", sedangkan poster katalog dan QRIS tertulis **"PT. FUN BATAM HOLIDAY"** / "FUN BATAM HOLIDAY, AGEN PERJALANAN DAN TUR". Dokumen ini memakai **PT Fun Batam Holiday** sampai klien mengonfirmasi nama sesuai akta (lihat OQ-01). Nama legal dipakai di footer dan JSON-LD `legalName`.

---

## 1. Latar Belakang

Fun Travel & Transport adalah usaha baru di Batam dengan dua lini layanan:

1. **Paket liburan (holiday package)** ke Batam dan Batam–Bintan, **khusus wisatawan mancanegara** dengan target utama **Malaysia dan Singapura**. Harga katalog dalam Ringgit Malaysia (RM).
2. **Sewa kendaraan** (mobil *dengan sopir*, motor *lepas kunci*) untuk wisatawan mancanegara **dan** pelanggan lokal Batam.

Saat ini pemasaran hanya lewat poster digital (Instagram, TikTok, Facebook) dan WhatsApp. Website dibutuhkan sebagai identitas profesional, katalog yang bisa ditemukan di mesin pencari maupun mesin jawaban AI, dan corong (funnel) ke WhatsApp admin.

**Prinsip scope:** website sengaja kecil — hanya halaman yang langsung menjual atau menjawab pertanyaan sebelum chat. Setiap penambahan halaman/komponen mengikuti anggaran di `ARCHITECTURE.md` §2.

## 2. Tujuan & Metrik Keberhasilan

| # | Tujuan | Indikator (3 bulan setelah live) |
|---|---|---|
| G1 | Branding profesional & kepercayaan | Nama legal, kontak resmi, rekening resmi tampil jelas; Lighthouse Best Practices ≥ 95 |
| G2 | Ditemukan di Google (SEO) untuk kueri MY/SG/ID | Halaman paket & kendaraan terindeks di 4 bahasa; impresi GSC tumbuh tiap bulan |
| G3 | Dikutip mesin jawaban & generatif (AEO/GEO) | Ringkasan jawaban di tiap halaman, FAQ, JSON-LD valid, `llms.txt` tersedia |
| G4 | Konversi ke WhatsApp | Event klik WA terlacak per halaman/paket/kendaraan; target CTR CTA detail ≥ 5% |
| G5 | Cepat di mobile | LCP < 2,5 dtk (4G), CLS < 0,1, Performance ≥ 90 |

## 3. Target Pengguna

| Persona | Bahasa | Mata uang default | Kebutuhan utama |
|---|---|---|---|
| **Wisatawan Malaysia** (keluarga/rombongan dari Johor, KL) | Melayu, Inggris | MYR | Harga all-in jelas, terminal ferry asal, apa yang termasuk/tidak, kontak cepat |
| **Wisatawan Singapura** (weekend getaway) | Inggris, Mandarin | SGD | Harga dalam SGD, add-on terminal Singapura, durasi singkat, kendaraan premium (Alphard/Hiace) |
| **Pelanggan lokal Batam** | Indonesia | IDR | Sewa motor/mobil harian, syarat dokumen (KTP/SIM), titik antar |
| **Wisatawan internasional lain** | Inggris | MYR/SGD | Sewa kendaraan dengan sopir, syarat dokumen internasional |

## 4. Ruang Lingkup

### 4.1 In scope (fase 1)
- 4 bahasa: **Indonesia (`id`), Inggris (`en`), Melayu (`ms`), Mandarin Sederhana (`zh`, ditujukan ke Singapura)**, lewat @nuxtjs/i18n.
- 3 mata uang: **IDR, MYR, SGD**, dipilih **terpisah** dari bahasa.
- Deteksi otomatis bahasa pada kunjungan pertama ke `/` (Nginx), lalu redirect ke URL bahasa.
- **Enam jenis halaman** (× 4 bahasa) + 404:

| Halaman | Route | Isi |
|---|---|---|
| Beranda | `/{locale}` | hero, paket & kendaraan populer, strip destinasi, cara pesan, FAQ singkat, CTA |
| Paket liburan | `/{locale}/packages` | daftar + filter |
| Detail paket | `/{locale}/packages/{slug}` | include/exclude, **destinasi (bagian dari paket)**, panel pemesanan |
| Kendaraan | `/{locale}/vehicles` | daftar + filter mobil/motor |
| Detail kendaraan | `/{locale}/vehicles/{slug}` | spesifikasi, syarat, panel pemesanan |
| Kontak | `/{locale}/contact` | admin, sosial media, **cara pembayaran (`#payment`)**, **FAQ lengkap (`#faq`)** |

- Form pemesanan sisi-klien yang menyusun pesan WhatsApp otomatis (tanpa menyimpan data).
- SEO/AEO/GEO lewat modul Nuxt (sitemap, robots, `llms.txt`) + JSON-LD + hreflang.
- Deployment container Docker di VPS Bidtech + Cloudflare.

### 4.2 Out of scope
- Backend, database, CMS, login, dashboard admin, pembayaran online/payment gateway, penyimpanan data pelanggan.
- Ketersediaan (availability) kendaraan real-time, kalender booking terkunci.
- Blog dinamis (konten artikel bisa ditambahkan sebagai file statis di fase berikutnya).
- Halaman terpisah untuk **Destinasi, Tentang, FAQ, Cara Pembayaran, Syarat & Ketentuan, Kebijakan Privasi** — dihapus dari fase 1 (destinasi → bagian paket; FAQ & pembayaran → Kontak). S&K/Privasi/Tentang ditambahkan kembali bila klien menyediakan isi legalnya (OQ-16, OQ-01).

## 5. Katalog Produk (sumber kebenaran untuk data awal)

### 5.1 Paket Liburan — harga dasar **MYR per pax**, "mulai dari"

Kode mengikuti poster (A = Batam, B = Batam + Bintan).

| Kode | Nama | Durasi | Harga | Makan (di luar sarapan hotel) | Tiket objek wisata | Speedboat Batam–Bintan PP |
|---|---|---|---|---|---|---|
| **A1** | Batam 2D1N | 2H1M | RM 420 | – | – | – |
| **A2** | Batam 3D2N | 3H2M | RM 520 | – | – | – |
| **A3** | Batam 2D1N (Full Board) | 2H1M | RM 515 | 3× | ✔ sesuai program | – |
| **A4** | Batam 3D2N (Full Board) | 3H2M | RM 666 | 4× (2 makan siang + 2 makan malam) | ✔ sesuai program | – |
| **B1** | Batam & Bintan 3D2N | 3H2M | RM 590 | – | – | ✔ |
| **B2** | Batam & Bintan 3D2N (Full Board) | 3H2M | RM 775 | 4× | ✔ sesuai program | ✔ |

**Termasuk di semua paket:** tiket ferry PP + seaport tax (operator kapal ditentukan Fun Travel), hotel + sarapan sesuai jumlah malam, transport + sopir (B1/B2: di Batam dan Bintan), tour leader, air mineral.

**Hotel:** brief menyebut bintang 3–4 yang **ditentukan sepihak oleh Fun Travel**; poster menulis "Hotel 3 star". Copy website: *"Hotel bintang 3 atau setara (dapat bintang 4), ditentukan oleh Fun Travel"* — menunggu OQ-04.

**Tidak termasuk (Exclude):**
- **Surcharge** — selisih harga di luar harga "mulai dari" (mis. musim liburan/akhir pekan, ketersediaan hotel, kurs). Interpretasi ini berasal dari riset Tim Bidtech dan **wajib dikonfirmasi** (OQ-05).
- **Keperluan pribadi** — ditanggung masing-masing peserta.

**Catatan (bukan exclude):** Tip untuk sopir/tour leader seikhlasnya.

**Terminal ferry (permintaan klien):** di bawah setiap paket wajib ditegaskan bahwa harga berlaku **dari terminal ferry Malaysia**; **dari terminal Singapura dikenakan add-on**. Nama terminal Malaysia dan nominal add-on menunggu OQ-06/OQ-07. Bila nominal belum ada, UI menampilkan "Add-on dari Singapura — tanyakan admin".

**Pilihan destinasi:** pelanggan memilih destinasi dari daftar opsi paket. Aturan kerja: **jumlah destinasi maksimal = jumlah hari paket** (2D1N → 2, 3D2N → 3). Disimpan sebagai field `maxDestinations` per paket agar mudah diubah (OQ-08).

Opsi destinasi yang sudah diketahui dari poster: Jembatan Barelang, Welcome to Batam (Bukit Clara), Pantai Pasir Pink, Grand Batam, Pantai Nongsa. ⚠️ **Pantai Pasir Pink (Pink Beach) berada di Bintan**, tetapi muncul di poster paket Batam A4 — perlu konfirmasi apakah bisa dipilih di paket A (OQ-09). Daftar destinasi Bintan untuk B1/B2 belum ada (OQ-10).

**Pasar:** paket hanya untuk wisatawan mancanegara. Di versi bahasa Indonesia, halaman paket tetap tampil (untuk SEO dan WNI yang mengurus keluarga dari MY/SG) dengan banner: *"Paket liburan ini khusus wisatawan dari Malaysia & Singapura."*

### 5.2 Sewa Kendaraan — harga dasar **IDR per hari**

| Kategori | Unit | Skema | Harga sementara |
|---|---|---|---|
| Mobil | Toyota Hiace, Toyota Alphard, Toyota Veloz, Daihatsu All New Xenia, Daihatsu All New Ayla, Daihatsu Rocky | **Dengan sopir** (tidak tersedia lepas kunci) | Rp 600.000 / hari (semua tipe, sementara) |
| Motor | Honda ADV, Honda Stylo, Honda Scoopy | **Lepas kunci** (tanpa sopir) | Rp 150.000 / hari |

Harga per unit disimpan per kendaraan di data agar bisa dibedakan nanti tanpa mengubah kode (Alphard dan Hiace kemungkinan besar akan berbeda harga).

Detail yang belum ada (OQ-11): durasi "1 hari" untuk mobil+sopir (mis. 10/12 jam), apakah BBM/parkir/tol/makan sopir termasuk, biaya overtime, deposit motor, varian & kapasitas tiap unit, foto asli.

**Syarat dokumen** (ditampilkan sesuai bahasa/pasar):

| | Mobil + sopir | Motor lepas kunci |
|---|---|---|
| Lokal | KTP | KTP + SIM C aktif (+ deposit bila ada) |
| Internasional | Paspor | Paspor + **International Driving Permit (IDP)** + SIM negara asal (+ deposit bila ada) |

> Karena mobil selalu dengan sopir, pelanggan **tidak** perlu SIM untuk sewa mobil. Syarat SIM/IDP hanya relevan untuk motor.

### 5.3 Kontak, Kanal & Pembayaran

| Item | Nilai |
|---|---|
| Admin 1 | +62 859-6057-7702 (juga dipakai di poster A4) |
| Admin 2 | +62 852-7202-3809 |
| Nama admin | Billy (konfirmasi admin nomor berapa — OQ-12) |
| Instagram | https://instagram.com/funtravel_transportasi |
| TikTok | https://www.tiktok.com/@fun_t.t_batam |
| Facebook | https://www.facebook.com/profile.php?id=61591836087671 |
| QRIS | "FUN BATAM HOLIDAY, AGEN PERJALANAN DAN TUR", NMID ID1026559732247 (gambar asli dipakai apa adanya) |
| Bank | BCA 5140532071 dan Mandiri 1090019817162, a.n. Bill Wilkin's Hasibuan |
| Alamat kantor | **Belum ada** (OQ-13) — penting untuk Google Business Profile & JSON-LD |

> Rekening atas nama pribadi (bukan atas nama PT) dapat menurunkan kepercayaan calon pelanggan mancanegara. Rekomendasi ke klien: siapkan rekening atas nama PT; sementara itu tampilkan pernyataan *"Pembayaran hanya sah ke rekening/QRIS resmi di halaman ini"* (pola sama dengan nadimtrans.com).

## 6. Kebutuhan Fungsional

### 6.1 Global
| ID | Kebutuhan | Prioritas |
|---|---|---|
| FR-01 | Header: logo, navigasi (Paket, Kendaraan, Kontak), **pemilih bahasa** dan **pemilih mata uang** terpisah, CTA WhatsApp | Must |
| FR-02 | Kunjungan pertama ke `/` di-redirect ke `/{locale}` berdasarkan (urut): cookie pilihan pengguna → browser Mandarin → negara (Cloudflare `CF-IPCountry`) → `Accept-Language` → `en` | Must |
| FR-03 | Mata uang default: ID→IDR, MY→MYR, SG→SGD; bila negara tak terdeteksi: `ms`→MYR, `zh`→SGD, `id`→IDR, `en`→MYR. Pilihan pengguna disimpan dan mengalahkan default | Must |
| FR-04 | Konversi harga otomatis dari mata uang dasar memakai kurs terbaru, **dibulatkan ke atas** (MYR/SGD ke 1 unit utuh, IDR ke Rp 1.000 terdekat) | Must |
| FR-05 | Label kecil "Kurs per {tanggal}. Harga konversi adalah estimasi; harga final dikonfirmasi admin." di dekat harga hasil konversi | Must |
| FR-06 | Tombol WhatsApp melayang di semua halaman dengan pesan pembuka sesuai bahasa | Must |
| FR-07 | Footer: nama legal, sosial media, kontak, metode pembayaran ringkas | Must |
| FR-08 | Pilihan bahasa diingat (cookie `ft_locale`) agar redirect `/` tidak melawan pilihan pengguna | Must |

### 6.2 Beranda
| ID | Kebutuhan |
|---|---|
| FR-10 | Hero: headline brand ("Explore Batam & Bintan"), subjudul, 2 CTA (Lihat Paket, Sewa Kendaraan), visual Batam |
| FR-11 | Trust bar: Safe & Comfortable, Best Price, Your Happiness Our Priority, perusahaan resmi (PT) |
| FR-12 | Carousel **paket terpopuler** (field `featured`): kode, durasi, harga "mulai dari", highlight include, catatan terminal ferry |
| FR-13 | Carousel **kendaraan terpopuler**: harga per hari dan badge skema (Dengan Sopir / Lepas Kunci) |
| FR-14 | Strip destinasi (polaroid) — diambil dari `destinations` di data paket |
| FR-15 | Cara pesan (3 langkah: pilih → chat WhatsApp → bayar & berangkat) |
| FR-16 | FAQ singkat (pertanyaan bertanda `home`) + tautan ke `/contact#faq` |
| FR-17 | CTA akhir + kontak admin |

### 6.3 Paket Liburan
| ID | Kebutuhan |
|---|---|
| FR-20 | Daftar semua paket, filter tab: Semua / Batam / Batam + Bintan / Full Board; banner khusus untuk locale `id` |
| FR-21 | Detail paket: galeri, ringkasan jawaban (answer text), harga mulai dari (MYR/SGD), info terminal ferry + add-on Singapura, Include, Exclude, Catatan, **opsi destinasi (foto + deskripsi singkat)**, paket lain |
| FR-22 | Panel pemesanan: tanggal berangkat, jumlah pax (dewasa/anak — OQ-14), terminal asal (Malaysia / Singapura), pilih destinasi (dibatasi `maxDestinations`), catatan → tombol **Pesan via WhatsApp** |
| FR-23 | Pesan WhatsApp otomatis berisi: kode & nama paket, tanggal, pax, terminal asal, destinasi terpilih, estimasi harga dalam mata uang terpilih (+ harga dasar MYR), URL halaman |
| FR-24 | Jika mata uang IDR dipilih, harga paket tetap ditampilkan dalam MYR dengan catatan "paket khusus wisatawan mancanegara" |

### 6.4 Sewa Kendaraan (referensi pola: nadimtrans.com/kendaraan/[slug])
| ID | Kebutuhan |
|---|---|
| FR-30 | Daftar kendaraan dengan filter Mobil / Motor; kartu: foto, nama, kapasitas, transmisi, harga per hari, badge skema, tautan ke detail |
| FR-31 | Detail kendaraan: galeri, spesifikasi utama, deskripsi, syarat dokumen (lokal vs internasional), peraturan sewa, kendaraan lain |
| FR-32 | Panel pemesanan: tanggal mulai, jumlah hari, jam antar, **titik antar/jemput** (Bandara Hang Nadim, Pelabuhan Batam Centre, Harbour Bay, Sekupang, Nongsa Pura, lainnya + input alamat), opsi "gunakan lokasi saya" (Geolocation → link Google Maps) |
| FR-33 | Skema layanan tetap (read-only): mobil = **Dengan Sopir**, motor = **Lepas Kunci**. Tidak ada toggle |
| FR-34 | Total estimasi = harga/hari × jumlah hari, dalam mata uang terpilih |
| FR-35 | Pesan WhatsApp otomatis: kendaraan, skema, tanggal & jam, durasi, titik antar, total estimasi, URL halaman |
| FR-36 | Peringatan "Pembayaran hanya sah ke rekening/QRIS resmi" + tautan ke `/contact#payment` |

### 6.5 Kontak
| ID | Kebutuhan |
|---|---|
| FR-40 | Admin 1/2 (tombol WhatsApp), sosial media (teks), jam layanan, peta (setelah alamat ada — OQ-13) |
| FR-41 | `#payment`: QRIS (gambar asli resolusi penuh), rekening BCA & Mandiri dengan tombol salin, peringatan rekening resmi, alur DP/pelunasan (OQ-15) |
| FR-42 | `#faq`: seluruh FAQ (`faqs.json`: paket, ferry, sewa kendaraan, pembayaran) + JSON-LD `FAQPage` |

### 6.6 Halaman 404
Pesan "halaman tidak ditemukan" dalam 4 bahasa dengan tautan ke `/en`, `/ms`, `/zh`, `/id` (`app/error.vue`).

## 7. Kebutuhan Non-Fungsional

| ID | Kebutuhan |
|---|---|
| NFR-01 | 100% statis (`nuxt generate` → folder `.output/public`), tanpa server Node di produksi |
| NFR-02 | Core Web Vitals: LCP < 2,5 dtk, CLS < 0,1, INP < 200 ms di mobile |
| NFR-03 | Aksesibilitas WCAG 2.2 AA (kontras, fokus keyboard, label form, alt text 4 bahasa) |
| NFR-04 | Semua teks UI dan konten produk tersedia di 4 bahasa; tidak ada teks hard-coded di halaman/komponen |
| NFR-05 | Website tetap fungsional bila API kurs gagal (pakai kurs snapshot saat build) |
| NFR-06 | Tidak ada data pribadi yang dikirim ke server Bidtech; form hanya membentuk URL `wa.me` |
| NFR-07 | Mudah diperbarui: harga, paket, dan kendaraan diubah di file JSON (`app/assets/data`), lalu build ulang |
| NFR-08 | Gambar WebP yang sudah dioptimasi (diekspor sebelum commit), lazy-load di bawah fold |
| NFR-09 | Header keamanan (CSP, HSTS via Cloudflare, X-Content-Type-Options, Referrer-Policy) |
| NFR-10 | Basis kode ramping: ≤ 4 komponen, 1 composable, tanpa skrip build kustom (`ARCHITECTURE.md` §2) — kemudahan perawatan adalah kebutuhan, bukan preferensi |

## 8. SEO, AEO & GEO — Ringkasan Kebutuhan
Detail teknis di `ARCHITECTURE.md` §8.

- URL bersih per bahasa **tanpa trailing slash**: `/{locale}/packages/{slug}`, `/{locale}/vehicles/{slug}`.
- `hreflang` lengkap (`id-ID`, `en`, `ms-MY`, `zh-Hans-SG`, `x-default`→`en`), canonical per bahasa (modul i18n).
- JSON-LD: `TravelAgency` (global), `TouristTrip`+`Offer` (paket), `Product`+`Offer` (kendaraan), `FAQPage` (kontak), `BreadcrumbList` (detail).
- Setiap halaman detail dibuka dengan **answer text** 2–3 kalimat yang menjawab "apa, berapa, termasuk apa".
- `sitemap_index.xml` (+ sitemap per bahasa), `robots.txt`, `llms.txt` dihasilkan modul Nuxt saat build dari data yang sama.
- Kata kunci prioritas (validasi dengan riset kata kunci): *Batam tour package from Johor*, *pakej percutian Batam*, *pakej Batam 3 hari 2 malam*, *Batam trip from Singapore*, *巴淡岛旅游配套*, *sewa mobil Batam dengan sopir*, *sewa motor Batam*, *Alphard rental Batam*.
- Di luar website (rekomendasi ke klien): Google Business Profile, konsistensi NAP (nama-alamat-telepon) di sosial media.

## 9. Konten yang Dibutuhkan dari Klien
1. Logo resolusi tinggi / vektor (SVG/AI) dengan latar transparan, versi horizontal & ikon.
2. **Foto asli** kendaraan (tiap unit, 3–6 foto), hotel partner, aktivitas tur, destinasi. Poster saat ini AI-generated dengan teks tertanam dan typo ("BBATAM") — **tidak dipakai** sebagai foto produk.
3. Profil perusahaan, visi-misi, tahun berdiri, nomor izin usaha (NIB/izin agen perjalanan) bila ada — diperlukan bila halaman Tentang/S&K ditambahkan kembali.
4. Alamat kantor, jam operasional, email resmi.
5. Jawaban seluruh Open Questions di §11.
6. Testimoni pelanggan (bila ada) — tidak boleh dikarang.

## 10. Milestone (estimasi, 7–14 hari kerja sesuai alur Bidtech)

| Tahap | Keluaran |
|---|---|
| M0 | PRD/Arsitektur/Desain disetujui internal; 4 draft desain Google Stitch dikirim ke klien |
| M1 | Klien memilih arah desain + menjawab Open Questions + mengirim aset |
| M2 | Scaffold proyek (Nuxt, i18n, Tailwind), sistem mata uang, data katalog |
| M3 | Beranda, Paket, Kendaraan (+ detail & pesan WhatsApp), Kontak |
| M4 | Terjemahan 4 bahasa (review penutur asli untuk `ms` & `zh`) |
| M5 | SEO/AEO/GEO, QA, Lighthouse, uji redirect geo |
| M6 | Deploy produksi, Search Console, serah terima |

## 11. Open Questions (wajib dikonfirmasi klien)

| ID | Pertanyaan |
|---|---|
| OQ-01 | Nama legal yang benar sesuai akta: "PT Fun Batam Holiday" atau "PT Fun Holiday Batam"? |
| OQ-02 | Domain yang dipakai? |
| OQ-03 | Ada email resmi? |
| OQ-04 | Hotel: "bintang 3" (poster) atau "bintang 3–4" (brief)? Boleh sebutkan contoh hotel partner? |
| OQ-05 | Definisi **surcharge**: kapan berlaku, perkiraan besaran (peak season/weekend/hari raya)? |
| OQ-06 | Terminal ferry Malaysia yang dipakai (mis. Stulang Laut, Johor Bahru)? Terminal tujuan di Batam? |
| OQ-07 | Nominal add-on dari terminal Singapura (HarbourFront / Tanah Merah) per pax? |
| OQ-08 | Aturan jumlah destinasi: benar maksimal = jumlah hari? Berlaku juga untuk paket non-full-board (A1, A2, B1) yang tidak termasuk tiket masuk? |
| OQ-09 | Pantai Pasir Pink ada di Bintan — apakah benar bisa dipilih di paket Batam (A4)? |
| OQ-10 | Daftar lengkap destinasi untuk Batam dan untuk Bintan (B1/B2)? |
| OQ-11 | Sewa mobil: 1 hari = berapa jam? BBM, tol, parkir, makan sopir termasuk? Overtime? Harga per tipe (Alphard/Hiace)? Deposit & jam sewa motor? |
| OQ-12 | Billy adalah Admin 1 atau Admin 2? Nama Admin lainnya? |
| OQ-13 | Alamat kantor/pool kendaraan? |
| OQ-14 | Harga "per pax" berbasis twin sharing? Minimum peserta? Harga anak/infant? Single supplement? |
| OQ-15 | Skema pembayaran paket (DP berapa %, kapan pelunasan)? Apakah QRIS bisa dipakai pelanggan MY/SG (QRIS antarnegara) atau perlu metode lain? |
| OQ-16 | Kebijakan pembatalan, refund, dan reschedule? (menentukan perlu tidaknya halaman S&K) |
| OQ-17 | Persyaratan paspor (masa berlaku min. 6 bulan) — boleh dicantumkan sebagai pengingat? |
| OQ-18 | Apakah ada itinerary standar per paket (hari ke-1, ke-2, ke-3)? |
