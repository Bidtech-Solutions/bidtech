# Semesta Pro

Katalog properti **SemestaPro Batam (PT. Cipta Semesta Baru)**: Go + Goravel v1.18, view `.tmpl` dirender di server, SQLite (WAL), foto di RustFS (S3). Baca `AGENTS.md` dan `docs/` sebelum menulis kode.

## Mulai cepat

Prasyarat: Go 1.25+, `make`, `curl`, dan (opsional) `air` serta `golangci-lint`.

```bash
./scripts/setup.sh        # dependensi, .env, CSS, migrasi, seed kecamatan
make dev                  # build CSS lalu air → http://127.0.0.1:3000
make css-watch            # terminal kedua: Tailwind --watch
```

Foto membutuhkan RustFS berjalan (lihat `docs/SCHEMA.md` §10 dan `deploy/`). Beranda dan `/healthz` tidak membutuhkannya.

## Perintah

| Perintah | Fungsi |
|---|---|
| `make dev` | Build CSS lalu hot reload Go (air); jalankan `make css-watch` di terminal kedua |
| `make css` | Build CSS sekali (minify). Mengunduh Tailwind CLI standalone ke `tools/` (via `go run`, lintas OS) |
| `make test` | `go test ./... -race -count=1` |
| `make lint` | gofmt, go vet, golangci-lint |
| `make build` | Binary `bin/semestapro` (set `CGO_ENABLED=0` untuk produksi) |
| `./artisan migrate` / `migrate:rollback` / `db:seed` | Skema & data awal |

## Docker & deploy

```bash
docker compose up --build                      # dev: app di http://127.0.0.1:3000
docker compose --profile storage up --build    # + RustFS lokal (S3 :9000, console :9001)
```

Produksi (VPS, Nginx host + RustFS yang sudah berjalan): lihat `docs/ARCHITECTURE.md` §16, `docker-compose.prod.yml`, dan `deploy/nginx/`. Image dibangun di GitHub Actions dan ditarik VPS; jangan membangun di server.

Setelah RustFS jalan, buat bucket `semestapro-media`, access key khusus bucket itu, dan izin baca-anonim untuk `listings/*` (`docs/SCHEMA.md` §10).

## CI/CD

`.github/workflows/deploy-semestapro.yml` (di root repositori): test (gofmt, vet, golangci-lint, `go test -race`) → build image + smoke test di container → push ke GHCR → upload artefak deploy → SSH ke VPS (`/opt/semestapro`): render `.env`, `pull`, migrate, `up -d --wait`, smoke test. Secret & variable yang dibutuhkan ada di `docs/ARCHITECTURE.md` §16.

## Status

Sudah ada: konfigurasi (SQLite WAL, RustFS, situs), domain murni (kategori, spesifikasi, kecamatan, KPR, format, WhatsApp), migrasi 6 tabel, seeder kecamatan, helper template, layout publik + beranda kerangka, `/healthz`.

Belum ada: model & service, pencarian, detail properti, pipeline gambar, admin, SEO endpoint (`robots.txt`, `sitemap.xml`, `llms*.txt`, `security.txt`), staf, perintah artisan `app:*`. Urutan pengerjaan mengikuti ID di `docs/PRD.md`.
