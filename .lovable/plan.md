
## Plan : Synchronisation des données du dashboard

### 1. Tables à créer
- **`deliveries`** : Table pour les données de livraison (numéro commande, date commande, date livraison, statut, etc.)
  - Permet de calculer le délai moyen de livraison
  - Permet de compter le nombre total de commandes expédiées
  - Import CSV/Excel pour mise à jour en masse

- **`cost_non_quality`** : Table simple avec une seule ligne éditable pour le coût de non-qualité actuel

### 2. KPIs synchronisés
- **Délai Livraison** = Moyenne des (date_livraison - date_commande) depuis la table `deliveries`
- **Exactitude Commande** = 1 - (Plaintes "erreur commande" depuis vocData / Total commandes expédiées depuis `deliveries`)
- **Coût Non-Qualité** = Valeur éditable depuis `cost_non_quality`

### 3. Interface utilisateur
- Page/modale d'administration pour :
  - Importer un fichier CSV dans la table `deliveries`
  - Éditer la valeur du coût de non-qualité
- Les KPIs se mettent à jour automatiquement

### 4. Données existantes (vocData)
- Les plaintes clients restent dans le code statique pour l'instant (559 plaintes dont 102 erreurs commande)
- Le calcul d'exactitude commande utilisera ces données + le total commandes de la DB
