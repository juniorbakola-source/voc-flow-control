# VOC Flow Control — Lovable Interface

A standalone, Lovable-ready interface for managing VOC Flow Control agents (Aria, Kael, Sentry, Fixer). Built with vanilla HTML, CSS and JavaScript — no build tools required.

## 📁 File Structure

```
lovable/
├── lovable.html              # Main entry point (SPA)
├── components/
│   ├── dashboard.html        # Dashboard view fragment
│   ├── agents.html           # Agents manager view fragment
│   ├── chat.html             # Chat view fragment
│   └── shared.html           # Shared utilities (SVG icons, modals)
├── assets/
│   ├── styles.css            # Global dark-theme styles
│   └── script.js             # Application logic (routing, chat, agents)
└── README.md                 # This file
```

## 🚀 Quick Start

### Option A — Open directly in a browser

```bash
# From the repository root
open lovable/lovable.html
# or on Linux:
xdg-open lovable/lovable.html
```

No server or build step needed. The file loads all assets relatively.

### Option B — Serve with a local HTTP server (recommended)

```bash
# Python 3
cd lovable
python3 -m http.server 3000
# then open http://localhost:3000/lovable.html
```

```bash
# Node.js (npx)
cd lovable
npx serve .
# then open http://localhost:3000/lovable.html
```

### Option C — Import into Lovable.dev

1. Go to [lovable.dev](https://lovable.dev) and sign in.
2. Create a new project → **"Import from GitHub"**.
3. Select the `juniorbakola-source/voc-flow-control` repository.
4. Point Lovable at `lovable/lovable.html` as the entry file.
5. No npm install or build step required — Lovable serves it directly.

## 🎯 Features

| Feature | Status |
|---|---|
| Dashboard with live indicators & stats | ✅ |
| All 4 agent cards (Aria, Kael, Sentry, Fixer) | ✅ |
| Pause / Resume agents (UI) | ✅ |
| Configure agent dialog | ✅ |
| Generate new agent dialog | ✅ |
| Real-time chat with mock responses | ✅ |
| Agent sidebar with quick selection | ✅ |
| Alert notifications (toast) | ✅ |
| Navigation between Dashboard / Agents / Chat | ✅ |
| Dark theme | ✅ |
| Responsive (mobile + desktop) | ✅ |
| No external API dependencies | ✅ |

## 🤖 Agents

| Agent | Emoji | Role | Heartbeat |
|---|---|---|---|
| Aria | 🎨 | Frontend Specialist | 2h |
| Kael | ⚙️ | Backend Specialist | 2h |
| Sentry | 🔒 | Security Specialist | 24h |
| Fixer | 🔍 | Debugger Specialist | 1h |

## 🛠️ Extending

- To connect to a real backend, replace the mock response arrays in `assets/script.js` (`AGENTS[n].responses`) with an `async fetch()` call to your orchestrator API.
- All styling lives in `assets/styles.css` — CSS custom properties (variables) at the top make theme changes easy.
- Component fragments in `components/` can be imported or copy-pasted into any framework (React, Vue, Svelte) with minimal adaptation.

## 📦 Dependencies

| Dependency | Version | Source |
|---|---|---|
| Inter font | latest | Google Fonts (optional — falls back to system-ui) |

No npm packages, no bundler, no transpiler.
