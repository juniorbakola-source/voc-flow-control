#!/bin/bash
#
# start-orchestrator.sh - Démarrage de l'orchestrateur d'agents
#

cd "$(dirname "$0")/.."

echo "🤖 Démarrage de l'Orchestrateur VOC Flow Control..."
echo ""

# Vérifier que les agents sont configurés
if [ ! -d "agents" ]; then
    echo "❌ Dossier agents/ non trouvé"
    exit 1
fi

# Lancer le monitoring des agents
node orchestrator/index.js &
ORCHESTRATOR_PID=$!

echo "✅ Orchestrateur démarré (PID: $ORCHESTRATOR_PID)"
echo ""
echo "Agents actifs :"
ls -1 agents/ | grep -E '^AGENT-' | sed 's/AGENT-/- 🎭 /' | sed 's/.md//'
echo ""
echo "Logs : tail -f logs/orchestrator.log"
echo ""
echo "Arrêter : kill $ORCHESTRATOR_PID"

wait $ORCHESTRATOR_PID
