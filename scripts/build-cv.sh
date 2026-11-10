#!/usr/bin/env bash
# Renders the four CV PDFs from the /cv-print/<format>/ pages (single source: src/data/*.json).
# CI runs this on every deploy; locally: bash scripts/build-cv.sh  (needs google-chrome and python3).
# Usage: build-cv.sh [dist-dir] [base-path]   defaults: dist  and  $BASE_PATH (or empty)
set -euo pipefail
cd "$(dirname "$0")/.."
DIST="${1:-dist}"
BASE="${2:-${BASE_PATH:-}}"; BASE="${BASE%/}"
[ -d "$DIST" ] || { echo "Run npm run build first ($DIST missing)"; exit 1; }
OUT="$DIST/cv"; mkdir -p "$OUT"
TMP="$(mktemp -d)"
mkdir -p "$TMP/srv$BASE"
cp -r "$DIST"/. "$TMP/srv$BASE/"
PORT="$(python3 -c 'import socket; s=socket.socket(); s.bind(("",0)); print(s.getsockname()[1])')"
python3 -m http.server "$PORT" --directory "$TMP/srv" >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true; rm -rf "$TMP"' EXIT
sleep 1
CHROME="$(command -v google-chrome || command -v google-chrome-stable || command -v chromium || command -v chromium-browser)"
build() { # format id, output file
  "$CHROME" --headless=new --no-sandbox --disable-gpu --no-pdf-header-footer --virtual-time-budget=5000 \
    --print-to-pdf="$OUT/$2" "http://localhost:$PORT$BASE/cv-print/$1/" >/dev/null 2>&1
  [ -s "$OUT/$2" ] || { echo "Failed: $2"; exit 1; }
  echo "Wrote $OUT/$2"
}
build snapshot Saroj-Baral-Professional-Snapshot.pdf
build resume   Saroj-Baral-Modern-Resume.pdf
build europass Saroj-Baral-Europass-CV.pdf
build full-cv  Saroj-Baral-Full-CV.pdf
