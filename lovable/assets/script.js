/**
 * VOC Flow Control — Lovable Shared JavaScript
 * Agents data, routing, chat simulation, utilities
 */

// ── Agent data ────────────────────────────────────────────────────────────────
const AGENTS = [
  {
    name: 'Aria',
    emoji: '🎨',
    role: 'Frontend Specialist',
    status: 'active',
    skills: ['React', 'Vue', 'UX', 'Performance', 'CSS'],
    heartbeat: '2h',
    tasksCompleted: 156,
    lastAction: 'Optimisation bundle React',
    greeting: "Bonjour ! Je suis Aria, spécialiste frontend. Comment puis-je vous aider aujourd'hui ?",
    responses: [
      "Bien sûr ! Je vais analyser votre codebase. Pouvez-vous préciser quelle partie vous souhaitez optimiser ?",
      "J'ai examiné le bundle. Je recommande d'activer le code splitting et le lazy loading pour les routes secondaires.",
      "Voici mon plan d'action : 1. Tree-shaking, 2. Image optimization, 3. Cache headers. Cela devrait améliorer les performances de 40 %.",
      "La migration vers Vite est terminée. Le temps de build est passé de 45 s à 8 s 🚀",
      "J'ai optimisé les composants React avec useMemo et useCallback. Les re-renders inutiles sont réduits.",
    ]
  },
  {
    name: 'Kael',
    emoji: '⚙️',
    role: 'Backend Specialist',
    status: 'active',
    skills: ['APIs', 'PostgreSQL', 'Redis', 'Docker', 'Node.js'],
    heartbeat: '2h',
    tasksCompleted: 203,
    lastAction: 'Déploiement API auth',
    greeting: "Salut ! Kael ici, spécialiste backend. Quel problème d'architecture ou d'API puis-je résoudre ?",
    responses: [
      "J'analyse la structure de votre API. Les endpoints /users et /auth ont des temps de réponse élevés.",
      "Le problème vient des requêtes N+1 en base de données. J'ajoute des index et du eager loading.",
      "Migration PostgreSQL terminée. J'ai aussi configuré Redis pour le cache des sessions — latence réduite de 200 ms.",
      "Le Dockerfile est optimisé en multi-stage build. L'image passe de 1.2 GB à 180 MB.",
      "L'API REST est documentée avec OpenAPI 3.0. Vous pouvez accéder à /api/docs pour la visualiser.",
    ]
  },
  {
    name: 'Sentry',
    emoji: '🔒',
    role: 'Security Specialist',
    status: 'active',
    skills: ['Audit', 'CVE', 'Compliance', 'Secrets', 'OWASP'],
    heartbeat: '24h',
    tasksCompleted: 89,
    lastAction: 'Scan quotidien complété',
    greeting: "Sentry en ligne. Je surveille la sécurité de votre système. Que souhaitez-vous auditer ?",
    responses: [
      "Scan de sécurité en cours... Analyse de 347 dépendances npm.",
      "⚠️ CVE critique détectée dans lodash v4.17.20. Migration vers v4.17.21 recommandée immédiatement.",
      "Rapport OWASP Top 10 généré. Aucune injection SQL détectée. Les headers CSP sont bien configurés.",
      "Audit de secrets terminé. 2 tokens d'API expirent dans 7 jours — rotation recommandée.",
      "Compliance SOC 2 Type II : 94 % des contrôles sont en place. 3 actions correctives identifiées.",
    ]
  },
  {
    name: 'Fixer',
    emoji: '🔍',
    role: 'Debugger Specialist',
    status: 'active',
    skills: ['Investigation', 'Profiling', 'Refactoring', 'Tests', 'Logs'],
    heartbeat: '1h',
    tasksCompleted: 312,
    lastAction: 'Bug pagination corrigé',
    greeting: "Fixer à votre service ! Donnez-moi un bug, un log ou une stack trace et je trouve la cause racine.",
    responses: [
      "J'analyse vos logs. Je détecte des erreurs récurrentes dans auth.service.ts à la ligne 47.",
      "Cause racine identifiée : race condition dans le middleware d'authentification. Correctif appliqué.",
      "Les 3 tests en échec sont liés à un mock mal configuré. Mise à jour des fixtures en cours.",
      "Profiling CPU : la fonction processData() consomme 73 % du temps d'exécution. Refactoring appliqué.",
      "Rapport de débogage : 12 bugs fermés cette semaine, 2 encore en cours d'investigation.",
    ]
  }
]

// ── Simple router ─────────────────────────────────────────────────────────────
const Router = (() => {
  let currentView = 'dashboard'
  const views = ['dashboard', 'agents', 'chat']

  function navigate(view, opts = {}) {
    if (!views.includes(view)) return
    currentView = view

    // Update view visibility
    views.forEach(v => {
      const el = document.getElementById('view-' + v)
      if (el) el.classList.toggle('active', v === view)
    })

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view)
    })

    // If navigating to chat with an agent, select them
    if (view === 'chat' && opts.agent) {
      Chat.selectAgent(opts.agent)
    }

    window.scrollTo(0, 0)
  }

  function current() { return currentView }

  return { navigate, current }
})()

// ── Chat module ───────────────────────────────────────────────────────────────
const Chat = (() => {
  let selectedAgent = AGENTS[0]
  let messages = []

  function init() {
    selectAgent(AGENTS[0].name)
  }

  function selectAgent(name) {
    const agent = AGENTS.find(a => a.name === name) || AGENTS[0]
    selectedAgent = agent

    // Update sidebar active state
    document.querySelectorAll('.sidebar-agent-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.name === name)
    })

    // Update chat header
    const hEmoji = document.getElementById('chat-header-emoji')
    const hName  = document.getElementById('chat-header-name')
    const hRole  = document.getElementById('chat-header-role')
    if (hEmoji) hEmoji.textContent = agent.emoji
    if (hName)  hName.textContent  = agent.name
    if (hRole)  hRole.textContent  = agent.role + ' · En ligne'

    // Update input placeholder
    const input = document.getElementById('chat-input')
    if (input) input.placeholder = `Message à ${agent.name}…`

    // Reset messages
    messages = [
      { from: 'agent', text: agent.greeting, time: formatTime(new Date()) }
    ]
    renderMessages()
  }

  function sendMessage() {
    const input = document.getElementById('chat-input')
    if (!input) return
    const text = input.value.trim()
    if (!text) return

    input.value = ''
    const now = new Date()
    messages.push({ from: 'user', text, time: formatTime(now) })
    renderMessages()

    // Simulate agent response
    const btn = document.getElementById('chat-send-btn')
    if (btn) btn.disabled = true
    setTimeout(() => {
      const responsePool = selectedAgent.responses
      const response = responsePool[Math.floor(Math.random() * responsePool.length)]
      messages.push({ from: 'agent', text: response, time: formatTime(new Date()) })
      renderMessages()
      if (btn) btn.disabled = false
    }, 800 + Math.random() * 600)
  }

  function renderMessages() {
    const container = document.getElementById('chat-messages')
    if (!container) return
    container.innerHTML = messages.map(msg => `
      <div class="msg-row ${msg.from}">
        <div class="msg-bubble">
          ${escapeHtml(msg.text)}
          <div class="msg-time">${msg.time}</div>
        </div>
      </div>
    `).join('')
    container.scrollTop = container.scrollHeight
  }

  return { init, selectAgent, sendMessage }
})()

// ── Agent controls ────────────────────────────────────────────────────────────
const AgentControls = (() => {
  const states = {} // name -> 'active' | 'paused'

  function toggle(name) {
    states[name] = states[name] === 'paused' ? 'active' : 'paused'
    const btn = document.querySelector(`.toggle-btn[data-name="${name}"]`)
    const dot = document.querySelector(`.status-dot[data-name="${name}"]`)
    const badge = document.querySelector(`.status-badge[data-name="${name}"]`)
    const isPaused = states[name] === 'paused'

    if (btn) {
      btn.innerHTML = isPaused
        ? `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>`
        : `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`
      btn.title = isPaused ? 'Reprendre' : 'Mettre en pause'
    }
    if (dot) dot.classList.toggle('idle', isPaused)
    if (badge) {
      badge.textContent = isPaused ? 'paused' : 'active'
      badge.className = 'badge ' + (isPaused ? 'badge-yellow' : 'badge-green') + ' status-badge'
      badge.dataset.name = name
    }

    showToast(`${name} ${isPaused ? 'mis en pause' : 'repris'} ✓`)
  }

  function openConfig(name) {
    const modal = document.getElementById('config-modal')
    if (!modal) return
    document.getElementById('modal-agent-name').textContent = name
    modal.classList.add('open')
  }

  return { toggle, openConfig }
})()

// ── Generate agent modal ──────────────────────────────────────────────────────
function openGenerateModal() {
  const modal = document.getElementById('generate-modal')
  if (modal) modal.classList.add('open')
}

function closeModal(id) {
  const modal = document.getElementById(id)
  if (modal) modal.classList.remove('open')
}

function saveConfig() {
  closeModal('config-modal')
  showToast('Configuration sauvegardée ✓')
}

function generateAgent() {
  const name = document.getElementById('gen-name')?.value?.trim()
  const role = document.getElementById('gen-role')?.value?.trim()
  if (!name || !role) { showToast('Veuillez remplir tous les champs.'); return }
  closeModal('generate-modal')
  showToast(`Agent "${name}" créé avec succès ✓`)
}

// ── Toast notification ────────────────────────────────────────────────────────
let toastTimer = null
function showToast(msg) {
  const toast = document.getElementById('toast')
  if (!toast) return
  toast.textContent = msg
  toast.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000)
}

// ── Utilities ─────────────────────────────────────────────────────────────────
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Wire nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => Router.navigate(btn.dataset.view))
  })

  // Wire chat sidebar agent buttons
  document.querySelectorAll('.sidebar-agent-btn').forEach(btn => {
    btn.addEventListener('click', () => Chat.selectAgent(btn.dataset.name))
  })

  // Wire agent card "Communiquer" buttons
  document.querySelectorAll('.open-chat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      Router.navigate('chat', { agent: btn.dataset.agent })
    })
  })

  // Wire agent card click (whole card opens chat) + keyboard support
  document.querySelectorAll('.agent-card[data-agent]').forEach(card => {
    card.setAttribute('tabindex', '0')
    card.setAttribute('role', 'button')
    card.setAttribute('aria-label', `Ouvrir le chat avec ${card.dataset.agent}`)
    card.addEventListener('click', () => {
      Router.navigate('chat', { agent: card.dataset.agent })
    })
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        Router.navigate('chat', { agent: card.dataset.agent })
      }
    })
  })

  // Wire pause/resume buttons
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      AgentControls.toggle(btn.dataset.name)
    })
  })

  // Wire config buttons
  document.querySelectorAll('.config-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      AgentControls.openConfig(btn.dataset.name)
    })
  })

  // Wire dashboard agent rows click -> chat + keyboard support
  document.querySelectorAll('.agent-row[data-agent]').forEach(row => {
    row.setAttribute('tabindex', '0')
    row.setAttribute('role', 'button')
    row.setAttribute('aria-label', `Ouvrir le chat avec ${row.dataset.agent}`)
    row.addEventListener('click', () => {
      Router.navigate('chat', { agent: row.dataset.agent })
    })
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        Router.navigate('chat', { agent: row.dataset.agent })
      }
    })
  })

  // Wire send button
  const sendBtn = document.getElementById('chat-send-btn')
  if (sendBtn) sendBtn.addEventListener('click', () => Chat.sendMessage())

  // Wire Enter key in chat input
  const chatInput = document.getElementById('chat-input')
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        Chat.sendMessage()
      }
    })
  }

  // Modal close on backdrop click
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('open')
    })
  })

  // Init
  Chat.init()
  Router.navigate('dashboard')
})
