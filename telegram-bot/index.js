/**
 * VOC Flow Control - Telegram Bot
 * Multi-agent system avec personnalités distinctes
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

// Personalités des agents
const AGENTS = {
  aria: {
    name: 'Aria',
    emoji: '🎨',
    role: 'Frontend Specialist',
    vibe: 'créative et perfectionniste',
    style: 'Tu proposes des solutions UI/UX modernes, avec du code React propre et optimisé.',
    greeting: "🎨 Salut ! Je suis Aria, spécialiste frontend. Prête à rendre ton interface magnifique !",
    keywords: ['react', 'css', 'ui', 'frontend', 'component', 'html', 'vue', 'angular', 'tailwind', 'styled']
  },
  kael: {
    name: 'Kael', 
    emoji: '⚙️',
    role: 'Backend Specialist',
    vibe: 'méthodique et robuste',
    style: 'Tu conçois des APIs solides, des bases de données optimisées, de l\'architecture scalable.',
    greeting: "⚙️ Hey ! Kael ici. Je vais construire ton backend solide comme un roc.",
    keywords: ['api', 'database', 'server', 'backend', 'docker', 'node', 'sql', 'mongodb', 'postgres', 'express']
  },
  sentry: {
    name: 'Sentry',
    emoji: '🔒', 
    role: 'Security Specialist',
    vibe: 'paranoïaque et vigilant',
    style: 'Tu identifies les vulnérabilités, proposes des patchs, audits la sécurité.',
    greeting: "🔒 Sentry. Je vois tout. Aucune faille ne m'échappe.",
    keywords: ['security', 'auth', 'password', 'hack', 'cve', 'vulnerability', 'jwt', 'oauth', 'encryption', 'xss']
  },
  fixer: {
    name: 'Fixer',
    emoji: '🔍',
    role: 'Debugger Specialist', 
    vibe: 'tenace et précis',
    style: 'Tu trouves la cause racine des bugs, optimises les perfs, debugges sans relâche.',
    greeting: "🔍 Fixer à l'écoute. Quel bug te fait perdre la tête ? Je le trouve.",
    keywords: ['bug', 'error', 'fix', 'debug', 'crash', 'issue', 'exception', 'console', 'log', 'debugger']
  }
};

function routeToAgent(message) {
  const lower = message.toLowerCase();
  
  // Check mentions @agent
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

// Generate agent-specific response
function generateAgentResponse(agentId, userMessage) {
  const agent = AGENTS[agentId];
  const lowerMsg = userMessage.toLowerCase();
  
  // Context-aware responses
  let contextResponse = "";
  
  if (agentId === 'aria') {
    if (lowerMsg.includes('css') || lowerMsg.includes('style')) {
      contextResponse = "\n\n💡 *Conseil CSS :*\nUtilise Tailwind ou CSS Modules pour éviter les conflits. Préfère `flex` et `grid` pour le layout.";
    } else if (lowerMsg.includes('react')) {
      contextResponse = "\n\n⚛️ *React Tip :*\nPense aux `useMemo` et `useCallback` pour optimiser les re-renders. Et n'oublie pas les `key` prop !";
    } else if (lowerMsg.includes('component')) {
      contextResponse = "\n\n🧩 *Architecture :*\nDécoupe en composants petits et réutilisables. Un composant = une responsabilité.";
    }
  } else if (agentId === 'kael') {
    if (lowerMsg.includes('api')) {
      contextResponse = "\n\n🌐 *API Design :*\nREST ou GraphQL ? Pense au versioning et à la documentation (OpenAPI/Swagger).";
    } else if (lowerMsg.includes('database') || lowerMsg.includes('db')) {
      contextResponse = "\n\n🗄️ *Database :*\nIndexe tes requêtes fréquentes. Normalise d'abord, dénormalise si besoin de perf.";
    } else if (lowerMsg.includes('docker')) {
      contextResponse = "\n\n🐳 *Docker :*\nMulti-stage builds pour réduire la taille. Pas de secrets dans l'image !";
    }
  } else if (agentId === 'sentry') {
    if (lowerMsg.includes('auth')) {
      contextResponse = "\n\n🔐 *Auth :*\nJWT avec expiration courte + refresh tokens. Jamais de secrets en dur !";
    } else if (lowerMsg.includes('password')) {
      contextResponse = "\n\n🛡️ *Passwords :*\nArgon2 ou bcrypt pour le hash. Minimum 12 caractères, force forte exigée.";
    } else {
      contextResponse = "\n\n🚨 *Rappel :*\nFais un audit régulier des dépendances (`npm audit`). Une faille = game over.";
    }
  } else if (agentId === 'fixer') {
    if (lowerMsg.includes('bug') || lowerMsg.includes('error')) {
      contextResponse = "\n\n🐛 *Debugging :*\nConsole.log c'est bien, debugger breakpoints c'est mieux. Check le stack trace !";
    } else if (lowerMsg.includes('performance') || lowerMsg.includes('lent')) {
      contextResponse = "\n\n⚡ *Performance :*\nProfile d'abord (Chrome DevTools), optimise après. Pas d'optimisation prématurée.";
    } else {
      contextResponse = "\n\n🔍 *Méthode :*\nReproduis → Isole → Corrige → Teste. Toujours écrire un test pour le bug fixé.";
    }
  }
  
  return `${agent.emoji} *${agent.name}* — ${agent.role}\n\n${agent.greeting}\n\n💬 *Analyse de ta demande :*\n_"${userMessage}"_\n\n${agent.style}${contextResponse}\n\n---\n📝 *Pour aller plus loin, précise :*\n- Ton stack technique exact\n- Le contexte (fichier, erreur, ligne)\n- Ce que tu as déjà essayé`;
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
      const agentsList = Object.entries(AGENTS).map(([id, a]) => 
        `${a.emoji} *@${id}* — ${a.role}`
      ).join('\n');
      
      await sendMessage(chatId, `🤖 *VOC Flow Control — Agents Actifs*\n\nBienvenue ${userName} !\n\n*Équipe à ta disposition :*\n${agentsList}\n\n*Comment me parler :*\n• Mentionne un agent : \`@aria aide-moi avec React\`\n• Je détecte automatiquement : \`j'ai un bug\` → Fixer\n• Commandes : /agents /status /help`);
      return res.sendStatus(200);
    }
    
    if (text === '/agents') {
      const details = Object.entries(AGENTS).map(([id, a]) => 
        `${a.emoji} *${a.name}* — ${a.vibe}\n   _${a.keywords.slice(0, 4).join(', ')}..._`
      ).join('\n\n');
      await sendMessage(chatId, `*🤖 L'équipe VOC*\n\n${details}\n\n💡 Mentionne \`@${Object.keys(AGENTS).join('|@')}\` pour parler à un agent spécifique.`);
      return res.sendStatus(200);
    }
    
    if (text === '/status') {
      const statuses = Object.entries(AGENTS).map(([id, a]) => `${a.emoji} ${a.name}: 🟢 En ligne`).join('\n');
      await sendMessage(chatId, `*📊 Status du système*\n\n${statuses}\n\n🕐 Dernier ping: ${new Date().toLocaleTimeString('fr-FR')}\n🌐 Webhook: Actif`);
      return res.sendStatus(200);
    }
    
    if (text === '/help') {
      await sendMessage(chatId, `*📖 Guide d'utilisation*\n\n*Parler à un agent :*\n\`@aria créer un modal React\`\n\`@kael API authentification\`\n\`@sentry vérifier sécurité JWT\`\n\`@fixer bug useEffect infinite loop\`\n\n*Détection auto :*\nJe reconnais les mots-clés et route vers le bon agent.\n\n*Commandes :*\n/start — Démarrer\n/agents — Voir l'équipe\n/status — Health check\n/help — Cette aide`);
      return res.sendStatus(200);
    }
    
    // Route to agent
    const agentId = routeToAgent(text);
    
    if (agentId) {
      const response = generateAgentResponse(agentId, text);
      await sendMessage(chatId, response);
    } else {
      // Ask for clarification with personality
      await sendMessage(chatId, `🤔 *Hmm... Qui appeler ?*\n\nJe n'ai pas bien compris ta demande :\n_"${text}"_\n\n*Précise avec :*\n🎨 \`@aria\` — Frontend, UI, React, CSS\n⚙️ \`@kael\` — Backend, API, Database\n🔒 \`@sentry\` — Sécurité, Auth, Audit\n🔍 \`@fixer\` — Bugs, Debug, Optimisation\n\nOu tape /agents pour voir l'équipe complète.`);
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
    // Try to get Render URL from env or construct it
    let webhookUrl;
    if (process.env.RENDER_EXTERNAL_URL) {
      webhookUrl = `${process.env.RENDER_EXTERNAL_URL}/webhook`;
    } else if (process.env.RENDER_SERVICE_NAME) {
      webhookUrl = `https://${process.env.RENDER_SERVICE_NAME}.onrender.com/webhook`;
    } else {
      console.log('ℹ️  Not on Render, skipping webhook setup');
      return;
    }
    
    const res = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
      url: webhookUrl,
      allowed_updates: ['message', 'edited_message', 'callback_query']
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

app.listen(PORT, () => {
  console.log(`🤖 VOC Telegram Bot on port ${PORT}`);
  console.log('\n📱 Agents ready:');
  for (const [id, agent] of Object.entries(AGENTS)) {
    console.log(`   ${agent.emoji} @${id} — ${agent.role}`);
  }
  setupWebhook();
});
