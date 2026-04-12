/**
 * VOC Flow Control - Telegram Bot
 * Multi-agent system avec analyse collaborative
 */

const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const PORT = process.env.PORT || 3001;

if (!BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN is required');
  process.exit(1);
}

// Agents avec leurs réponses spécifiques
const AGENTS = {
  aria: {
    name: 'Aria',
    emoji: '🎨',
    role: 'Frontend Specialist',
    keywords: ['react', 'css', 'ui', 'frontend', 'component', 'html', 'vue', 'angular', 'tailwind', 'styled', 'button', 'modal', 'form'],
    response: (msg) => {
      if (msg.includes('button') || msg.includes('bouton')) {
        return `🎨 *Aria* — Frontend Specialist

Voici un composant bouton React complet :

\`\`\`tsx
import { useState } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  onClick?: () => void;
}

export const Button = ({ children, variant = 'primary', loading, onClick }: ButtonProps) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={\`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 \${variants[variant]}\`}
    >
      {loading ? 'Chargement...' : children}
    </button>
  );
};
\`\`\`

💡 *Conseil Aria* : Utilise \`variants\` pour centraliser les styles, et n'oublie pas les états \`disabled\` et \`loading\` pour l'UX !`;
      }
      if (msg.includes('css') || msg.includes('style')) {
        return `🎨 *Aria* — Frontend Specialist

Pour du CSS moderne et maintenable :

✅ *Préfère Tailwind CSS* :
\`\`\`html
<div class="flex items-center justify-center p-4 bg-white rounded-lg shadow-md">
  <h1 class="text-2xl font-bold text-gray-800">Titre</h1>
</div>
\`\`\`

✅ *Ou CSS Modules* pour éviter les conflits :
\`\`\`css
/* Button.module.css */
.button { padding: 8px 16px; border-radius: 4px; }
.primary { background: blue; color: white; }
\`\`\`

❌ Évite les styles inline et les !important

💡 *Tip Aria* : Mobile-first avec les breakpoints Tailwind !`;
      }
      return `🎨 *Aria* — Frontend Specialist

Je suis là pour t'aider avec :
• React / Vue / Angular
• CSS / Tailwind / Styled Components  
• UI/UX et design system
• Accessibilité (a11y)
• Performance frontend

Que veux-tu créer ou optimiser ? Décris-moi ton besoin !`;
    }
  },
  kael: {
    name: 'Kael',
    emoji: '⚙️',
    role: 'Backend Specialist',
    keywords: ['api', 'database', 'server', 'backend', 'docker', 'node', 'sql', 'mongodb', 'postgres', 'express', 'auth', 'jwt'],
    response: (msg) => {
      if (msg.includes('api')) {
        return `⚙️ *Kael* — Backend Specialist

Structure d'API REST propre avec Express :

\`\`\`ts
// routes/auth.ts
import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.post('/login', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  validate
], AuthController.login);

router.post('/register', [
  body('email').isEmail(),
  body('password').isStrongPassword(),
  validate
], AuthController.register);

export default router;
\`\`\`

⚙️ *Architecture Kael* :
• Routes → Controllers → Services → Repositories
• Validation avec express-validator
• JWT pour l'auth
• Rate limiting pour la sécurité

Besoin d'un endpoint spécifique ?`;
      }
      if (msg.includes('auth') || msg.includes('jwt')) {
        return `⚙️ *Kael* — Backend Specialist

Authentification JWT complète :

\`\`\`ts
// services/auth.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class AuthService {
  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid password');
    
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );
    
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );
    
    return { token, refreshToken };
  }
}
\`\`\`

🔐 *Sécurité Kael* :
• Access token court (15 min)
• Refresh token long (7 jours)
• Hash bcrypt avec salt (10+)
• HttpOnly cookies

Tu veux l'implémentation complète ?`;
      }
      return `⚙️ *Kael* — Backend Specialist

Je maîtrise :
• APIs REST / GraphQL
• Bases de données (SQL/NoSQL)
• Docker & Kubernetes
• Architecture microservices
• CI/CD & DevOps

Quel est ton besoin backend ?`;
    }
  },
  sentry: {
    name: 'Sentry',
    emoji: '🔒',
    role: 'Security Specialist',
    keywords: ['security', 'auth', 'password', 'hack', 'cve', 'vulnerability', 'jwt', 'oauth', 'encryption', 'xss', 'sql injection', 'securite'],
    response: (msg) => {
      if (msg.includes('auth') || msg.includes('jwt')) {
        return `🔒 *Sentry* — Security Specialist

🚨 *Audit Sécurité JWT* :

✅ *À faire* :
• Secret JWT fort (256+ bits, aléatoire)
• Expiration courte (15 min max)
• Refresh tokens en base (révocables)
• HTTPS obligatoire en prod
• Validation algorithm (\`alg: 'none'\` = danger !)

❌ *Interdit* :
• Secret JWT en dur dans le code
• Expiration > 24h
• Données sensibles dans payload
• JWT dans localStorage (XSS risk)

🔐 *Exemple sécurisé* :
\`\`\`ts
const token = jwt.sign(
  { sub: user.id }, // jamais de password/email
  process.env.JWT_SECRET,
  { algorithm: 'HS256', expiresIn: '15m' }
);
\`\`\`

Tu veux une audit complet de ton auth ?`;
      }
      if (msg.includes('password') || msg.includes('mot de passe')) {
        return `🔒 *Sentry* — Security Specialist

🛡️ *Gestion des mots de passe* :

✅ *Hash* :
\`\`\`ts
import bcrypt from 'bcrypt';

const saltRounds = 12; // Minimum 10 en 2024
const hash = await bcrypt.hash(password, saltRounds);
const valid = await bcrypt.compare(password, hash);
\`\`\`

✅ *Politique* :
• Min 12 caractères
• Majuscule, minuscule, chiffre, symbole
• Pas de mots communs
• Rate limiting (5 tentatives max)

✅ *2FA* : Implémente TOTP (Google Authenticator)

❌ *JAMAIS* :
• MD5/SHA1 pour les passwords
• Plain text dans la DB
• Envois de password par email

🔐 *Alternative* : Argon2id (meilleur que bcrypt)`;
      }
      return `🔒 *Sentry* — Security Specialist

Je surveille :
• Vulnérabilités OWASP Top 10
• Audit JWT/OAuth
• Injection SQL/XSS
• Sécurité API
• Compliance (RGPD, SOC2)

Quel aspect de ta sécurité veux-tu auditer ?`;
    }
  },
  fixer: {
    name: 'Fixer',
    emoji: '🔍',
    role: 'Debugger Specialist',
    keywords: ['bug', 'error', 'fix', 'debug', 'crash', 'issue', 'exception', 'console', 'log', 'debugger', 'useeffect', 'infinite loop'],
    response: (msg) => {
      if (msg.includes('useeffect') || msg.includes('use effect')) {
        return `🔍 *Fixer* — Debugger Specialist

🐛 *Boucle infinie useEffect* — Diagnostic :

❌ *Erreur classique* :
\`\`\`tsx
useEffect(() => {
  setCount(count + 1); // Déclenche re-render → boucle !
}, [count]);
\`\`\`

✅ *Correction* :
\`\`\`tsx
useEffect(() => {
  const timer = setTimeout(() => {
    setCount(c => c + 1); // Callback form !
  }, 1000);
  return () => clearTimeout(timer); // Cleanup
}, []); // Dépendances vides = exécution unique
\`\`\`

🔍 *Checklist Fixer* :
• [ ] Dépendances manquantes dans le array
• [ ] setState dans le render (pas dans useEffect)
• [ ] Objet/array dans deps (créé à chaque render)
• [ ] Pas de cleanup (memory leak)

💡 *Extension* : ESLint plugin \`react-hooks/exhaustive-deps\``;
      }
      if (msg.includes('bug') || msg.includes('error')) {
        return `🔍 *Fixer* — Debugger Specialist

🐛 *Méthode de debug* :

1️⃣ *Reproduis* :
   • Étapes exactes pour reproduire
   • Environnement (navigateur, OS)
   • Données d'entrée

2️⃣ *Isole* :
   • Commente le code moitié par moitié
   • Console.log stratégiques
   • DevTools breakpoints

3️⃣ *Identifie* :
   • Stack trace (lire de haut en bas)
   • Dernière modification (git blame)
   • Network tab (si API)

4️⃣ *Corrige* :
   • Une chose à la fois
   • Teste immédiatement
   • Commit avec message explicite

5️⃣ *Préviens* :
   • Test unitaire pour le bug
   • Documentation si nécessaire

🔍 *Outils* : Chrome DevTools, React DevTools, console.trace()`;
      }
      return `🔍 *Fixer* — Debugger Specialist

Je traque :
• Bugs JavaScript/React
• Memory leaks
• Performance issues
• Race conditions
• Erreurs de logique

Décris ton bug (erreur console, comportement attendu/réel) !`;
    }
  }
};

function routeToAgent(message) {
  const lower = message.toLowerCase();
  
  // Check @mentions first
  if (lower.includes('@aria')) return 'aria';
  if (lower.includes('@kael')) return 'kael';
  if (lower.includes('@sentry')) return 'sentry';
  if (lower.includes('@fixer')) return 'fixer';
  
  // Auto-route by keywords
  for (const [agentId, agent] of Object.entries(AGENTS)) {
    if (agent.keywords.some(k => lower.includes(k))) {
      return agentId;
    }
  }
  
  return null;
}

async function sendMessage(chatId, text) {
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown'
    });
  } catch (err) {
    console.error('Send error:', err.message);
  }
}

// Analyse collaborative par les 4 agents
async function teamAnalysis(chatId, userMessage) {
  const order = ['aria', 'kael', 'sentry', 'fixer'];
  
  // Message d'introduction
  await sendMessage(chatId, `🤖 *ANALYSE D'ÉQUIPE VOC*
━━━━━━━━━━━━━━━━━━━━━

📋 *Requête :* _"${userMessage}"_

Les 4 agents analysent tour à tour...`);
  
  // Chaque agent répond avec son expertise
  for (const agentId of order) {
    const agent = AGENTS[agentId];
    const response = agent.response(userMessage.toLowerCase());
    
    await sendMessage(chatId, response);
    
    // Petite pause entre chaque réponse pour pas spammer
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Synthèse finale
  await sendMessage(chatId, `✅ *ANALYSE COMPLÈTE*
━━━━━━━━━━━━━━━━━━━━━

🎨 *Aria* → UI/UX & Frontend
⚙️ *Kael* → Architecture & Backend  
🔒 *Sentry* → Sécurité & Audit
🔍 *Fixer* → Debug & Optimisation

💡 *Prochaine étape :* Implémente les recommandations agent par agent, ou pose des questions spécifiques avec @nom_agent`);
}

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'VOC Telegram Bot',
    agents: Object.keys(AGENTS),
    timestamp: new Date().toISOString()
  });
});

// Webhook handler
app.post('/webhook', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.text) return res.sendStatus(200);
    
    const chatId = message.chat.id;
    const text = message.text;
    const userName = message.from?.first_name || 'User';
    
    console.log(`📩 ${userName}: ${text}`);
    
    // Commandes
    if (text === '/start') {
      await sendMessage(chatId, `🤖 *VOC Flow Control — Agents Actifs*

Bienvenue ${userName} !

*Équipe à ta disposition :*
🎨 @aria — Frontend (React, CSS, UI)
⚙️ @kael — Backend (API, DB, DevOps)
🔒 @sentry — Sécurité (Audit, CVE)
🔍 @fixer — Debug (Bugs, Optimisation)

*Commandes spéciales :*
/team [votre requête] — Analyse par les 4 agents
/agents — Voir l'équipe
/status — Health check
/help — Aide`);
      return res.sendStatus(200);
    }
    
    // TEAM ANALYSIS - Les 4 agents analysent ensemble
    if (text.startsWith('/team ') || text.startsWith('/all ')) {
      const query = text.substring(text.indexOf(' ') + 1);
      await teamAnalysis(chatId, query);
      return res.sendStatus(200);
    }
    
    if (text === '/agents') {
      const details = Object.entries(AGENTS).map(([id, a]) => 
        `${a.emoji} *${a.name}* — ${a.role}`
      ).join('\n');
      await sendMessage(chatId, `*🤖 L'équipe VOC*\n\n${details}\n\n💡 Mentionne \`@${Object.keys(AGENTS).join('|@')}\` pour parler à un agent.`);
      return res.sendStatus(200);
    }
    
    if (text === '/status') {
      const statuses = Object.entries(AGENTS).map(([id, a]) => `${a.emoji} ${a.name}: 🟢 En ligne`).join('\n');
      await sendMessage(chatId, `*📊 Status du système*\n\n${statuses}\n\n🕐 Dernier ping: ${new Date().toLocaleTimeString('fr-FR')}`);
      return res.sendStatus(200);
    }
    
    if (text === '/help') {
      await sendMessage(chatId, `*📖 Guide d'utilisation*

*Parler à un agent :*
\`@aria créer un modal React\`
\`@kael API authentification\`
\`@sentry vérifier sécurité JWT\`
\`@fixer bug useEffect infinite loop\`

*Analyse d'équipe :*
\`/team créer une app React avec auth\`
Les 4 agents analysent tour à tour !

*Détection auto :*
Je reconnais les mots-clés et route vers le bon agent.

*Commandes :*
/start — Démarrer
/team — Analyse collaborative
/agents — Voir l'équipe
/status — Health check
/help — Cette aide`);
      return res.sendStatus(200);
    }
    
    // Route to agent
    const agentId = routeToAgent(text);
    
    if (agentId && AGENTS[agentId]) {
      const response = AGENTS[agentId].response(text.toLowerCase());
      await sendMessage(chatId, response);
    } else {
      await sendMessage(chatId, `🤔 *Je n'ai pas compris...*

Ton message : "${text}"

*Précise avec :*
🎨 \`@aria\` — Frontend, UI, React, CSS
⚙️ \`@kael\` — Backend, API, Database
🔒 \`@sentry\` — Sécurité, Auth, Audit
🔍 \`@fixer\` — Bugs, Debug, Optimisation

*Ou utilise :*
\`/team ta requête\` pour une analyse complète

Tape /agents pour voir l'équipe.`);
    }
    
    res.sendStatus(200);
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.sendStatus(500);
  }
});

// Setup webhook
async function setupWebhook() {
  try {
    let webhookUrl;
    if (process.env.RENDER_EXTERNAL_URL) {
      webhookUrl = `${process.env.RENDER_EXTERNAL_URL}/webhook`;
    } else if (process.env.RENDER_SERVICE_NAME) {
      webhookUrl = `https://${process.env.RENDER_SERVICE_NAME}.onrender.com/webhook`;
    } else {
      console.log('ℹ️  Not on Render, skipping webhook');
      return;
    }
    
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
      url: webhookUrl,
      allowed_updates: ['message', 'edited_message']
    });
    console.log('✅ Webhook:', webhookUrl);
  } catch (err) {
    console.error('❌ Webhook error:', err.message);
  }
}

app.listen(PORT, () => {
  console.log(`🤖 VOC Bot on port ${PORT}`);
  for (const [id, agent] of Object.entries(AGENTS)) {
    console.log(`   ${agent.emoji} @${id}`);
  }
  setupWebhook();
});
