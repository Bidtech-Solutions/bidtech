# syntax=docker/dockerfile:1
# Semesta Pro — multi-stage image. No Node and no CGo: Tailwind standalone CLI + static Go binary.

FROM golang:1.25-bookworm AS build
WORKDIR /src
ENV CGO_ENABLED=0 GOFLAGS=-trimpath

COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod go mod download

COPY . .
# Build CSS (Tailwind standalone binary needs glibc, hence a Debian build stage), then the Go binary.
# The resulting Go binary is static (CGO_ENABLED=0), so it still runs on the Alpine runtime stage.
RUN --mount=type=cache,target=/go/pkg/mod \
    go run scripts/fetch_tailwind.go v4.1.13 \
 && ./tools/tailwindcss -i resources/css/app.css -o public/css/app.css --minify \
 && go build -ldflags="-s -w" -o /out/semestapro .

FROM alpine:3.21
RUN apk add --no-cache ca-certificates tzdata \
 && addgroup -S -g 10001 app && adduser -S -u 10001 -G app app
WORKDIR /app
COPY --from=build /out/semestapro ./semestapro
COPY --from=build /src/public ./public
COPY --from=build /src/resources ./resources
# storage/ is a volume (SQLite database, sessions, logs). Created here so the
# non-root user owns it when an empty named volume is first mounted.
RUN mkdir -p storage/database storage/framework/sessions storage/logs && chown -R app:app /app/storage
USER app
EXPOSE 3000
ENV APP_HOST=0.0.0.0 APP_PORT=3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:3000/healthz || exit 1
ENTRYPOINT ["./semestapro"]