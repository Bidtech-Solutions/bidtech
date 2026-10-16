# ARCHITECTURE — Website Fun Travel & Transport

Dokumen ini menjelaskan **bagaimana** website dibangun dan — yang terpenting — **batas-batas agar struktur tetap ramping**. Untuk *apa* yang dibangun lihat `PRD.md`; untuk tampilan lihat `DESIGN.md`.

> **Mengapa dokumen ini ada.** Coding agent mempercepat pekerjaan, tetapi cenderung melebarkan proyek: komponen baru untuk setiap blok UI, folder baru untuk setiap konsep, abstraksi sebelum dibutuhkan. Versi sebelumnya (±45 komponen/util/skrip) menjadi sulit dirawat. Versi ini sengaja **ramping dan tidak modular**: kode yang berubah bersama diletakkan bersama. §2 adalah kontrak; baca sebelum menambah file atau folder.

---

## 1. Prinsip

1. **Statis penuh.** `nuxt generate` (Nitro preset `static`) mem-prerender semua route menjadi HTML + `_payload.json`. Produksi hanya Nginx yang menyajikan file; tidak ada Node, API, database, atau CMS.
2. **Data = JSON + i18n.** Isi bisnis (paket, kendaraan, harga, kontak) ada di `app/assets/data/*.json`; teks UI di `app/i18n/locales/*.json`. Menambah/mengubah konten **tidak** butuh komponen baru.
3. **Halaman adalah unit kerja.** Satu halaman = satu file `.vue` yang berisi semua blok UI-nya. Memecah blok ke komponen hanya bila memenuhi aturan §2.3.
4. **Modul Nuxt menggantikan kode buatan sendiri.** i18n, sitemap, robots, `llms.txt`, hreflang/canonical → konfigurasi di `nuxt.config.ts`, bukan skrip/server route.
5. **Bahasa ≠ mata uang.** Bahasa ada di URL (terindeks). Mata uang preferensi klien (tidak membuat URL duplikat).
6. **Tailwind dulu.** CSS tulisan tangan hanya untuk token tema dan kasus khusus di `main.css`.

## 2. Struktur & Anggaran (kontrak anti-melebar)

### 2.1 Pohon yang disetujui

Repo berisi `.github/workflows/deploy-funtravel.yml` dan `projects/funtravel/`:

```
projects/funtravel/
├── app/
│   ├── app.vue · error.vue
│   ├── assets/
│   │   ├── css/main.css              # @theme tokens, @font-face, @utility (btn, field, wrap, section), .ph, .snap-row
│   │   ├── data/                     # sumber isi bisnis (JSON)
│   │   │   ├── site.json             # nama brand, admin WA, sosial, rekening/QRIS
│   │   │   ├── packages.json         # fasilitas, DESTINASI, paket
│   │   │   ├── vehicles.json         # titik antar, kendaraan
│   │   │   ├── faqs.json
│   │   │   └── rates.json            # snapshot kurs (diperbarui CI)
│   │   ├── fonts/                    # 2 file woff2 (latin)
│   │   └── images/                   # logo.webp, qris.webp, foto (home/, packages/, vehicles/)
│   ├── components/                   # HANYA 4: header · footer · cta · whatsapp-floater
│   ├── composables/useSite.ts        # satu-satunya composable (mata uang, format, WA, foto)
│   ├── i18n/{i18n.config.ts, locales/{id,en,my,zh}.json}
│   ├── layouts/default.vue           # head SEO (useLocaleHead), JSON-LD agensi, GA
│   └── pages/{index,contact}.vue · packages/{index,[slug]}.vue · vehicles/{index,[slug]}.vue
├── public/favicon.ico
├── docs/{ARCHITECTURE,DESIGN,PRD}.md
├── AGENTS.md · CLAUDE.md
├── nuxt.config.ts · package.json · package-lock.json · tsconfig.json
├── nginx.conf                        # Nginx DALAM container (redirect bahasa, cache, CSP)
├── Dockerfile · docker-compose.yml · .dockerignore
└── .env.example · .gitignore
```

Total ±35 file sumber. **Tidak ada** folder `scripts/`, `server/`, `shared/`, `generated/`, `utils/`, `plugins/`, `middleware/`, `deploy/`, `assets-src/`.

### 2.2 Anggaran (batas keras)

| Hal | Batas | Bila butuh lebih |
|---|---|---|
| Komponen di `app/components/` | **4** | Lihat §2.3 + tulis ADR di §15 |
| Composable di `app/composables/` | **1** (`useSite.ts`) | Tambahkan fungsi ke `useSite.ts`; pecah hanya bila >250 baris |
| Folder baru di bawah `app/` atau root | **0** | ADR dulu; jawab "mengapa tidak muat di file yang ada?" |
| Halaman | 6 jenis (beranda, paket, detail paket, kendaraan, detail kendaraan, kontak) | Perubahan scope → ubah `PRD.md` lebih dulu |
| Ukuran satu halaman | ±300 baris (peringatan), 400 (batas) | Pindahkan *data* ke JSON/i18n dulu; baru pertimbangkan komponen |
| Dependensi runtime | modul Nuxt yang ada + `@lucide/vue` | ADR; cek apakah CSS/Tailwind/modul yang ada cukup |
| Skrip `package.json` | `dev`, `generate`, `preview`, `typecheck`, `verify` (+`postinstall`) | ADR |

### 2.3 Kapan boleh membuat komponen baru

Semua syarat harus terpenuhi:

1. Dipakai di **≥ 3 tempat** (bukan 2, bukan "mungkin nanti"), **dan**
2. memiliki **markup + perilaku** yang substansial (>25 baris) dan berubah bersama, **dan**
3. tidak bisa diselesaikan dengan kelas Tailwind / `@utility` di `main.css`, **dan**
4. ADR singkat di §15 menyebut alasannya.

Contoh yang **ditolak**: `Price`, `PackageCard`, `Breadcrumbs`, `AnswerBox`, `FerryNotice`, `Section`, `Chip`. Kartu paket dipakai di 2 halaman → disalin saja (±15 baris); `AnswerBox` hanyalah satu `<p>` dengan kelas. Duplikasi kecil lebih murah daripada indirection.

### 2.4 Aturan untuk agent

- Fitur baru: **ubah file yang ada**. Urutan sumber perubahan: JSON data → i18n → halaman. Membuat file baru adalah pengecualian yang harus dijelaskan di ringkasan akhir.
- Dilarang "merapikan" dengan mengekstrak komponen/composable/util dari halaman.
- Dilarang membuat file `index.ts` barrel, `types.ts`, `constants.ts`, `helpers.ts`, `*.test.ts` tanpa persetujuan.
- Dilarang menambah skrip build/pre/post. Bila sesuatu perlu otomatis, taruh di langkah workflow (inline) atau di `nuxt.config.ts`.
- Setiap PR melaporkan: file ditambah/dihapus dan alasannya.

## 3. Stack

Versi dipin persis di `package.json`.

| Lapisan | Pilihan | Catatan |
|---|---|---|
| Framework | **Nuxt 4.6** (Vue 3.5, Vite, Nitro) — SSG `nuxt generate` | Node.js ^22.22.3 |
| Package manager | **npm 11.21** (`packageManager`) | npm 10 bawaan Node 22 gagal me-resolve dependensi Nuxt 4.6. CI & Docker memasang npm 11 lebih dulu; `esbuild` ditambahkan sebagai devDependency agar peer ter-resolve |
| Bahasa | TypeScript strict | `nuxt typecheck` (vue-tsc) |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite`; token di `@theme` | |
| i18n | **@nuxtjs/i18n 10**, `strategy: 'prefix'`, `restructureDir: 'app/i18n'` | file bahasa lazy-load |
| SEO | `@nuxtjs/sitemap`, `@nuxtjs/robots`, `nuxt-llms`, `nuxt-site-config` (dibawa sitemap/robots) | semua dikonfigurasi di `nuxt.config.ts` |
| Ikon | `@lucide/vue` | tanpa ikon merek |
| Font | woff2 lokal di `assets/fonts` (Plus Jakarta Sans variabel, Kaushan Script) | tanpa Google Fonts |
| Carousel | CSS `scroll-snap` | |
| Analitik | GA4 opsional (`NUXT_PUBLIC_GA_ID`), event `wa_click` | aktif hanya bila env diisi |
| Serving | `nginxinc/nginx-unprivileged` (8080) di belakang Nginx host + Cloudflare | |

Alias: `~/` = `app/`. Fungsi di `app/composables` dan komponen di `app/components` di-*auto-import*.

## 4. Routing, Bahasa & URL

### 4.1 Locale

| Kode URL | File | `language` (hreflang) | Bahasa | Pasar |
|---|---|---|---|---|
| `id` | `id.json` | `id-ID` | Indonesia | Batam lokal |
| `en` | `en.json` | `en` | English (default, `x-default`) | Internasional |
| `ms` | **`my.json`** | `ms-MY` | Bahasa Melayu | Malaysia |
| `zh` | `zh.json` | `zh-Hans-SG` | 简体中文 | Singapura |

Segmen path memakai bahasa Inggris di semua locale: `/ms/packages/batam-3d2n-full-board`. `strategy: 'prefix'` — semua locale berprefiks, termasuk `en`.

### 4.2 Aturan URL: tanpa trailing slash

Satu URL kanonis per halaman, **tanpa** `/` di akhir (`/en/packages`). Nuxt menghasilkan `…/packages/index.html`; Nginx container mem-*rewrite* `/x/` → 301 `/x` lalu `try_files $uri $uri/index.html`. Canonical, hreflang, dan sitemap dari modul sudah tanpa slash.

### 4.3 Prerender

`nuxt.config.ts` membangun daftar route eksplisit dari JSON (4 locale × beranda, `/packages`, `/vehicles`, `/contact` + slug paket + slug kendaraan) dengan `crawlLinks: true` dan `failOnError: true` → tautan rusak menggagalkan generate. Total ±167 file termasuk `_payload.json` dan sitemap per locale.

`"/"` **tidak** diprerender; ditangani Nginx (§6). `404.html` adalah shell SPA (±3 KB) dengan `error.vue` yang dirender di klien — konsol browser mencatat `[NUXT_E1005]` pada 404; ini normal.

### 4.4 Aturan SSR/hidrasi (wajib)

- Output server dan klien harus identik. Jangan membaca `window`, `document`, `localStorage`, cookie, atau `Date.now()` saat render.
- State klien (`ft-currency`, `ft-rates`) hanya diubah di `initClient()` yang dipanggil dari `onNuxtReady` (layout). Mengubahnya lebih awal menyebabkan *hydration mismatch*.
- URL situs dari `useSiteConfig().url` / `NUXT_PUBLIC_SITE_URL`, bukan `process.env` di kode klien.

## 5. Mata Uang (`useSite.ts`)

| Produk | Dasar | Tampil |
|---|---|---|
| Paket | MYR | MYR, SGD. Pengguna memilih IDR → MYR + catatan "khusus wisatawan mancanegara" |
| Kendaraan | IDR | IDR, MYR, SGD |

- Pembulatan **selalu ke atas**: MYR/SGD ke 1 unit; IDR ke Rp 1.000. Harga dalam mata uang dasar tidak dibulatkan ulang.
- **Default**: bahasa halaman (`id`→IDR, `ms`→MYR, `zh`→SGD, `en`→MYR) dirender saat build. Setelah `onNuxtReady`, `initClient` menimpa dengan (urut): `localStorage.ft_currency` → cookie `ft_country` dari Nginx (`ID/MY/SG`) → default bahasa.
- **Kurs**: `rates.json` (snapshot; CI menyegarkannya dari Frankfurter/ECB saat build). Klien menyegarkan dari Frankfurter lalu open.er-api setelah `onNuxtReady`, cache `localStorage` `ft_rates_v1` 12 jam. Gagal → tetap snapshot.
- JSON-LD selalu memakai mata uang dasar.

> **Trade-off (ADR-5):** HTML statis dirender dengan mata uang default bahasa; pengunjung yang defaultnya berbeda (mis. Singapura membuka `/en` → SGD) melihat harga berganti sekali setelah hidrasi. Versi lama menghilangkannya dengan skrip pre-paint + merender semua mata uang; dibuang karena menambah kerumitan besar. Bila kedipan dikeluhkan, solusinya ADR baru, bukan tambalan.

## 6. Redirect Bahasa di `/` (Nginx container, `nginx.conf`)

Situs statis tanpa middleware, jadi deteksi di Nginx — hanya untuk `/` dan URL tanpa prefix bahasa (`/packages`, `/vehicles`, `/contact`). Urutan: cookie `ft_locale` → browser Mandarin (`Accept-Language: zh*`) → negara `CF-IPCountry` (MY→ms, ID→id, CN/TW/HK→zh) → `Accept-Language` en/ms/id → `en`. Respons 302 + `Cache-Control: no-store` + `Set-Cookie: ft_country=<XX>`. Singapura sengaja tidak dipetakan: browser Mandarin→`zh`, selain itu `en`.

Cookie `ft_locale` ditulis oleh @nuxtjs/i18n (`detectBrowserLanguage.cookieKey`) berisi kode locale polos (`ms`) — format ini yang dibaca Nginx. Cadangan di klien: `redirectOn: 'root'` hanya berlaku bila Nginx dilewati (mis. `npm run preview`).

> Googlebot umumnya tanpa `CF-IPCountry` Asia → `/en` (= `x-default`). URL berbahasa tidak pernah di-redirect paksa.

## 7. Model Data

Tanpa skema/validator runtime; `nuxt typecheck` mengetik JSON (`resolveJsonModule`).

| File | Isi |
|---|---|
| `packages.json` | `facilities{key→L10n}` (ferry, hotel-1n, hotel-2n, transport, …); `destinations[{id,island,name,summary,image}]`; `packages[{code,slug,region,fullBoard,days,nights,name,price,includes[],excludes[],notes[],destinations[],maxDestinations,sgAddOn,accent,featured,images[]}]` |
| `vehicles.json` | `pickupPoints[]`; `vehicles[{slug,type,category,brand,model,tagline,pricePerDay,seats,transmission,featured,images[]}]` |
| `faqs.json` | `[{id,home,q,a}]` |
| `site.json` | brand, admin WA (`phone`, `display`), sosial, `payment{qris,banks[]}` |
| `rates.json` | `{base:'MYR',date,source,rates:{MYR,SGD,IDR}}` |

`L10n` = `{en, ms, zh, id}` inline. Skema sewa **diturunkan** dari `type` (car→dengan sopir, motorcycle→lepas kunci); deskripsi kendaraan adalah template i18n (`vehicle.descCar/descMotor` + `{model}`). Destinasi **bagian dari paket** (tidak ada halaman destinasi). Foto dirujuk sebagai path relatif ke `app/assets/images/` (mis. `packages/a4-1.webp`); `images: []` → placeholder berlabel.

## 8. SEO, AEO & GEO (semua lewat modul)

| Kebutuhan | Cara |
|---|---|
| canonical, hreflang (`id-ID/en/ms-MY/zh-Hans-SG` + `x-default`), `og:url/locale` | `useLocaleHead({lang:true, seo:true})` di `layouts/default.vue`; `i18n.baseUrl` = URL situs |
| Title | `titleTemplate`: `{judul} \| {meta.titleSuffix}`; judul per halaman dari i18n |
| Sitemap | `@nuxtjs/sitemap` — multi-sitemap per locale + `sitemap_index.xml` otomatis dari i18n |
| robots.txt | `@nuxtjs/robots` (izinkan semua + URL sitemap) |
| llms.txt | `nuxt-llms` di `nuxt.config.ts`; bagian paket/kendaraan dibangun dari JSON. **Tanpa `llms-full.txt`** (lihat ADR) |
| JSON-LD | `useHead` + `<script type="application/ld+json">` di tiap halaman: `TravelAgency` (layout, `@id` stabil), `TouristTrip`+`Offer` (detail paket), `Product`+`Offer` (detail kendaraan), `FAQPage` (kontak), `BreadcrumbList` (halaman detail) |
| Answer text | satu `<p>` faktual 2–3 kalimat di atas halaman detail |

Tidak ada `AggregateRating`/`Review` tanpa ulasan asli. Satu `<h1>` per halaman.

## 9. WhatsApp

`waUrl(text)` (di `useSite`) → `https://wa.me/<admin>?text=…`. Template pesan ada di i18n (`whatsapp.*`, placeholder `{nama}`; hindari `@ | { }` di teks biasa). Paket → admin 1; kendaraan → admin 2. Pesan memuat tautan halaman. Klik pada elemen `[data-wa]` mengirim event GA4 `wa_click` bila `gtag` ada. Tidak ada data dikirim ke server mana pun.

## 10. Gambar & Font

- Gambar diimpor lewat Vite (`import.meta.glob` di `useSite`, fungsi `img('packages/a4-1.webp')`), sehingga ber-hash dan di-cache `immutable`. Simpan WebP yang sudah dioptimasi (≤ 1600 px lebar, ~150 KB) — **tidak ada pipeline optimasi**; ekspor sebelum commit. QRIS lossless (agar terbaca scanner).
- Hanya gambar LCP (hero) memakai `fetchpriority="high"`; lainnya `loading="lazy"`; selalu beri `width/height` atau rasio via `.ph`.
- Font woff2 lokal (subset latin); Mandarin memakai system font stack.

## 11. Performa & Keamanan

- Header dari `nginx.conf`: CSP (`default-src 'self'`; skrip: GTM + Cloudflare Insights; `connect-src`: API kurs + GA; `font-src 'self' data:` karena Vite meng-inline font kecil; `'unsafe-inline'` dibutuhkan payload Nuxt), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy: geolocation=(self)`. HSTS di Cloudflare.
- **Menambah domain pihak ketiga = ubah CSP di `nginx.conf`** dan uji.
- Cache-Control di `nginx.conf`: `/_nuxt/*` immutable 1 tahun **kecuali** `/_nuxt/builds/*`; HTML, `_payload.json`, `/_i18n/*` → `max-age=0, s-maxage=86400`; sitemap/robots/llms 1 jam.
- Tidak ada secret di repo. Env: `NUXT_PUBLIC_SITE_URL`, `NUXT_PUBLIC_GA_ID`.

## 12. Build, Docker & Deploy

### 12.1 Perintah

| Perintah | Fungsi |
|---|---|
| `npm run dev` | `nuxt dev` — http://localhost:3000/en |
| `npm run generate` | `nuxt generate` → `.output/public` |
| `npm run preview` | sajikan `.output/public` (tanpa redirect Nginx) |
| `npm run typecheck` | `nuxt typecheck` |
| `npm run verify` | typecheck + generate (wajib lolos sebelum selesai) |

### 12.2 Docker

`Dockerfile`: `node:22-alpine` + npm 11.21 → `npm ci --ignore-scripts` → `nuxt generate` → `nginx-unprivileged` (+`nginx.conf`) ±95 MB, port 8080, HEALTHCHECK `/healthz`. `docker-compose.yml`: image GHCR, `127.0.0.1:${HOST_PORT:-3050}:8080`, `read_only`, `tmpfs /tmp`, `cap_drop: ALL`, `no-new-privileges`, `mem_limit 128m`, log 3×10 MB. Uji lokal: `docker compose up -d --build` lalu `curl -sI -H 'CF-IPCountry: MY' http://127.0.0.1:3050/`.

Nginx container tanpa `listen [::]` (container umumnya tanpa IPv6) dan `absolute_redirect off` (di belakang proxy).

### 12.3 Pipeline (`.github/workflows/deploy-funtravel.yml`, di root repo)

```
PR     ─► verify (npm 11 · paritas i18n · typecheck · generate) ─► image (build + smoke test Nginx)
main   ─► verify ─► image (+ push ghcr.io/<owner>/funtravel:{sha-xxxxxxx,latest})
       ─► deploy: scp docker-compose.yml → VPS · .env IMAGE/IMAGE_TAG · docker compose pull && up -d --wait
                  ─► purge Cloudflare (opsional) ─► smoke test domain publik
```

Workflow hanya terpicu oleh perubahan di `projects/funtravel/**`. **Rollback:** Actions → Run workflow → `image_tag=sha-xxxxxxx`. **Jadwal:** Senin 07:15 WIB (menyegarkan snapshot kurs). Kurs disegarkan di runner (`curl`+`jq` → `rates.json`, gagal = pakai yang ada) dan tidak di-commit. Variabel: `SITE_URL` (wajib go-live), `DEPLOY_PATH`, `GA_ID`; secret: lihat header workflow.

Persiapan VPS (sekali): `mkdir -p /opt/funtravel`, salin `.env.example` → `/opt/funtravel/.env` (isi `IMAGE`, `HOST_PORT`), cek port bebas `ss -tulpn | grep 3050` (3000/3010/3020/3040 terpakai proyek lain), pasang Nginx host (§12.4). Jangan menjalankan perintah Docker destruktif global di VPS bersama.

### 12.4 Nginx host (VPS, Nginx 1.24)

Salin ke `/etc/nginx/sites-available/funtravel.conf`, ganti `__DOMAIN__`, `ln -s` ke `sites-enabled`, `nginx -t && systemctl reload nginx`. TLS memakai Cloudflare Origin Certificate di `/etc/ssl/cloudflare/`. Nginx 1.24 belum mendukung `http2 on;` → pakai `listen 443 ssl http2`.

```nginx
upstream funtravel_web { server 127.0.0.1:3050; keepalive 16; }   # = HOST_PORT

server { listen 80; listen [::]:80; server_name __DOMAIN__ www.__DOMAIN__; return 301 https://__DOMAIN__$request_uri; }

server {
  listen 443 ssl http2; listen [::]:443 ssl http2; server_name www.__DOMAIN__;
  ssl_certificate /etc/ssl/cloudflare/__DOMAIN__.pem; ssl_certificate_key /etc/ssl/cloudflare/__DOMAIN__.key;
  return 301 https://__DOMAIN__$request_uri;
}

server {
  listen 443 ssl http2; listen [::]:443 ssl http2; server_name __DOMAIN__;
  ssl_certificate /etc/ssl/cloudflare/__DOMAIN__.pem; ssl_certificate_key /etc/ssl/cloudflare/__DOMAIN__.key;
  ssl_protocols TLSv1.2 TLSv1.3; ssl_session_cache shared:funtravel_ssl:5m;
  client_max_body_size 1m;
  access_log /var/log/nginx/funtravel.access.log; error_log /var/log/nginx/funtravel.error.log warn;

  location / {
    proxy_pass http://funtravel_web; proxy_http_version 1.1; proxy_set_header Connection "";
    proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header CF-IPCountry $http_cf_ipcountry;     # dipakai redirect bahasa di container
    proxy_connect_timeout 5s; proxy_read_timeout 30s;
  }
}
```

### 12.5 Cloudflare (dashboard, sekali)

| Menu | Pengaturan | Alasan |
|---|---|---|
| DNS | `A @ → IP VPS`, `CNAME www → @`, **Proxied** | CDN + header negara |
| SSL/TLS | **Full (strict)** + Origin Certificate; Always HTTPS On; HSTS 6 bulan; Min TLS 1.2 | TLS end-to-end |
| Network | **IP Geolocation On**, HTTP/3 On | `CF-IPCountry` wajib |
| Speed | Brotli On, **Rocket Loader Off** | Rocket Loader merusak hidrasi |
| Scrape Shield | **Email Obfuscation Off** | mengubah HTML → hydration mismatch |
| Caching | Browser Cache TTL: **Respect Existing Headers** | TTL diatur Nginx |
| Rules → Redirect | `www.<domain>` → `https://<domain>` (opsional) | |

**Cache Rules** (urut; rule terakhir menang):

| # | Kondisi | Edge TTL | Catatan |
|---|---|---|---|
| 1 | path mulai `/_nuxt/` dan bukan `/_nuxt/builds/` | 1 tahun | ber-hash; `builds/` = manifest per deploy |
| 2 | path berakhir `.webp .jpg .png .svg .ico .woff2` (di luar `/_nuxt/`) | 30 hari | |
| 3 | HTML, `_payload.json`, `/_i18n/*`, sitemap, `llms.txt` → *Eligible for cache*, Edge TTL **ikuti header origin**, **abaikan query string** | `s-maxage=86400` | `utm_*` tidak memecah cache |
| 4 | **path = `/` atau `/healthz` → Bypass cache** | — | **WAJIB**, paling bawah. Tanpa ini redirect satu negara ter-cache untuk semua |

Purge: otomatis di workflow bila `CF_API_TOKEN` (Zone → Cache Purge) dan `CF_ZONE_ID` ada. Verifikasi: `curl -sI https://<domain>/` → 302 + `cf-cache-status: DYNAMIC/BYPASS`; `/en` → MISS lalu HIT; `/en?utm_source=ig` → HIT.

## 13. Kualitas & Pengujian

| Cek | Alat | Kapan |
|---|---|---|
| Tipe | `nuxt typecheck` | setiap perubahan |
| Semua route ter-prerender, tautan tidak rusak | `nuxt generate` (`failOnError`, `crawlLinks`) | setiap perubahan |
| Paritas key 4 bahasa | langkah inline di workflow | setiap PR |
| Hidrasi bersih | konsol browser tanpa *Hydration mismatch* di `npm run dev` (375 px & 1280 px) | setiap perubahan UI |
| Redirect & cache Nginx | smoke test job `image` | setiap PR |
| Schema, hreflang | Rich Results Test; cek silang sitemap | sebelum go-live |
| Lighthouse mobile | Perf ≥ 90, A11y/BP/SEO ≥ 95 | sebelum go-live |
| Pesan WhatsApp | manual: tiap locale × paket/kendaraan | sebelum go-live |

Tidak ada ESLint/Vitest/Zod di fase ini (ADR-8). Ketaatan struktur dijaga oleh dokumen ini dan review.

## 14. Peta Perubahan Umum

| Tugas | Sentuh |
|---|---|
| Ubah harga/fasilitas paket | `packages.json` |
| Tambah kendaraan | `vehicles.json` + foto di `assets/images/vehicles/` |
| Tambah destinasi | `packages.json` → `destinations[]`, lalu rujuk id-nya di `packages[].destinations` |
| Tambah teks UI | key yang sama di 4 `locales/*.json` |
| Ubah kontak/rekening | `site.json` |
| Tambah halaman | `app/pages/…` + route di `nuxt.config.ts` bila dinamis + key i18n + ubah `PRD.md` (scope) |
| Ubah redirect/cache/CSP | `nginx.conf` → jalankan smoke test |

## 15. Catatan Keputusan (ADR)

| # | Keputusan | Alasan / konsekuensi |
|---|---|---|
| 1 | Mata uang tidak masuk URL | Hindari 3× URL duplikat; harga final via admin |
| 2 | Redirect geo di Nginx, bukan middleware | Situs statis tanpa Node |
| 3 | Data di JSON, bukan TS/CMS; tanpa Zod | Klien statis; perubahan jarang, dikerjakan Bidtech. Typecheck cukup |
| 4 | Skema sewa diturunkan dari `type` | Klien hanya mobil+sopir dan motor lepas kunci |
| 5 | Mata uang tanpa pre-paint | Kode jauh lebih sederhana; harga bisa berganti sekali setelah hidrasi (lihat §5) |
| 6 | Paket tampil di locale `id` dengan banner | Pertahankan SEO tanpa menyesatkan |
| 7 | Tanpa trailing slash | Selaras default modul sitemap/i18n; satu URL kanonis |
| 8 | Tanpa ESLint/Vitest/skrip pre/post/CI check kustom | Mengurangi permukaan pemeliharaan; verifikasi = typecheck + generate + smoke test |
| 9 | Halaman destinasi, tentang, FAQ, pembayaran, S&K, privasi dihapus sebagai halaman | Destinasi → bagian paket; FAQ+pembayaran → `/contact`; S&K/privasi → ditinjau ulang bila klien meminta |
| 10 | Locale `ms` memakai berkas `my.json` | Sesuai struktur yang diminta; kode URL/hreflang tetap `ms` (benar secara BCP-47) |
| 11 | Komponen dibatasi 4 (§2) | Mencegah sprawl akibat agent |
| 12 | `llms-full.txt` tidak dibuat | `nuxt-llms` 0.2 hanya `llms.txt` ringkas; cukup untuk fase 1 |
| 13 | 404 berupa shell SPA | Tanpa skrip postgenerate; konsol mencatat `NUXT_E1005` (normal) |
| 14 | `nginx.conf` & `useSite.ts` adalah satu-satunya file di luar pohon permintaan awal | Redirect/cache tak bisa di Nuxt statis; logika mata uang dibagi lintas halaman |
