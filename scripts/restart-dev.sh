#!/usr/bin/env bash
# Frees Vite ports and starts dev on http://127.0.0.1:5173/
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

for port in 5173 5174 5175 4173; do
  for attempt in 1 2 3; do
    pids=$(lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null || true)
    [ -z "$pids" ] && break
    echo "Stopping process(es) on port $port: $pids (attempt $attempt)"
    kill -9 $pids 2>/dev/null || true
    sleep 0.4
  done
done

if lsof -tiTCP:5173 -sTCP:LISTEN >/dev/null 2>&1; then
  echo ""
  echo "Port 5173 is still in use — Vite will use the next free port (5174, 5175, …)."
  echo "To free 5173 manually: kill -9 \$(lsof -tiTCP:5173 -sTCP:LISTEN)"
  echo ""
else
  echo "Starting on http://127.0.0.1:5173/ (pitch: http://127.0.0.1:5173/pitch)"
fi

exec npx vite
