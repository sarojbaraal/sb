#!/usr/bin/env bash
# Renders public/cv/Saroj-Baral-CV.pdf from the /cv-print page (single source: src/data/*.json).
# Usage: bash scripts/build-cv.sh   (needs google-chrome and python3)
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build >/dev/null
TMP="$(mktemp -d)"
cp -r dist "$TMP/site"
PORT="$(python3 -c 'import socket; s=socket.socket(); s.bind(("",0)); print(s.getsockname()[1])')"
python3 -m http.server "$PORT" --directory "$TMP/site" >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true; rm -rf "$TMP"' EXIT
sleep 1
google-chrome --headless=new --no-sandbox --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=5000 --print-to-pdf=public/cv/Saroj-Baral-CV.pdf \
  "http://localhost:$PORT/cv-print/" >/dev/null 2>&1
echo "Wrote public/cv/Saroj-Baral-CV.pdf"
