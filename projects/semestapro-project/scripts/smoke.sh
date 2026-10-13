#!/usr/bin/env bash
# Smoke test: every path must answer HTTP 200 (after redirects) within the retry window.
# Usage: scripts/smoke.sh <base-url> [path ...]     (default paths: /healthz /)
set -euo pipefail

base="${1:?usage: smoke.sh <base-url> [path ...]}"; shift || true
paths=("$@"); [ ${#paths[@]} -gt 0 ] || paths=(/healthz /)
retries="${SMOKE_RETRIES:-30}"; delay="${SMOKE_DELAY:-2}"
fail=0

for p in "${paths[@]}"; do
  ok=0
  for ((i = 1; i <= retries; i++)); do
    code=$(curl -s -o /dev/null -L --max-time 10 -w '%{http_code}' "${base%/}${p}" || true)
    if [ "$code" = "200" ]; then ok=1; break; fi
    sleep "$delay"
  done
  if [ "$ok" = 1 ]; then echo "OK    ${p}"; else echo "FAIL  ${p} (last status: ${code:-none})"; fail=1; fi
done

exit $fail
