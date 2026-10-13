#!/usr/bin/env bash
# One-time local setup. Run from the repository root: ./scripts/setup.sh
set -euo pipefail

need() { command -v "$1" >/dev/null 2>&1 || { echo "Perlu '$1' terpasang."; exit 1; }; }
need go; need curl; need make

GOV=$(go env GOVERSION | sed 's/^go//')
MAJOR=${GOV%%.*}; REST=${GOV#*.}; MINOR=${REST%%.*}
if [ "$MAJOR" -lt 1 ] || { [ "$MAJOR" -eq 1 ] && [ "$MINOR" -lt 25 ]; }; then
  echo "Go 1.25+ diperlukan (terpasang: $GOV)."; exit 1
fi

echo "==> Mengunduh dependensi"
go get github.com/goravel/sqlite github.com/goravel/s3 \
  github.com/xuri/excelize/v2 github.com/disintegration/imaging \
  github.com/gen2brain/webp github.com/oklog/ulid/v2 github.com/gin-gonic/gin
go mod tidy

[ -f .env ] || { cp .env.example .env; echo "==> .env dibuat dari .env.example"; }
mkdir -p storage/database storage/logs
./artisan key:generate || true

echo "==> Membangun CSS"
make css

echo "==> Migrasi & seed"
./artisan migrate
./artisan db:seed

echo
echo "Selesai. Buat akun master: ./artisan app:create-master  (belum dibuat), lalu: make dev"
