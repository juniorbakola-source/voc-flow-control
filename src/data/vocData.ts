// Données VOC réelles pour ELKA Suspension — Fabricant d'amortisseurs haute performance
// Basé sur données plaintes 2024-2026, inspections finales, entretiens VOC et métriques CTQ

export type KanoCategory = "must-be" | "performance" | "attractive";
export type ActionStatus = "open" | "in-progress" | "completed" | "overdue";
export type Severity = "critical" | "high" | "medium" | "low";

export interface VOCInput {
  id: string;
  source: string;
  icon: string;
  count: number;
  trend: number;
  status: "active" | "warning" | "critical";
  lastUpdate: string;
}

export interface VOCIssue {
  id: string;
  title: string;
  source: string;
  kano: KanoCategory;
  ctq: string;
  frequency: number;
  severity: number;
  kanoWeight: number;
  compositeScore: number;
  department: string;
  product: string;
}

export interface Action {
  id: string;
  issueId: string;
  title: string;
  type: "corrective" | "preventive";
  status: ActionStatus;
  assignee: string;
  dueDate: string;
  effectiveness: number | null;
}

export interface KPIData {
  label: string;
  value: number;
  target: number;
  unit: string;
  trend: number;
  status: "on-track" | "at-risk" | "off-track";
}

// --- Sources VOC réelles (données plaintes 559+ et inspections 1095+) ---
export const vocInputs: VOCInput[] = [
  { id: "plaintes", source: "Plaintes Clients", icon: "📋", count: 559, trend: 8.7, status: "warning", lastUpdate: "il y a 10 min" },
  { id: "social", source: "Avis en Ligne & Réseaux", icon: "📡", count: 150, trend: -5.3, status: "active", lastUpdate: "il y a 5 min" },
  { id: "nc-produit", source: "NC Produit Fini (Inspection)", icon: "⚠️", count: 151, trend: 12.4, status: "critical", lastUpdate: "il y a 20 min" },
  { id: "nc-fournisseur", source: "NC Fournisseurs (Réception)", icon: "📦", count: 1561, trend: 18.5, status: "critical", lastUpdate: "il y a 1 h" },
  { id: "reprises", source: "Reprises en Production", icon: "🔧", count: 98, trend: -4.2, status: "active", lastUpdate: "il y a 3 min" },
];

// --- Problèmes priorisés basés sur les vraies familles de plaintes ELKA ---
export const vocIssues: VOCIssue[] = [
  {
    id: "I-001", title: "Fuite d'huile sur amortisseurs", source: "Plaintes Clients",
    kano: "must-be", ctq: "Taux de fuite ≤ 0 (PPM)", frequency: 200, severity: 9, kanoWeight: 3,
    compositeScore: 5400, department: "Assemblage", product: "Tous modèles"
  },
  {
    id: "I-002", title: "Erreur vente (mauvaise config/BOM)", source: "Plaintes Clients",
    kano: "must-be", ctq: "Taux erreur expédition ≤ 1%", frequency: 102, severity: 7, kanoWeight: 3,
    compositeScore: 2142, department: "Ventes / Service Client", product: "Tous"
  },
  {
    id: "I-003", title: "Amortisseur brisé / composant brisé", source: "Plaintes Clients",
    kano: "must-be", ctq: "Failure rate ≤ 500 PPM", frequency: 55, severity: 9, kanoWeight: 3,
    compositeScore: 1485, department: "Ingénierie / Qualité", product: "Tous modèles"
  },
  {
    id: "I-004", title: "Assemblage non conforme", source: "Plaintes Clients",
    kano: "must-be", ctq: "Taux NC assemblage ≤ 0.5%", frequency: 45, severity: 8, kanoWeight: 3,
    compositeScore: 1080, department: "Assemblage", product: "Tous modèles"
  },
  {
    id: "I-005", title: "Problème de fitment / ressort non conforme", source: "Plaintes Clients",
    kano: "performance", ctq: "Coefficient d'amortissement ± 5%", frequency: 40, severity: 7, kanoWeight: 2,
    compositeScore: 560, department: "Calibration / Ingénierie", product: "UTV / Truck"
  },
  {
    id: "I-006", title: "Bruit anormal en fonctionnement", source: "Plaintes Clients",
    kano: "performance", ctq: "NVH ≤ seuil acceptable", frequency: 27, severity: 6, kanoWeight: 2,
    compositeScore: 324, department: "Assemblage / Calibration", product: "Tous modèles"
  },
  {
    id: "I-007", title: "O-ring déborde (inspection finale)", source: "NC Produit Fini",
    kano: "must-be", ctq: "Étanchéité 100% conforme", frequency: 48, severity: 8, kanoWeight: 3,
    compositeScore: 1152, department: "Assemblage", product: "Tous modèles"
  },
  {
    id: "I-008", title: "Erreur sur carte de calibration", source: "NC Produit Fini",
    kano: "must-be", ctq: "Documentation 100% exacte", frequency: 35, severity: 7, kanoWeight: 3,
    compositeScore: 735, department: "Calibration", product: "Tous modèles"
  },
  {
    id: "I-009", title: "Perception négative SAV en ligne", source: "Avis en Ligne",
    kano: "attractive", ctq: "NPS ≥ 50 / Score ≥ 4.5/5", frequency: 50, severity: 4, kanoWeight: 1,
    compositeScore: 200, department: "Service Client", product: "Tous"
  },
];

// --- Actions CAPA basées sur les vrais problèmes ---
export const actions: Action[] = [
  { id: "A-001", issueId: "I-001", title: "Analyse cause racine fuites d'huile — joints et procédé assemblage", type: "corrective", status: "in-progress", assignee: "Alex (QC)", dueDate: "2026-03-25", effectiveness: null },
  { id: "A-002", issueId: "I-001", title: "Implémenter test étanchéité 100% sur ligne d'assemblage", type: "preventive", status: "open", assignee: "Ingénierie", dueDate: "2026-04-15", effectiveness: null },
  { id: "A-003", issueId: "I-002", title: "Réviser processus validation commande et BOM avant expédition", type: "corrective", status: "in-progress", assignee: "Ventes", dueDate: "2026-03-30", effectiveness: null },
  { id: "A-004", issueId: "I-004", title: "Formation opérateurs assemblage — standards de travail", type: "preventive", status: "open", assignee: "Production", dueDate: "2026-04-10", effectiveness: null },
  { id: "A-005", issueId: "I-007", title: "Remplacer lot O-rings défectueux et ajuster procédé", type: "corrective", status: "completed", assignee: "Alex (QC)", dueDate: "2026-03-18", effectiveness: 85 },
  { id: "A-006", issueId: "I-003", title: "Analyse durabilité terrain — benchmarking conditions extrêmes", type: "preventive", status: "in-progress", assignee: "R&D", dueDate: "2026-04-30", effectiveness: null },
  { id: "A-007", issueId: "I-008", title: "Digitaliser cartes de calibration pour éliminer erreurs manuelles", type: "preventive", status: "overdue", assignee: "Calibration", dueDate: "2026-03-15", effectiveness: null },
];

// --- KPIs basés sur les vraies métriques CTQ d'ELKA ---
export const kpis: KPIData[] = [
  { label: "Fiabilité (PPM)", value: 137900, target: 10000, unit: "ppm", trend: -6.5, status: "off-track" },
  { label: "Satisfaction Client (NPS)", value: 4.0, target: 4.5, unit: "/5", trend: 2.1, status: "at-risk" },
  { label: "Taux Plaintes Fermées", value: 100, target: 100, unit: "%", trend: 0, status: "on-track" },
  { label: "Délai Livraison", value: 12, target: 7, unit: "jours", trend: -10, status: "off-track" },
  { label: "Exactitude Commande", value: 82, target: 95, unit: "%", trend: 5.4, status: "off-track" },
  { label: "Coût Non-Qualité", value: 45000, target: 20000, unit: "$", trend: 18.5, status: "off-track" },
];

// --- Pareto basé sur les vraies familles de problèmes (Top 5 = Fuite 36%, Erreur vente 18%, etc.) ---
export const paretoData = [
  { issue: "Fuite d'huile", count: 200, cumulative: 35.8 },
  { issue: "Erreur vente", count: 102, cumulative: 54.0 },
  { issue: "Amort. brisé", count: 55, cumulative: 63.9 },
  { issue: "Assemblage NC", count: 45, cumulative: 71.9 },
  { issue: "Fitment/Ressort", count: 40, cumulative: 79.1 },
  { issue: "Autre", count: 29, cumulative: 84.3 },
  { issue: "Bruit", count: 27, cumulative: 89.1 },
  { issue: "Composant endommagé", count: 22, cumulative: 93.0 },
  { issue: "Emballage NC", count: 20, cumulative: 96.6 },
  { issue: "Insatisfaction", count: 19, cumulative: 100 },
];

// --- Tendance mensuelle basée sur les vraies données Oct 2025 – Mar 2026 ---
export const trendData = [
  { month: "Oct", plaintes: 19, inspectionsNC: 28, ncFournisseur: 42, rma: 12 },
  { month: "Nov", plaintes: 24, inspectionsNC: 32, ncFournisseur: 38, rma: 15 },
  { month: "Déc", plaintes: 16, inspectionsNC: 25, ncFournisseur: 45, rma: 10 },
  { month: "Jan", plaintes: 16, inspectionsNC: 30, ncFournisseur: 35, rma: 14 },
  { month: "Fév", plaintes: 14, inspectionsNC: 22, ncFournisseur: 32, rma: 8 },
  { month: "Mar", plaintes: 12, inspectionsNC: 18, ncFournisseur: 37, rma: 6 },
];

// --- Heatmap Département × Kano (basé sur analyse réelle) ---
export const heatmapData = [
  { department: "Assemblage", mustBe: 9, performance: 3, attractive: 1 },
  { department: "Calibration", mustBe: 6, performance: 4, attractive: 0 },
  { department: "Ventes / Service Client", mustBe: 5, performance: 2, attractive: 3 },
  { department: "Ingénierie / R&D", mustBe: 4, performance: 3, attractive: 2 },
  { department: "Logistique / Emballage", mustBe: 3, performance: 2, attractive: 1 },
  { department: "CQ Réception", mustBe: 7, performance: 1, attractive: 0 },
  { department: "Service Client (SAV)", mustBe: 1, performance: 2, attractive: 4 },
];
