/**
 * VOC Flow Control - Telegram Bot
 * Multi-agent system via Telegram
 */

const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Configuration
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const PORT = process.env.PORT || 3001;

if (!BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN is required');
  process.exit(1);
}

const AGENTS = {
  aria: { name: 'Aria', emoji: '🎨', role: 'Frontend' },
  kael: { name: 'Kael', emoji: '⚙️', role: 'Backend' },
  sentry: { name: 'Sentry', emoji: '🔒', role: 'Security' },
  fixer: { name: 'Fixer', emoji: '🔍', role: 'Debugger' }
};

function routeToAgent(message) {
  const lower = message.toLowerCase();
  if (lower.includes('@aria')) return 'aria';
  if (lower.includes('@kael')) return 'kael';
  if (lower.includes('@sentry')) return 'sentry';
  if (lower.includes('@fixer')) return 'fixer';
  
  const keywords = {
    aria: ['react', 'css', 'ui', 'frontend', 'component', 'html'],
    kael: ['api', 'database', 'server', 'backend', 'docker', 'node'],
    sentry: ['security', 'auth', 'password', 'hack', 'cve', 'vulnerability'],
    fixer: ['bug', 'error', 'fix', 'debug', 'crash', 'issue']
  };
  
  for (const [agent, words] of Object.entries(keywords)) {
    if (words.some(w => lower.includes(w))) return agent;
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

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'VOC Telegram Bot', agents: Object.keys(AGENTS) });
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
      await sendMessage(chatId, `🤖 *VOC Flow Control - Agents*\n\nBienvenue ${userName}!\n\n*Agents disponibles :*\n🎨 @aria - Frontend (React, CSS, UI)\n⚙️ @kael - Backend (API, DB, DevOps)\n🔒 @sentry - Sécurité (Audit, CVE)\n🔍 @fixer - Debug (Bugs, Optimisation)\n\n*Comment utiliser :*\n• Mentionne un agent: "@aria créer un formulaire"\n• Laisse-moi router: "j'ai un bug en React"\n• Commandes: /agents, /status, /help`);
      return res.sendStatus(200);
    }
    
    if (text === '/agents') {
      const list = Object.entries(AGENTS).map(([id, a]) => `${a.emoji} *${a.name}* - ${a.role}`).join('\n');
      await sendMessage(chatId, `*🤖 Équipe d'Agents*\n\n${list}\n\nMentionne l'agent avec @nom pour lui parler!`);
      return res.sendStatus(200);
    }
    
    if (text === '/status') {
      await sendMessage(chatId, `*📊 Status des Agents*\n\n🎨 Aria: 🟢 En ligne\n⚙️ Kael: 🟢 En ligne\n🔒 Sentry: 🟢 En ligne\n🔍 Fixer: 🟢 En ligne\n\n🕐 Dernier pulse: ${new Date().toLocaleTimeString()}`);
      return res.sendStatus(200);
    }
    
    if (text === '/help') {
      await sendMessage(chatId, `*Commandes :*\n/start - Démarrer\n/agents - Liste des agents\n/status - Status système\n/help - Aide\n\n*Exemples :*\n@aria créer un bouton React\n@kael API pour users\nJ'ai un bug avec useEffect`);
      return res.sendStatus(200);
    }
    
    // Router vers agent
    const agentId = routeToAgent(text);
    
    if (agentId) {
      const agent = AGENTS[agentId];
      const response = `${agent.emoji} *${agent.name}* (${agent.role})\n\nAnalyse de : "${text}"\n\n💡 *Je traite ta demande...*\n\nPour une réponse complète avec code, précise:\n- Ton framework (React/Vue/Node/etc.)\n- Le contexte (fichier, ligne d'erreur)\n\n---\n📎 _Mentionne @${agentId} pour me recontacter_`;
      await sendMessage(chatId, response);
    } else {
      await sendMessage(chatId, `🤔 Je ne suis pas sûr quel agent contacter.\n\nTon message : "${text}"\n\n*Précise avec :*\n• @aria pour frontend/UI\n• @kael pour backend/API\n• @sentry pour sécurité\n• @fixer pour bugs/debug\n\nOu tape /agents pour voir l'équipe.`);
    }
    
    res.sendStatus(200);
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.sendStatus(500);
  }
});

// Setup webhook on start
async function setupWebhook() {
  try {
    // Get the Render URL from environment or skip
    const renderService = process.env.RENDER_SERVICE_NAME;
    if (!renderService) {
      console.log('ℹ️  Not on Render, skipping webhook setup');
      return;
    }
    
    const webhookUrl = `https://${renderService}.onrender.com/webhook`;
    const res = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
      url: webhookUrl
    });
    
    if (res.data.ok) {
      console.log('✅ Webhook set:', webhookUrl);
    } else {
      console.error('❌ Webhook failed:', res.data);
    }
  } catch (err) {
    console.error('❌ Webhook setup error:', err.message);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`🤖 VOC Telegram Bot running on port ${PORT}`);
  console.log('\n📱 Agents ready:');
  for (const [id, agent] of Object.entries(AGENTS)) {
    console.log(`   ${agent.emoji} @${id} - ${agent.role}`);
  }
  setupWebhook();
});
