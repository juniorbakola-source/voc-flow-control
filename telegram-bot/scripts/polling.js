/**
 * Mode Polling pour Telegram (sans webhook)
 * Pour développement local ou VPS sans domaine
 */

const axios = require('axios');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const AGENTS = {
  aria: { name: 'Aria', emoji: '🎨', role: 'Frontend' },
  kael: { name: 'Kael', emoji: '⚙️', role: 'Backend' },
  sentry: { name: 'Sentry', emoji: '🔒', role: 'Security' },
  fixer: { name: 'Fixer', emoji: '🔍', role: 'Debugger' }
};

let offset = 0;

function routeToAgent(message) {
  const lower = message.toLowerCase();
  if (lower.includes('@aria')) return 'aria';
  if (lower.includes('@kael')) return 'kael';
  if (lower.includes('@sentry')) return 'sentry';
  if (lower.includes('@fixer')) return 'fixer';
  
  const keywords = {
    aria: ['react', 'css', 'ui', 'frontend', 'component'],
    kael: ['api', 'database', 'server', 'backend', 'docker'],
    sentry: ['security', 'auth', 'password', 'hack', 'cve'],
    fixer: ['bug', 'error', 'fix', 'debug', 'crash']
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

async function getUpdates() {
  try {
    const res = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`, {
      params: { offset, limit: 100 }
    });
    
    const updates = res.data.result;
    for (const update of updates) {
      offset = update.update_id + 1;
      
      if (!update.message || !update.message.text) continue;
      
      const msg = update.message;
      const text = msg.text;
      const chatId = msg.chat.id;
      
      console.log(`📩 ${msg.from.first_name}: ${text}`);
      
      // Commandes
      if (text === '/start') {
        await sendMessage(chatId, `🤖 **VOC Agents**

🎨 @aria - Frontend
⚙️ @kael - Backend  
🔒 @sentry - Security
🔍 @fixer - Debug

Tape /help pour plus d'infos`);
        continue;
      }
      
      if (text === '/help') {
        await sendMessage(chatId, `**Commandes :**
/start - Démarrer
/agents - Liste des agents
/status - Status système
/help - Aide

**Exemples :**
@aria créer un bouton React
@kael API pour users
J'ai un bug avec useEffect`);
        continue;
      }
      
      if (text === '/agents') {
        await sendMessage(chatId, Object.entries(AGENTS).map(([id, a]) => 
          `${a.emoji} **${a.name}** - ${a.role}`
        ).join('\n'));
        continue;
      }
      
      // Router
      const agentId = routeToAgent(text);
      if (agentId) {
        const agent = AGENTS[agentId];
        await sendMessage(chatId, `${agent.emoji} **${agent.name}** reçu !\n\nAnalyse de : "${text}"\n\n💡 *Réponse en cours de génération...*`);
      } else {
        await sendMessage(chatId, `🤔 Précise l'agent : @aria, @kael, @sentry ou @fixer`);
      }
    }
  } catch (err) {
    console.error('Polling error:', err.message);
  }
  
  setTimeout(getUpdates, 1000);
}

console.log('🤖 VOC Telegram Bot - Polling Mode');
console.log('Appuyez sur Ctrl+C pour arrêter\n');
getUpdates();
