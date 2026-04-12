# 🔧 Fix Déploiement - Code à jour

## Problème
Le code sur Render n'est pas à jour malgré le déploiement.

## Solution : Recréer le service

1. **Va sur** : https://dashboard.render.com/web/srv-d7da6gt7vvec73entcag/settings
2. **Tout en bas** : Clique **"Delete Service"**
3. **Confirme** la suppression

4. **Crée un nouveau service** :
   - Clique **"New +"** → **"Web Service"**
   - Choisis **"Build and deploy from a Git repository"**
   - Connecte **juniorbakola-source/voc-flow-control**

5. **Configuration** :
   ```
   Name: voc-telegram-bot
   Region: Frankfurt (EU)
   Branch: main
   Build Command: cd telegram-bot && npm install
   Start Command: cd telegram-bot && npm start
   Plan: Free
   ```

6. **Environment Variables** :
   ```
   TELEGRAM_BOT_TOKEN = 8751443450:AAHnAcsWdzY38XJFwoFgBNWcH6sJzlabVvY
   ```

7. **Clique "Create Web Service"**

8. **Attends** que le déploiement finisse (~2 min)

9. **Configure le webhook** :
   ```
   https://api.telegram.org/bot8751443450:AAHnAcsWdzY38XJFwoFgBNWcH6sJzlabVvY/setWebhook?url=https://voc-telegram-bot-XXX.onrender.com/webhook
   ```
   (Remplace XXX par ce que Render te donne)

10. **Teste** sur Telegram :
    ```
    /team créer une app React
    ```

## Alternative : Hard Refresh

Si tu veux garder le même service :
1. **Settings** → **Environment**
2. **Change** une variable (ajoute `FORCE=1`)
3. **Save** → **Manual Deploy** → **Deploy Latest Commit**
4. **Supprime** la variable `FORCE`
5. **Redeploy** encore une fois
