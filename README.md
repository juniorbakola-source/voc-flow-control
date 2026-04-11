# VOC Flow Control - Agent Orchestration Platform

> **V**ersatile **O**peration **C**enter — Une plateforme d'orchestration multi-agents pour le développement logiciel

## 🎯 Vision

VOC Flow Control est un système d'agents IA autonomes spécialisés qui collaborent pour développer, sécuriser et maintenir vos applications. Chaque agent possède une expertise unique et peut générer d'autres agents ou skills selon les besoins.

## 🏗️ Architecture

```
voc-flow-control/
├── agents/                 # Définitions des agents
├── skills/                 # Bibliothèque de compétences (30+)
├── interface/             # Interface graphique web
├── scripts/               # Scripts d'automatisation
├── orchestrator/          # Moteur d'orchestration
└── docs/                  # Documentation
```

## 🤖 Les 4 Agents Principaux

| Agent | Rôle | Skills | Fréquence |
|-------|------|--------|-----------|
| 🎨 **Aria** | Frontend | React, Vue, UX, Performance | 2h |
| ⚙️ **Kael** | Backend | APIs, Architecture, DevOps | 2h |
| 🔒 **Sentry** | Sécurité | Audit, CVE, Compliance | Quotidien |
| 🔍 **Fixer** | Debugger | Investigation, Optimisation | 1h |

## 🎛️ Interface Graphique

Lancez l'interface web pour interagir visuellement avec les agents :

```bash
# Démarrer l'interface
./scripts/start-interface.sh

# Ou manuellement
cd interface
npm install
npm run dev
```

Accès : http://localhost:3000

### Fonctionnalités de l'interface

- 💬 **Chat temps réel** avec chaque agent
- 📊 **Dashboard** de santé des projets
- 🔔 **Notifications** d'actions requises
- 🎛️ **Configuration** des skills et schedules
- 📈 **Métriques** de performance

## 🧩 Système de Skills (30+)

### Skills Core (10)
1. `code-review` — Revue de code automatisée
2. `dependency-check` — Vérification des dépendances
3. `security-scan` — Scan de vulnérabilités
4. `performance-test` — Tests de performance
5. `documentation-gen` — Génération de docs
6. `test-generator` — Génération de tests
7. `refactoring` — Refactoring assisté
8. `deployment` — Déploiement automatisé
9. `monitoring` — Surveillance et alerting
10. `backup-restore` — Gestion des backups

### Skills Frontend (8)
11. `react-optimization` — Optimisation React
12. `css-architecture` — Architecture CSS/SCSS
13. `responsive-design` — Design responsive
14. `accessibility-audit` — Audit accessibilité
15. `storybook-setup` — Configuration Storybook
16. `pwa-generator` — Génération PWA
17. `ui-testing` — Tests UI (Cypress/Playwright)
18. `bundle-analysis` — Analyse de bundle

### Skills Backend (7)
19. `api-design` — Design d'APIs REST/GraphQL
20. `database-optimization` — Optimisation DB
21. `caching-strategy` — Stratégies de cache
22. `microservices-setup` — Setup microservices
23. `queue-management` — Gestion de files
24. `auth-implementation` — Auth JWT/OAuth
25. `rate-limiting` — Rate limiting

### Skills DevOps (5)
26. `docker-containerization` — Containerisation
27. `ci-cd-pipeline` — Pipelines CI/CD
28. `kubernetes-deployment` — Déploiement K8s
29. `infrastructure-as-code` — IaC (Terraform/Pulumi)
30. `log-aggregation` — Agrégation de logs

### Skills Émergentes (illimitées)
Les agents peuvent créer de nouvelles skills dynamiquement :
- Détection de pattern → Création skill
- Nouvelle technologie → Auto-formation
- Répétition de tâche → Automation skill

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- Git
- Docker (optionnel)

### Installation

```bash
# Cloner le repo
git clone https://github.com/juniorbakola-source/voc-flow-control.git
cd voc-flow-control

# Installer les dépendances
./scripts/setup.sh

# Configurer les agents
./scripts/configure-agents.sh

# Lancer l'orchestrateur
./scripts/start-orchestrator.sh
```

### Utilisation Basique

```bash
# Taguer une tâche pour un agent
# Dans ton code, ajoute un commentaire :
# [ARIA] Refactoriser ce composant avec React Query
# [KAEL] Optimiser cette requête SQL
# [SENTRY] Vérifier la sécurité de cette API
# [FIXER] Investiger ce bug de pagination

# L'agent concerné traitera la tâche automatiquement
```

## 🎨 Interface Utilisateur

### Dashboard Principal

```
┌─────────────────────────────────────────────────────────┐
│  VOC Flow Control - Dashboard                          │
├─────────────────────────────────────────────────────────┤
│  🎨 Aria    ● Online  │  ⚙️ Kael    ● Online           │
│  🔒 Sentry  ● Online  │  🔍 Fixer   ● Online           │
├─────────────────────────────────────────────────────────┤
│  📊 Projets en cours                                   │
│  ├─ voc-flow-control    [████████░░] 80%              │
│  └─ narla-website       [██████░░░░] 60%              │
├─────────────────────────────────────────────────────────┤
│  🔔 Actions requises                                   │
│  • [SENTRY] CVE critique détectée dans lodash          │
│  • [FIXER] Tests échouant sur auth.service.ts          │
│  • [ARIA] Optimisation mobile recommandée             │
└─────────────────────────────────────────────────────────┘
```

### Chat avec les Agents

```bash
# Via l'interface web
# Ou ligne de commande :
./scripts/chat-with.sh aria "Crée-moi un formulaire de contact"
```

## 🧬 Auto-Génération d'Agents

### Quand un agent génère un autre agent

Si une tâche est trop complexe ou nécessite une expertise spécifique, l'agent peut générer un **agent fils** :

```yaml
# Exemple: Kael génère un agent spécialisé
agent_parent: Kael
tache: "Implémenter un système de microservices avec Kafka"
decision: "Générer agent spécialisé"

agent_genere:
  nom: "KafkaArchitect"
  expertise: ["Apache Kafka", "Event Sourcing", "CQRS"]
  duree_de_vie: "Jusqu'à complétion de la tâche"
  skills_injectees: ["kafka-setup", "event-driven-design"]
```

### Processus de Génération

1. **Analyse** : L'agent évalue la complexité
2. **Décision** : Si complexité > seuil → génération
3. **Création** : Création du fichier agent spécialisé
4. **Injection** : Transfert des skills pertinentes
5. **Exécution** : L'agent fils traite la tâche
6. **Fusion** : Rapport à l'agent parent, destruction

## 🛠️ Création de Skills

### Manuellement

```bash
./scripts/create-skill.sh --name "nom-du-skill" --category "frontend"
```

### Automatiquement (par les agents)

Les agents détectent les patterns répétitifs et proposent la création de skills :

```
[ARIA] Pattern détecté: "Création de formulaire React Hook Form + Zod"
       Proposition: Créer skill "react-form-template" ?
       [Oui] [Non] [Modifier]
```

### Structure d'une Skill

```yaml
# skills/frontend/react-form-template/skill.yaml
name: react-form-template
category: frontend
description: Génère un formulaire React avec Hook Form et Zod
version: 1.0.0
author: Aria
dependencies:
  - react
  - react-hook-form
  - zod
inputs:
  - name: formName
    type: string
    required: true
  - name: fields
    type: array
    required: true
outputs:
  - component.tsx
  - validation.ts
  - types.ts
template: |
  // Généré par skill react-form-template
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  
  export const {{formName}}Form = () => {
    // ...
  };
```

## 📡 Communication Inter-Agents

### Protocole de Message

```json
{
  "from": "Kael",
  "to": "Sentry",
  "type": "REQUEST_AUDIT",
  "payload": {
    "target": "/api/payment",
    "priority": "HIGH",
    "deadline": "2024-04-12T10:00:00Z"
  },
  "context": {
    "project": "voc-flow-control",
    "task_id": "TASK-123"
  }
}
```

### Types de Messages

- `REQUEST` — Demande d'action
- `RESPONSE` — Réponse à une demande
- `NOTIFY` — Notification d'événement
- `DELEGATE` — Délégation de tâche
- `REPORT` — Rapport de fin de tâche

## 🔧 Configuration Avancée

### Personnaliser les Agents

```yaml
# config/agents.yaml
agents:
  aria:
    model: google/gemini-2.5-flash
    heartbeat_interval: 7200  # 2h
    skills_priority:
      - react-optimization
      - accessibility-audit
    auto_create_skills: true
    max_concurrent_tasks: 3
    
  kael:
    model: google/gemini-2.5-flash
    heartbeat_interval: 7200
    database_preference: postgresql
    cache_strategy: redis
```

### Variables d'Environnement

```bash
# .env
AGENT_MODEL_DEFAULT=google/gemini-2.5-flash
AGENT_HEARTBEAT_ENABLED=true
AGENT_AUTO_ESCALATION=true
AGENT_MAX_SKILLS_CACHE=100
INTERFACE_PORT=3000
ORCHESTRATOR_LOG_LEVEL=info
```

## 📊 Monitoring et Observabilité

### Métriques Collectées

- Temps de réponse par agent
- Taux de succès des tâches
- Skills les plus utilisées
- Erreurs et exceptions
- Utilisation des ressources

### Dashboard Grafana (optionnel)

```bash
./scripts/setup-monitoring.sh
```

## 🤝 Contribution

### Ajouter une Skill

1. Créer le dossier dans `skills/{category}/`
2. Ajouter `skill.yaml` et scripts
3. Tester avec `./scripts/test-skill.sh`
4. Soumettre une PR

### Créer un Nouvel Agent

```bash
./scripts/generate-agent.sh \
  --name "DevOpsMaster" \
  --expertise "docker,kubernetes,terraform" \
  --trigger "infrastructure-tasks"
```

## 📜 Roadmap

- [x] 4 agents principaux
- [x] Système de 30+ skills
- [x] Interface graphique web
- [ ] Application mobile de monitoring
- [ ] Intégration IDE (VS Code extension)
- [ ] Mode "Swarm" (plusieurs agents sur une tâche)
- [ ] Apprentissage automatique des patterns

## 📝 License

MIT © 2024 Narla Solutions

---

**Built with ❤️ by OpenClaw for Johan**
