#!/bin/bash
#
# start-interface.sh - Démarrage de l'interface graphique
#

cd "$(dirname "$0")/../interface"

if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

echo "🎨 Démarrage de l'interface VOC Flow Control..."
echo "Accès : http://localhost:3000"
echo ""

npm run dev
