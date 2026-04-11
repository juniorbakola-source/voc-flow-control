# ⚡ Quickstart - VOC Agents sur Telegram

## Option A: Utiliser @henri3Pbot (bot existant)

Si tu veux utiliser le bot existant @henri3Pbot :

```bash
# 1. Récupère le token depuis ton fichier openclaw.json
# (Remplace par ton vrai token)
TOKEN="8751443450:AAHnAcsWdzY38XJFwoFgBNWcH6sJzlabVvY"

# 2. Lance le déploiement
./deploy-telegram.sh "$TOKEN"
```

## Option B: Créer un nouveau bot (Recommandé)

1. **Va sur Telegram** → Cherche **@BotFather**
2. **Envoie** : `/newbot`
3. **Nom du bot** : `VOC Agents`
4. **Username** : `voc_agents_bot` (doit finir par _bot)
5. **Copie le token** (ex: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)
6. **Lance** :

```bash
./deploy-telegram.sh "TON_TOKEN_ICI"
```

## 🎯 Ce que le script fait

✅ Vérifie que le token est valide  
✅ Crée le fichier .env  
✅ Installe les dépendances  
✅ Teste le bot (envoie un message)  
✅ Génère les instructions pour Render  

## 🌐 Déploiement sur Render (Gratuit)

Le script crée un fichier `render-deploy-ready.txt` avec toutes les instructions.

**En résumé:**
1. Va sur https://render.com
2. New + → Web Service
3. Connecte ton repo GitHub
4. Ajoute la variable d'environnement `TELEGRAM_BOT_TOKEN`
5. Crée → Attends 2 min
6. Configure le webhook
7. ✅ C'est en ligne !

## 📱 Utiliser le bot

Une fois déployé, envoie à ton bot :

```
/start          → Message de bienvenue
/agents         → Voir les 4 agents
@aria ...       → Parler à Aria (Frontend)
@kael ...       → Parler à Kael (Backend)
@sentry ...     → Parler à Sentry (Security)
@fixer ...      → Parler à Fixer (Debug)
```

## 🔧 Test local (avant déploiement)

```bash
cd telegram-bot
npm install
export TELEGRAM_BOT_TOKEN="TON_TOKEN"
npm run poll
```

Le bot répond instantanément sur Telegram.
