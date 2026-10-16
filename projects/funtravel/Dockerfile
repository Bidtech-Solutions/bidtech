# syntax=docker/dockerfile:1.7
# ─────────────────────────────────────────────────────────────────────────────
# Fun Travel & Transport — image statis: `nuxt generate` → Nginx unprivileged.
# Build: docker build --build-arg NUXT_PUBLIC_SITE_URL=https://<domain> -t funtravel .
# ─────────────────────────────────────────────────────────────────────────────

# npm 11 wajib: npm 10 (bawaan Node 22) gagal me-resolve graf dependensi Nuxt 4.6.
ARG NPM_VERSION=11.21.0

# 1) Build statis → /app/.output/public
FROM node:22-alpine AS build
ARG NPM_VERSION
WORKDIR /app
ENV NUXT_TELEMETRY_DISABLED=1
RUN npm install -g npm@${NPM_VERSION} --no-audit --no-fund

# Dependensi dulu (layer ter-cache). --ignore-scripts: postinstall `nuxt prepare` butuh source;
# `nuxt generate` menjalankan prepare sendiri.
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --ignore-scripts --no-audit --no-fund

COPY . .
ARG NUXT_PUBLIC_SITE_URL=https://fungetgo.com
ARG NUXT_PUBLIC_GA_ID=
ENV NUXT_PUBLIC_SITE_URL=$NUXT_PUBLIC_SITE_URL \
    NUXT_PUBLIC_GA_ID=$NUXT_PUBLIC_GA_ID
RUN npx nuxt generate

# 2) Runtime: hanya file statis + Nginx non-root (port 8080)
FROM nginxinc/nginx-unprivileged:stable-alpine
LABEL org.opencontainers.image.title="funtravel" \
      org.opencontainers.image.description="FUN TRAVEL & TRANSPORT PT. FUN BATAM HOLIDAY" \
      org.opencontainers.image.vendor="Bidtech"
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/.output/public /usr/share/nginx/html

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
