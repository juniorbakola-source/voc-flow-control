#!/bin/bash
#
# setup.sh - Script d'installation de VOC Flow Control
#

set -e

echo "🚀 VOC Flow Control - Installation"
echo "==================================="
echo ""

# Vérifier les prérequis
check_prerequisite() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 n'est pas installé. Veuillez l'installer d'abord."
        exit 1
    fi
    echo "✅ $1 trouvé"
}

echo "Vérification des prérequis..."
check_prerequisite "git"
check_prerequisite "node"
check_prerequisite "npm"

# Créer la structure
echo ""
echo "📁 Création de la structure..."
mkdir -p {skills,interface,scripts,orchestrator,docs,config,logs}

# Installer les dépendances de l'interface
echo ""
echo "🎨 Installation de l'interface..."
cd interface

# Créer package.json s'il n'existe pas
if [ ! -f "package.json" ]; then
cat > package.json << 'EOF'
{
  "name": "voc-flow-interface",
  "version": "1.0.0",
  "description": "Interface graphique pour VOC Flow Control",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "socket.io-client": "^4.7.0",
    "zustand": "^4.4.0",
    "axios": "^1.6.0",
    "date-fns": "^3.0.0",
    "lucide-react": "^0.294.0",
    "recharts": "^2.10.0",
    "tailwindcss": "^3.3.0",
    "@tailwindcss/forms": "^0.5.7"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
EOF
fi

npm install
cd ..

# Rendre les scripts exécutables
echo ""
echo "🔧 Configuration des scripts..."
chmod +x scripts/*.sh

# Créer le fichier .env example
echo ""
echo "⚙️  Création de la configuration..."
if [ ! -f ".env" ]; then
cat > .env << 'EOF'
# VOC Flow Control - Configuration

# Agent Configuration
AGENT_MODEL_DEFAULT=google/gemini-2.5-flash
AGENT_HEARTBEAT_ENABLED=true
AGENT_AUTO_ESCALATION=true
AGENT_MAX_SKILLS_CACHE=100

# Interface Configuration
INTERFACE_PORT=3000
INTERFACE_HOST=localhost

# Orchestrator Configuration
ORCHESTRATOR_LOG_LEVEL=info
ORCHESTRATOR_MAX_CONCURRENT_TASKS=10

# Security
ENABLE_AUTH=false
JWT_SECRET=change-me-in-production

# GitHub Integration
GITHUB_TOKEN=
GITHUB_WEBHOOK_SECRET=
EOF
fi

echo ""
echo "✅ Installation terminée !"
echo ""
echo "Prochaines étapes :"
echo "  1. Configurez vos variables dans .env"
echo "  2. Lancez l'interface : ./scripts/start-interface.sh"
echo "  3. Démarrez l'orchestrateur : ./scripts/start-orchestrator.sh"
echo ""
