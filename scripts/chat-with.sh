#!/bin/bash
#
# chat-with.sh - Interagir avec un agent spécifique
#

AGENT=$1
MESSAGE="${@:2}"

if [ -z "$AGENT" ] || [ -z "$MESSAGE" ]; then
    echo "Usage: $0 <agent_name> <message>"
    echo ""
    echo "Agents disponibles:"
    ls -1 agents/ | grep -E '^AGENT-' | sed 's/AGENT-/- /' | sed 's/.md//'
    exit 1
fi

echo "💬 Message à [$AGENT]:"
echo "   $MESSAGE"
echo ""
echo "⏳ Envoi à l'orchestrateur..."

# TODO: Implémenter la communication réelle avec l'orchestrateur
# Pour l'instant, simulation
echo "✅ Message transmis à l'agent $AGENT"
echo "   Réponse attendue dans ~30 secondes"
