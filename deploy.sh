#!/usr/bin/env bash
# Manual deploy (fallback). Normally you don't need this: pushing to `main`
# triggers .github/workflows/gh-pages.yml, which builds and publishes to gh-pages.
#
# This script builds locally and force-pushes ./public to the gh-pages branch
# using a temporary git worktree.
set -euo pipefail
cd "$(dirname "$0")"

echo "Building site..."
node build.mjs

TMP="$(mktemp -d)"
echo "Deploying ./public to gh-pages..."
git fetch origin gh-pages || true
git worktree add --force "$TMP" gh-pages 2>/dev/null || git worktree add --force -B gh-pages "$TMP" origin/gh-pages

# replace contents (keep .git)
find "$TMP" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -R public/. "$TMP"/

( cd "$TMP"
  git add -A
  git commit -m "Deploy site $(date +%Y-%m-%d)" || echo "No changes to deploy."
  git push origin gh-pages )

git worktree remove --force "$TMP"
echo "Done. Live at https://s-mishra.github.io and https://www.smishra.dev"
