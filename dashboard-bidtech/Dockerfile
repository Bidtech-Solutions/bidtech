# syntax=docker/dockerfile:1

# ---- Stage 1: composer dependencies -------------------------------------
FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
# COMPOSER_AUTH (opsional) dikirim sebagai build secret, bukan ARG/ENV, jadi token tidak tersimpan di image.
# Di CI berisi token GitHub agar unduhan paket dari api.github.com tidak dibatasi/diputus
# (unduhan anonim dari runner sering timeout: curl error 28/56 -> composer exit code 100).
RUN --mount=type=secret,id=composer_auth,env=COMPOSER_AUTH \
    composer install --no-dev --no-interaction --no-progress --prefer-dist --no-scripts
COPY . .
RUN composer dump-autoload --no-dev --optimize --no-interaction

# ---- Stage 2: frontend assets (Vite) -------------------------------------
FROM node:24-alpine AS assets
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Stage 3: runtime ------------------------------------------------------
FROM php:8.4-fpm-alpine AS runtime

RUN apk add --no-cache \
        nginx \
        supervisor \
        libxml2 \
        oniguruma \
        curl \
    && apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        libxml2-dev \
        oniguruma-dev \
    && docker-php-ext-install pdo_mysql mbstring bcmath xml dom fileinfo \
    && apk del --no-cache .build-deps

WORKDIR /var/www/html

COPY . .
COPY --from=vendor /app/vendor ./vendor
COPY --from=vendor /app/bootstrap/cache ./bootstrap/cache
COPY --from=assets /app/public/build ./public/build

COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/uploads.ini /usr/local/etc/php/conf.d/uploads.ini
COPY docker/supervisord.conf /etc/supervisor/supervisord.conf
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh \
    && mkdir -p /run/nginx \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD wget -qO- http://127.0.0.1:8080/up || exit 1

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
