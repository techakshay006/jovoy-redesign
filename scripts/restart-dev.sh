#!/usr/bin/env bash
# Restarts the dev server on port 5173 only (kills old Vite/Node listeners).
set -euo pipefail

for port in 5173 5174 5175 4173; do
  lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null | while read -r pid; do
    kill -9 "$pid" 2>/dev/null && echo "Stopped process $pid on port $port"
  done
done

sleep 1
cd "$(dirname "$0")/.."
echo "Starting on http://127.0.0.1:5173/"
npm run dev
