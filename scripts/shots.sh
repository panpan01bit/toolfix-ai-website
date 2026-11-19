#!/usr/bin/env bash
# Screenshot pages from the local preview server for visual QA.
set -euo pipefail
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="${1:-/tmp/shots}"
mkdir -p "$OUT"
shift || true
PAGES=("$@")
if [ ${#PAGES[@]} -eq 0 ]; then
  PAGES=( "" "product/" "technology/" "demo/" "pricing/" "market/" "investors/" "company/" "faq/" "zh/" "privacy/" )
fi
for p in "${PAGES[@]}"; do
  name=$(echo "${p:-home}" | tr '/' '_' | sed 's/_$//')
  "$CHROME" --headless=new --user-data-dir=/tmp/chromeprof --disable-gpu --hide-scrollbars \
    --window-size=1440,7000 --virtual-time-budget=6000 \
    --screenshot="$OUT/$name.png" "http://127.0.0.1:4173/$p" >/dev/null 2>&1
  echo "  $name"
done
