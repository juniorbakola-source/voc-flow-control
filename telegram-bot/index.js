/**
 * VOC Flow Control - Telegram Bot
 * Multi-agent system via Telegram
 */

const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Configuration
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // @henri3Pbot ou nouveau
const WEBHOOK_URL = process.env.WEBHOOK_URL; // Ton URL publique
const AGENTS = {
  aria: {
    name: 'Aria',
    emoji: '🎨',
    role: 'Frontend',
    keywords: ['react', 'css', 'ui', 'frontend', 'component', 'tsx', 'jsx'],
    color: '\x1b[35m'
  },
  kael: {
    name: 'Kael',
    emoji: '⚙️',
    role: 'Backend',
    keywords: ['api', 'database', 'server', 'backend', 'docker', 'deploy'],
    color: '\x1b[34m'
  },
  sentry: {
    name: 'Sentry',
    emoji: '🔒',
    role: 'Security',
    keywords: ['security', 'vulnerability', 'auth', 'password', 'hack', 'cve'],
    color: '\x1b[31m'
  },
  fixer: {
    name: 'Fixer',
    emoji: '🔍',
    role: 'Debugger',
    keywords: ['bug', 'error', 'fix', 'debug', 'crash', 'issue'],
    color: '\x1b[33m'
  }
};

// Routeur intelligent
function routeToAgent(message) {
  const lower = message.toLowerCase();
  
  // Check explicit mentions @agent
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
  
  return null; // Default to all or ask
}

// Générer réponse agent
async function generateAgentResponse(agentId, message, userName) {
  const agent = AGENTS[agentId];
  
  // Ici tu connectes ton modèle AI (OpenAI, Claude, etc.)
  // Pour l'instant, réponse structurée
  return `${agent.emoji} **${agent.name}** (${agent.role})

Analyse de ta demande :
\`${message}\`

---

🧠 **Analyse :**
Je décompose ton problème en étapes...

💡 **Solution proposée :**
1. Identification du contexte
2. Exploration des approches
3. Convergence vers solution

⚡ **Action recommandée :**
Pour une réponse complète avec code, précise :
- Ton framework (React/Vue/Node/etc.)
- Le contexte (fichier, ligne d'erreur)

---
📎 *Mentionne @${agentId} pour me recontacter*`;
}

// Webhook handler
app.post('/webhook', async (req, res) => {
  const { message } = req.body;
  if (!message || !message.text) return res.sendStatus(200);
  
  const chatId = message.chat.id;
  const text = message.text;
  const userName = message.from.first_name || 'Utilisateur';
  
  // Commandes spéciales
  if (text === '/start') {
    await sendMessage(chatId, `🤖 **VOC Flow Control - Agents**

Bienvenue ${userName} !

**Agents disponibles :**
🎨 @aria - Frontend (React, CSS, UI)
⚙️ @kael - Backend (API, DB, DevOps)
🔒 @sentry - Sécurité (Audit, CVE)
🔍 @fixer - Debug (Bugs, Optimisation)

**Comment utiliser :**
• Mentionne un agent : "@aria créer un formulaire"
• Laisse-moi router : "j'ai un bug en React"
• Commandes : /agents, /status, /help`);
    return res.sendStatus(200);
  }
  
  if (text === '/agents') {
    await sendMessage(chatId, `**🤖 Équipe d'Agents**

🎨 **Aria** - Frontend Specialist
   React, Vue, CSS, Performance, UX

⚙️ **Kael** - Backend Specialist
   APIs, Bases de données, Docker, CI/CD

🔒 **Sentry** - Security Specialist
   Audit, CVE, Compliance, Secrets

🔍 **Fixer** - Debugger Specialist
   Investigation, Optimisation, Tests

Mentionne l'agent avec @nom pour lui parler !`);
    return res.sendStatus(200);
  }
  
  if (text === '/status') {
    await sendMessage(chatId, `**📊 Status des Agents**

🎨 Aria: 🟢 En ligne
⚙️ Kael: 🟢 En ligne
🔒 Sentry: 🟢 En ligne
🔍 Fixer: 🟢 En ligne

🕐 Dernier pulse: ${new Date().toLocaleTimeString()}`);
    return res.sendStatus(200);
  }
  
  // Router vers agent
  const agentId = routeToAgent(text);
  
  if (agentId) {
    const response = await generateAgentResponse(agentId, text, userName);
    await sendMessage(chatId, response);
  } else {
    // Demander clarification
    await sendMessage(chatId, `🤔 Je ne suis pas sûr quel agent contacter.

Ton message : "${text}"

**Précise avec :**
• @aria pour frontend/UI
• @kael pour backend/API
• @sentry pour sécurité
• @fixer pour bugs/debug

Ou tape /agents pour voir l'équipe.`);
  }
  
  res.sendStatus(200);
});

// Envoyer message Telegram
async function sendMessage(chatId, text) {
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown'
    });
  } catch (err) {
    console.error('Telegram error:', err.message);
  }
}

// Setup webhook
async function setupWebhook() {
  if (!WEBHOOK_URL) {
    console.log('ℹ️  WEBHOOK_URL not set, skipping webhook setup');
    return;
  }
  
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
      url: `${WEBHOOK_URL}/webhook`
    });
    console.log('✅ Webhook set:', WEBHOOK_URL);
  } catch (err) {
    console.error('❌ Webhook setup failed:', err.message);
  }
}

// Démarrer
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🤖 VOC Telegram Bot running on port ${PORT}`);
  console.log('\n📱 Agents ready:');
  for (const [id, agent] of Object.entries(AGENTS)) {
    console.log(`   ${agent.emoji} @${id} - ${agent.role}`);
  }
  setupWebhook();
});

module.exports = app;
