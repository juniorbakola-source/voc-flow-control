# 🚀 Déployer VOC Agents sur Telegram

## Option 1 : Render (Recommandé - Gratuit)

### Étape 1 : Préparer le token
1. Récupère ton token Telegram bot
2. Si tu utilises @henri3Pbot, le token est dans ta config OpenClaw
3. Ou crée un nouveau bot via [@BotFather](https://t.me/botfather)

### Étape 2 : Créer sur Render
1. Va sur [render.com](https://render.com) et connecte-toi avec GitHub
2. Clique **"New +"** → **"Web Service"**
3. Choisis le repo `juniorbakola-source/voc-flow-control`
4. Configure :
   - **Name**: `voc-telegram-bot`
   - **Environment**: `Node`
   - **Build Command**: `cd telegram-bot && npm install`
   - **Start Command**: `cd telegram-bot && npm start`
5. Clique **"Advanced"** et ajoute la variable d'environnement :
   - `TELEGRAM_BOT_TOKEN` = ton token
6. Clique **"Create Web Service"**

### Étape 3 : Configurer le webhook
1. Attends que le déploiement soit terminé (2-3 min)
2. Copie l'URL générée (ex: `https://voc-telegram-bot.onrender.com`)
3. Dans ton navigateur, ouvre :
   ```
   https://api.telegram.org/bot<TON_TOKEN>/setWebhook?url=https://voc-telegram-bot.onrender.com/webhook
   ```
4. Tu dois voir : `{"ok":true,"result":true,"description":"Webhook was set"}`

### Étape 4 : Tester !
1. Va sur Telegram, cherche ton bot (@henri3Pbot ou ton nouveau bot)
2. Envoie `/start`
3. Tu dois voir le message de bienvenue !

---

## Option 2 : Local (pour tester)

```bash
cd /home/openclaw/.openclaw/workspace/voc-flow-control/telegram-bot
npm install
export TELEGRAM_BOT_TOKEN=ton_token
npm run poll
```

Le bot écoute localement et répond instantanément.

---

## 📝 Commandes disponibles

| Commande | Description |
|----------|-------------|
| `/start` | Démarrer le bot |
| `/agents` | Voir les 4 agents |
| `/status` | Status du système |
| `/help` | Aide |

## 🎯 Utiliser les agents

**Par mention :**
```
@aria créer un bouton React
@kael API pour users  
@sentry vérifier mon auth
@fixer j'ai une erreur useEffect
```

**Par mots-clés (auto-routing) :**
```
"Bug avec useState" → Fixer
"Docker compose" → Kael
"CSS grid" → Aria
"Vulnérabilité" → Sentry
```
