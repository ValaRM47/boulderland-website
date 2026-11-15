#!/usr/bin/env bash
#
# deploy.sh — upload the Boulderland landing page to your cPanel host over FTP/FTPS.
#
# One-time setup:
#   1. Copy .deploy.env.example to .deploy.env
#   2. Fill in your FTP credentials (from cPanel → "FTP Accounts")
#   3. Run:  ./deploy.sh          (uploads landingB.html)
#            ./deploy.sh --assets (also uploads the images/logo)
#
# Nothing here is stored in the repo — .deploy.env is git-ignored and stays on your Mac.

set -euo pipefail
cd "$(dirname "$0")"

ENV_FILE=".deploy.env"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "✗ Missing $ENV_FILE — copy .deploy.env.example to .deploy.env and fill it in."
  exit 1
fi
# shellcheck disable=SC1090
source "$ENV_FILE"

: "${FTP_HOST:?set FTP_HOST in .deploy.env}"
: "${FTP_USER:?set FTP_USER in .deploy.env}"
: "${FTP_PASS:?set FTP_PASS in .deploy.env}"
REMOTE_DIR="${REMOTE_DIR:-/public_html/wp-content}"
FTP_SCHEME="${FTP_SCHEME:-ftp}"          # "ftp" (with TLS via --ssl) or "ftps"
USE_TLS="${USE_TLS:-yes}"                # yes = require encryption (recommended)

# Build the curl options
CURL_OPTS=(--fail --show-error --silent --ftp-create-dirs --user "${FTP_USER}:${FTP_PASS}")
[[ "$USE_TLS" == "yes" ]] && CURL_OPTS+=(--ssl-reqd)

# Ensure a single trailing slash on the remote dir
REMOTE_DIR="${REMOTE_DIR%/}/"
BASE_URL="${FTP_SCHEME}://${FTP_HOST}${REMOTE_DIR}"

upload() {
  local file="$1"
  if [[ ! -f "$file" ]]; then
    echo "  – skipped (not found): $file"
    return
  fi
  printf "  → %-16s" "$file"
  curl "${CURL_OPTS[@]}" -T "$file" "${BASE_URL}"
  echo "ok"
}

echo "Deploying to ${FTP_HOST}${REMOTE_DIR}"
upload "landingB.html"

if [[ "${1:-}" == "--assets" ]]; then
  echo "Uploading assets…"
  for f in logo.svg hero.webp kasra-2.webp Lead-wall.webp Melika-1.webp boy.webp mammad.webp; do
    upload "$f"
  done
fi

echo "✓ Done."
