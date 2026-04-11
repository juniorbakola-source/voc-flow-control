#!/bin/bash
#
# create-skill.sh - Crée une nouvelle skill
#

set -e

usage() {
    echo "Usage: $0 --name <skill_name> --category <category>"
    echo ""
    echo "Catégories: frontend, backend, security, devops, core"
    exit 1
}

NAME=""
CATEGORY=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --name)
            NAME="$2"
            shift 2
            ;;
        --category)
            CATEGORY="$2"
            shift 2
            ;;
        *)
            usage
            ;;
    esac
done

if [ -z "$NAME" ] || [ -z "$CATEGORY" ]; then
    usage
fi

SKILL_DIR="skills/${CATEGORY}/${NAME}"
mkdir -p "$SKILL_DIR"

echo "🛠️  Création de la skill: $NAME"
echo "   Catégorie: $CATEGORY"
echo ""

# Créer le skill.yaml
cat > "$SKILL_DIR/skill.yaml" << EOF
name: ${NAME}
category: ${CATEGORY}
description: TODO - Ajouter une description
version: 1.0.0
author: $(git config user.name 2>/dev/null || echo "VOC Flow")
created_at: $(date '+%Y-%m-%d')

dependencies: []

inputs:
  - name: input1
    type: string
    description: TODO - Décrire l'entrée
    required: true

outputs:
  - output.txt

template: |
  # TODO - Implémenter le template
  # Cette skill génère du code ou automatise une tâche

examples:
  - name: "Exemple basique"
    inputs:
      input1: "valeur"
    expected_output: "resultat"
EOF

# Créer un script d'exécution optionnel
cat > "$SKILL_DIR/execute.sh" << 'EOF'
#!/bin/bash
# Script d'exécution de la skill
# Usage: ./execute.sh <input_json>

INPUT=$1
echo "Exécution de la skill..."
echo "Input: $INPUT"
# TODO - Implémenter la logique
EOF

chmod +x "$SKILL_DIR/execute.sh"

echo "✅ Skill créée dans: $SKILL_DIR"
echo ""
echo "Fichiers créés:"
echo "  - skill.yaml (configuration)"
echo "  - execute.sh (script d'exécution)"
echo ""
echo "Prochaines étapes:"
echo "  1. Éditer $SKILL_DIR/skill.yaml"
echo "  2. Implémenter $SKILL_DIR/execute.sh"
echo "  3. Tester avec: ./scripts/test-skill.sh $NAME"
