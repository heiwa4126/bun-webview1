#!/usr/bin/env bash
set -euo pipefail

BUN_CHROME_PATH=$(find ~/.cache/ms-playwright -type f -name chrome-headless-shell 2>/dev/null | sort -V | tail -1)

if [[ -z "$BUN_CHROME_PATH" ]]; then
  echo "Error: chrome-headless-shell が見つかりませんでした (BUN_CHROME_PATH is empty)" >&2
  exit 1
fi

echo "BUN_CHROME_PATH=\"$BUN_CHROME_PATH\"" >> .env
