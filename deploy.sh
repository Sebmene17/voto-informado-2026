#!/bin/bash
# deploy.sh — Script para subir a GitHub Pages
# Uso: ./deploy.sh

echo "🗳️  Voto Informado 2026 — Deploy a GitHub Pages"

# 1. Build
echo "📦 Construyendo frontend..."
npm run build

# 2. Check if gh-pages branch exists and deploy
echo "🚀 Subiendo a gh-pages..."
cd dist

git init
git add -A
git commit -m "Deploy Voto Informado 2026 - $(date '+%Y-%m-%d %H:%M')"
git branch -M gh-pages
git remote add origin git@github.com:TU_USUARIO/voto-informado-2026.git
git push -f origin gh-pages

cd ..
echo "✅ Deploy completo."
echo "🌐 En 1-2 minutos estará disponible en:"
echo "   https://TU_USUARIO.github.io/voto-informado-2026"
