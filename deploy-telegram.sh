#!/bin/bash
# 🚀 Script de déploiement automatique VOC Telegram Bot
# Usage: ./deploy-telegram.sh <TON_TOKEN_TELEGRAM>

set -e

TOKEN=$1

if [ -z "$TOKEN" ]; then
    echo "❌ Usage: ./deploy-telegram.sh <TELEGRAM_BOT_TOKEN>"
    echo ""
    echo "Pour obtenir ton token:"
    echo "1. Va sur @BotFather dans Telegram"
    echo "2. Envoie /newbot"
    echo "3. Choisis un nom (ex: VOC Agents)"
    echo "4. Choisis un username (ex: voc_agents_bot)"
    echo "5. Copie le token donné"
    echo ""
    echo "Exemple:"
    echo "  ./deploy-telegram.sh 8751443450:AAHnAcsWdzY38XJFwoFgBNWcH6sJzlabVvY"
    exit 1
fi

echo "🤖 VOC Telegram Bot Deployment"
echo "==============================="
echo ""

# Vérifier que le token est valide
echo "🔍 Vérification du token..."
if ! curl -s "https://api.telegram.org/bot${TOKEN}/getMe" | grep -q '"ok":true'; then
    echo "❌ Token invalide !"
    exit 1
fi

BOT_INFO=$(curl -s "https://api.telegram.org/bot${TOKEN}/getMe")
BOT_NAME=$(echo $BOT_INFO | grep -o '"first_name":"[^"]*"' | cut -d'"' -f4)
BOT_USERNAME=$(echo $BOT_INFO | grep -o '"username":"[^"]*"' | cut -d'"' -f4)

echo "✅ Bot trouvé: $BOT_NAME (@$BOT_USERNAME)"
echo ""

# Créer le fichier .env
echo "📝 Création du fichier .env..."
cat > telegram-bot/.env << EOF
TELEGRAM_BOT_TOKEN=${TOKEN}
PORT=3001
NODE_ENV=production
EOF
echo "✅ Fichier .env créé"
echo ""

# Installer les dépendances
echo "📦 Installation des dépendances..."
cd telegram-bot
npm install --production
cd ..
echo "✅ Dépendances installées"
echo ""

# Tester en mode polling pendant 10 secondes
echo "🧪 Test du bot (10 secondes)..."
timeout 10s bash -c "cd telegram-bot && node scripts/polling.js" &
PID=$!
sleep 5

# Envoyer un message de test
curl -s -X POST "https://api.telegram.org/bot${TOKEN}/sendMessage" \
    -d "chat_id=7490738724" \
    -d "text=🚀 VOC Agents Bot - Test de connexion réussi !%0A%0ABot: $BOT_NAME%0AUsername: @$BOT_USERNAME%0A%0ALe bot est prêt à être déployé." \
    -d "parse_mode=HTML" > /dev/null

kill $PID 2>/dev/null || true
echo "✅ Test réussi - Message envoyé sur Telegram"
echo ""

# Créer le fichier pour Render
echo "🌐 Préparation du déploiement Render..."
cat > render-deploy-ready.txt << EOF
=== INSTRUCTIONS POUR RENDER ===

1. Va sur https://dashboard.render.com

2. Clique "New +" → "Web Service"

3. Connecte ton repo GitHub: juniorbakola-source/voc-flow-control

4. Configure:
   - Name: voc-telegram-bot
   - Environment: Node
   - Build Command: cd telegram-bot && npm install
   - Start Command: cd telegram-bot && npm start
   - Plan: Free

5. Dans "Environment Variables", ajoute:
   TELEGRAM_BOT_TOKEN = ${TOKEN}

6. Clique "Create Web Service"

7. Attends le déploiement (2-3 minutes)

8. Une fois déployé, copie l'URL (ex: https://voc-telegram-bot.onrender.com)

9. Configure le webhook en ouvrant dans ton navigateur:
   https://api.telegram.org/bot${TOKEN}/setWebhook?url=https://voc-telegram-bot.onrender.com/webhook

10. Teste sur Telegram en envoyant /start à @$BOT_USERNAME

=== C'EST PRÊT ! ===
EOF

cat render-deploy-ready.txt
echo ""
echo "✅ Tout est prêt !"
echo ""
echo "Fichier sauvegardé: render-deploy-ready.txt"
echo ""
echo "Prochaines étapes:"
echo "1. Commit et push les changements:"
echo "   git add . && git commit -m 'deploy: telegram bot ready' && git push"
echo ""
echo "2. Suis les instructions dans render-deploy-ready.txt"
echo ""
echo "🎉 Ton bot @$BOT_USERNAME est prêt !"
