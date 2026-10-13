#!/usr/bin/env python3
"""Render a deployment .env from .env.example plus overrides.

Usage: render_env.py <profile> <template> <output>
  profile  "ci" (throw-away values for the test container) or "prod" (reads secrets
           and variables from the process environment).

Values are written single-quoted, which Docker Compose's env_file treats as literal
(no $-interpolation). Values containing a newline or a single quote are rejected.
Never prints secret values.
"""
import os
import sys
from pathlib import Path


def need(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        sys.exit(f"render_env: required value {name} is empty or missing")
    return value


def optional(name: str, default: str) -> str:
    return os.environ.get(name, "").strip() or default


def overrides_ci() -> dict:
    return {
        "APP_ENV": "production",
        "APP_DEBUG": "false",
        "APP_HOST": "0.0.0.0",  # must listen on all interfaces inside the container
        "APP_PORT": "3000",
        "APP_KEY": "0123456789abcdef0123456789abcdef",  # throw-away, CI only
        "APP_URL": "http://127.0.0.1:3000",
        "DB_DATABASE": "storage/database/semestapro.db",
        # The S3 driver rejects empty config at boot; the CI smoke test never touches storage.
        "MEDIA_KEY": "ci-key",
        "MEDIA_SECRET": "ci-secret",
        "MEDIA_ENDPOINT": "http://127.0.0.1:9000",
        "MEDIA_URL": "http://127.0.0.1:9000/semestapro-media",
    }


def overrides_prod() -> dict:
    app_key = need("APP_KEY")
    if len(app_key) != 32:
        sys.exit("render_env: APP_KEY must be exactly 32 characters (Goravel, not Laravel: no base64: prefix). Generate: openssl rand -hex 16")
    return {
        "APP_ENV": "production",
        "APP_DEBUG": "false",
        "APP_KEY": app_key,
        "APP_HOST": "0.0.0.0",  # must listen on all interfaces inside the container
        "APP_PORT": "3000",
        "APP_URL": optional("APP_URL", "https://semestapro.co.id"),
        "LOG_LEVEL": "info",
        "DB_DATABASE": "storage/database/semestapro.db",
        "SESSION_SECURE": "true",
        "MEDIA_KEY": need("MEDIA_KEY"),
        "MEDIA_SECRET": need("MEDIA_SECRET"),
        "MEDIA_ENDPOINT": optional("MEDIA_ENDPOINT", "https://cdn.semestapro.co.id"),
        "MEDIA_BUCKET": optional("MEDIA_BUCKET", "semestapro-media"),
        "MEDIA_REGION": optional("MEDIA_REGION", "us-east-1"),
        "MEDIA_URL": optional("MEDIA_URL", "https://cdn.semestapro.co.id/semestapro-media"),
        "MEDIA_USE_PATH_STYLE": "true",
        # Read by docker-compose.prod.yml for variable substitution.
        "APP_IMAGE": need("APP_IMAGE"),
        "APP_TAG": need("APP_TAG"),
        # Optional business overrides (empty = keep the value from .env.example / config/site.go).
        **{k: os.environ[k].strip() for k in ("SITE_WHATSAPP", "SITE_PHONE_DISPLAY", "SITE_EMAIL", "SECURITY_CONTACT")
           if os.environ.get(k, "").strip()},
    }


def quote(key: str, value: str) -> str:
    if "\n" in value or "\r" in value or "'" in value:
        sys.exit(f"render_env: value for {key} contains a newline or single quote")
    return f"'{value}'"


def main() -> None:
    if len(sys.argv) != 4 or sys.argv[1] not in ("ci", "prod"):
        sys.exit(__doc__)
    profile, template, output = sys.argv[1], Path(sys.argv[2]), Path(sys.argv[3])
    overrides = overrides_ci() if profile == "ci" else overrides_prod()

    out, seen = [], set()
    for line in template.read_text().splitlines():
        key = line.split("=", 1)[0].strip() if "=" in line and not line.lstrip().startswith("#") else None
        if key in overrides:
            out.append(f"{key}={quote(key, overrides[key])}")
            seen.add(key)
        else:
            out.append(line)
    for key, value in overrides.items():
        if key not in seen:
            out.append(f"{key}={quote(key, value)}")

    output.write_text("\n".join(out) + "\n")
    output.chmod(0o600)
    print(f"render_env: wrote {output} ({len(overrides)} keys overridden)")


if __name__ == "__main__":
    main()
