#!/bin/bash
#
# generate-agent.sh - Génère un nouvel agent spécialisé
#

set -e

usage() {
    echo "Usage: $0 --name <agent_name> --expertise <skills> [--trigger <condition>]"
    echo ""
    echo "Options:"
    echo "  --name        Nom de l'agent (ex: KafkaExpert)"
    echo "  --expertise   Compétences (ex: docker,kubernetes)"
    echo "  --trigger     Condition de déclenchement"
    echo "  --parent      Agent parent (optionnel)"
    echo ""
    echo "Exemple:"
    echo "  $0 --name DevOpsMaster --expertise docker,k8s,terraform"
    exit 1
}

# Parse arguments
NAME=""
EXPERTISE=""
TRIGGER="manual"
PARENT=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --name)
            NAME="$2"
            shift 2
            ;;
        --expertise)
            EXPERTISE="$2"
            shift 2
            ;;
        --trigger)
            TRIGGER="$2"
            shift 2
            ;;
        --parent)
            PARENT="$2"
            shift 2
            ;;
        *)
            usage
            ;;
    esac
done

if [ -z "$NAME" ] || [ -z "$EXPERTISE" ]; then
    usage
fi

AGENT_FILE="agents/AGENT-${NAME^^}.md"

echo "🧬 Génération de l'agent: $NAME"
echo "   Expertise: $EXPERTISE"
echo "   Trigger: $TRIGGER"
[ -n "$PARENT" ] && echo "   Parent: $PARENT"
echo ""

# Générer le fichier agent
cat > "$AGENT_FILE" << EOF
# AGENT-${NAME^^}.md — Agent Spécialisé

## Identité
- **Nom:** $NAME
- **Type:** Agent spécialisé généré automatiquement
- **Expertise:** $EXPERTISE
- **Trigger:** $TRIGGER
${PARENT:+- **Parent:** $PARENT}

## Mission
Agent créé pour traiter des tâches spécifiques nécessitant une expertise avancée en [$EXPERTISE].

## Capacités
EOF

# Ajouter les capacités basées sur l'expertise
IFS=',' read -ra SKILLS <<< "$EXPERTISE"
for skill in "${SKILLS[@]}"; do
    echo "- **${skill^}** — Expertise en $skill" >> "$AGENT_FILE"
done

cat >> "$AGENT_FILE" << EOF

## Auto-Destruction
Cet agent sera automatiquement supprimé après :
- Complétion de sa tâche principale
- Inactivité de 7 jours
- Fusion avec l'agent parent

## Livrables
- Rapport d'exécution détaillé
- Documentation des décisions
- Transfert de connaissances à l'agent parent

---
*Agent généré le $(date '+%Y-%m-%d')*
EOF

echo "✅ Agent créé: $AGENT_FILE"
echo ""
echo "Pour activer:"
echo "  ./scripts/activate-agent.sh $NAME"
