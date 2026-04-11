# 🤖 VOC Telegram Bot

Multi-agent system deployed on Telegram.

## 🚀 Démarrage rapide

### 1. Configuration

```bash
cd telegram-bot
npm install
```

Crée un fichier `.env`:
```env
TELEGRAM_BOT_TOKEN=ton_token_bot
PORT=3001
```

### 2. Mode Polling (Recommandé pour tester)

```bash
npm run poll
```

Le bot écoute les messages en temps réel.

### 3. Mode Webhook (Production)

```bash
# Besoin d'un domaine public (Render, Railway, VPS)
export WEBHOOK_URL=https://ton-app.render.com
npm start
```

## 📱 Utilisation

### Commandes

| Commande | Description |
|----------|-------------|
| `/start` | Démarrer le bot |
| `/agents` | Liste des agents |
| `/status` | Status système |
| `/help` | Aide |

### Interagir avec les agents

**Mention explicite :**
```
@aria comment créer un modal en React ?
@kael API pour gérer des utilisateurs
@sentry vérifier mon auth
@fixer j'ai une erreur useEffect
```

**Auto-routing (par mots-clés) :**
```
"J'ai un bug avec useState" → 🔍 Fixer
"Créer une API REST" → ⚙️ Kael
"Problème de sécurité" → 🔒 Sentry
"CSS qui ne s'affiche pas" → 🎨 Aria
```

## 🏗️ Architecture

```
User Message
     ↓
Telegram API
     ↓
VOC Bot (Express)
     ↓
Router intelligent
     ↓
Agent spécifique (Aria/Kael/Sentry/Fixer)
     ↓
Réponse structurée
```

## 🔧 Déploiement

### Render (Gratuit)

1. Crée un compte sur [render.com](https://render.com)
2. New Web Service → Connecte ton repo
3. Configure:
   - Build: `cd telegram-bot && npm install`
   - Start: `npm start`
   - Env: `TELEGRAM_BOT_TOKEN`, `WEBHOOK_URL`

### Railway (Gratuit)

```bash
railway login
railway init
railway up
```

### VPS perso

```bash
# PM2 pour production
npm install -g pm2
pm2 start telegram-bot/index.js --name voc-bot
pm2 save
pm2 startup
```

## 🔗 Intégration AI

Pour connecter un vrai modèle AI (GPT-4, Claude, etc.), modifie `generateAgentResponse()` dans `index.js`:

```javascript
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: AGENT_PROMPTS[agentId] },
    { role: 'user', content: message }
  ]
});
```

## 📝 Todo

- [ ] Intégrer OpenAI/Gemini pour réponses intelligentes
- [ ] Mode conversation (contexte persistant)
- [ ] Génération de code inline
- [ ] Analyse de fichiers (images, PDF)
- [ ] Notifications push depuis GitHub Actions
