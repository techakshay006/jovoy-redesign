#!/usr/bin/env bash
# One-time setup: GitHub (techakshay006) + push + Vercel link
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

GITHUB_USER="techakshay006"
REPO_NAME="jovoy-redesign"
EMAIL="akshayec1006@gmail.com"
SSH_KEY="$HOME/.ssh/id_ed25519"
REMOTE="git@github.com:${GITHUB_USER}/${REPO_NAME}.git"

echo "═══════════════════════════════════════════════════════════"
echo "  Jovoy deploy setup — GitHub: ${GITHUB_USER}"
echo "═══════════════════════════════════════════════════════════"
echo ""

# ── 1. SSH key ──────────────────────────────────────────────
mkdir -p "$HOME/.ssh"
chmod 700 "$HOME/.ssh"

if [[ ! -f "$SSH_KEY" ]]; then
  echo "→ Creating SSH key for GitHub..."
  ssh-keygen -t ed25519 -C "$EMAIL" -f "$SSH_KEY" -N ""
else
  echo "→ SSH key already exists: $SSH_KEY"
fi

echo ""
echo "━━━ COPY THIS KEY TO GITHUB ━━━"
echo "Open: https://github.com/settings/ssh/new"
echo "Title: MacBook Air"
echo "Key type: Authentication Key"
echo ""
cat "${SSH_KEY}.pub"
echo ""
echo "Press Enter after you've added the key on GitHub..."
read -r

# ── 2. Test GitHub SSH ──────────────────────────────────────
echo "→ Testing GitHub SSH..."
ssh -T "git@${GITHUB_HOST:-github.com}" 2>&1 || true
echo ""

# ── 3. Create repo reminder ─────────────────────────────────
echo "→ Create empty repo (if not done yet):"
echo "   https://github.com/new?name=${REPO_NAME}&owner=${GITHUB_USER}"
echo "   ✓ Empty — no README, no .gitignore"
echo ""
echo "Press Enter after the repo exists on GitHub..."
read -r

# ── 4. Git remote + push ────────────────────────────────────
if [[ ! -d .git ]]; then
  git init
fi

git branch -M main

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE"
else
  git remote add origin "$REMOTE"
fi

git add -A
if ! git diff --cached --quiet; then
  git commit -m "Add Jovoy homepage redesign and owner pitch landing page"
fi

echo "→ Pushing to ${REMOTE}..."
git push -u origin main

echo ""
echo "✓ Code pushed to https://github.com/${GITHUB_USER}/${REPO_NAME}"
echo ""
echo "━━━ CONNECT VERCEL TO GITHUB ━━━"
echo "1. Open: https://vercel.com/new"
echo "2. Sign in with GitHub (account: ${GITHUB_USER})"
echo "3. Import repo: ${GITHUB_USER}/${REPO_NAME}"
echo "4. Click Deploy (settings are in vercel.json)"
echo ""
echo "After deploy:"
echo "  Demo:  https://${REPO_NAME}.vercel.app/"
echo "  Pitch: https://${REPO_NAME}.vercel.app/pitch"
echo ""

# Open helpful pages on macOS
if command -v open >/dev/null 2>&1; then
  open "https://github.com/settings/ssh/new"
  open "https://github.com/new?name=${REPO_NAME}&owner=${GITHUB_USER}"
  open "https://vercel.com/new"
fi
