#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

REPO="https://github.com/techakshay006/jovoy-redesign.git"

echo "→ Preparing git repo in $ROOT"

if [[ ! -d .git ]]; then
  rm -rf .git 2>/dev/null || true
  git init
fi

git add -A

if git diff --cached --quiet; then
  echo "→ Nothing new to commit (working tree clean)"
else
  git commit -m "Add Jovoy homepage redesign and owner pitch landing page"
fi

git branch -M main

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REPO"
else
  git remote add origin "$REPO"
fi

echo "→ Pushing to $REPO"
if git ls-remote --exit-code origin main >/dev/null 2>&1; then
  git pull origin main --rebase --allow-unrelated-histories || git pull origin main --rebase
fi

git push -u origin main

echo ""
echo "Done. Vercel will auto-deploy if the project is linked."
echo "  Demo:  https://jovoy-redesign.vercel.app/"
echo "  Pitch: https://jovoy-redesign.vercel.app/pitch"
