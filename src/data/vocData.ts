// Données VOC pour le tableau de bord

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

export const vocInputs: VOCInput[] = [
  { id: "social", source: "Réseaux Sociaux", icon: "📡", count: 342, trend: -8.2, status: "active", lastUpdate: "il y a 2 min" },
  { id: "complaints", source: "Réclamations Clients", icon: "📋", count: 87, trend: 12.5, status: "warning", lastUpdate: "il y a 15 min" },
  { id: "rework", source: "Reprises en Production", icon: "🔧", count: 156, trend: -3.1, status: "active", lastUpdate: "il y a 5 min" },
  { id: "supplier", source: "NC Fournisseurs", icon: "📦", count: 43, trend: 22.0, status: "critical", lastUpdate: "il y a 1 h" },
  { id: "product", source: "NC Produit Fini", icon: "⚠️", count: 28, trend: -15.4, status: "active", lastUpdate: "il y a 30 min" },
];

export const vocIssues: VOCIssue[] = [
  { id: "I-001", title: "Défauts de finition surface Pièce A", source: "NC Produit Fini", kano: "must-be", ctq: "Rugosité ≤ 1.6μm", frequency: 45, severity: 9, kanoWeight: 3, compositeScore: 1215, department: "Usinage", product: "Pièce A" },
  { id: "I-002", title: "Retards de livraison T1", source: "Réclamations Clients", kano: "must-be", ctq: "OTD ≥ 95%", frequency: 38, severity: 8, kanoWeight: 3, compositeScore: 912, department: "Logistique", product: "Tous" },
  { id: "I-003", title: "Dommages emballage en transit", source: "Réclamations Clients", kano: "performance", ctq: "Taux casse ≤ 0.5%", frequency: 29, severity: 7, kanoWeight: 2, compositeScore: 406, department: "Emballage", product: "Pièce B" },
  { id: "I-004", title: "Dérive tolérance dimensionnelle", source: "Reprises en Production", kano: "must-be", ctq: "Cpk ≥ 1.33", frequency: 52, severity: 8, kanoWeight: 3, compositeScore: 1248, department: "Usinage", product: "Pièce C" },
  { id: "I-005", title: "Variation dureté matière première", source: "NC Fournisseurs", kano: "must-be", ctq: "Dureté 58-62 HRC", frequency: 18, severity: 9, kanoWeight: 3, compositeScore: 486, department: "CQ Entrée", product: "Pièce A" },
  { id: "I-006", title: "Perception négative sur réseaux sociaux", source: "Réseaux Sociaux", kano: "attractive", ctq: "NPS ≥ 50", frequency: 67, severity: 4, kanoWeight: 1, compositeScore: 268, department: "Marketing", product: "Tous" },
  { id: "I-007", title: "Inconsistance couple de serrage", source: "Reprises en Production", kano: "performance", ctq: "Couple ± 5%", frequency: 34, severity: 6, kanoWeight: 2, compositeScore: 408, department: "Assemblage", product: "Pièce D" },
  { id: "I-008", title: "Porosité soudure sous-ensemble", source: "NC Produit Fini", kano: "must-be", ctq: "Porosité ≤ 2%", frequency: 22, severity: 9, kanoWeight: 3, compositeScore: 594, department: "Soudure", product: "Pièce E" },
];

export const actions: Action[] = [
  { id: "A-001", issueId: "I-004", title: "Recalibrer offsets outils CNC", type: "corrective", status: "in-progress", assignee: "J. Martin", dueDate: "2026-03-22", effectiveness: null },
  { id: "A-002", issueId: "I-004", title: "Implémenter cartes SPC Ligne 3", type: "preventive", status: "open", assignee: "S. Chen", dueDate: "2026-04-01", effectiveness: null },
  { id: "A-003", issueId: "I-001", title: "Remplacer meule d'usinage usée", type: "corrective", status: "completed", assignee: "R. Kumar", dueDate: "2026-03-18", effectiveness: 82 },
  { id: "A-004", issueId: "I-002", title: "Ajouter stock tampon top 10 SKU", type: "corrective", status: "overdue", assignee: "L. Torres", dueDate: "2026-03-15", effectiveness: null },
  { id: "A-005", issueId: "I-005", title: "Audit inspection entrée fournisseur", type: "preventive", status: "in-progress", assignee: "M. Ali", dueDate: "2026-03-25", effectiveness: null },
  { id: "A-006", issueId: "I-008", title: "Recycler opérateurs soudure sur WPS", type: "corrective", status: "completed", assignee: "D. Novak", dueDate: "2026-03-17", effectiveness: 74 },
];

export const kpis: KPIData[] = [
  { label: "Satisfaction Client", value: 78, target: 85, unit: "%", trend: 2.1, status: "at-risk" },
  { label: "Conformité CTQ", value: 91, target: 95, unit: "%", trend: -1.3, status: "at-risk" },
  { label: "Taux Défauts (PPM)", value: 1240, target: 1000, unit: "ppm", trend: -8.5, status: "off-track" },
  { label: "Temps Réponse Moy.", value: 4.2, target: 3.0, unit: "jours", trend: -12, status: "off-track" },
  { label: "Taux Clôture Actions", value: 68, target: 80, unit: "%", trend: 5.4, status: "at-risk" },
  { label: "Livraison à Temps", value: 93.2, target: 95, unit: "%", trend: 1.8, status: "at-risk" },
];

export const paretoData = [
  { issue: "Tolérance Dim.", count: 52, cumulative: 22.8 },
  { issue: "Finition Surface", count: 45, cumulative: 42.5 },
  { issue: "Retard Livraison", count: 38, cumulative: 59.2 },
  { issue: "Couple Serrage", count: 34, cumulative: 74.1 },
  { issue: "Emballage", count: 29, cumulative: 86.8 },
  { issue: "Porosité Soudure", count: 22, cumulative: 96.5 },
  { issue: "Var. Dureté", count: 8, cumulative: 100 },
];

export const trendData = [
  { month: "Oct", plaintes: 95, reprises: 180, ncFournisseur: 52, ncProduit: 38 },
  { month: "Nov", plaintes: 88, reprises: 165, ncFournisseur: 48, ncProduit: 35 },
  { month: "Déc", plaintes: 102, reprises: 172, ncFournisseur: 55, ncProduit: 42 },
  { month: "Jan", plaintes: 92, reprises: 158, ncFournisseur: 41, ncProduit: 30 },
  { month: "Fév", plaintes: 85, reprises: 148, ncFournisseur: 38, ncProduit: 26 },
  { month: "Mar", plaintes: 87, reprises: 156, ncFournisseur: 43, ncProduit: 28 },
];

export const heatmapData = [
  { department: "Usinage", mustBe: 8, performance: 3, attractive: 1 },
  { department: "Assemblage", mustBe: 2, performance: 5, attractive: 2 },
  { department: "Soudure", mustBe: 6, performance: 1, attractive: 0 },
  { department: "Logistique", mustBe: 4, performance: 3, attractive: 1 },
  { department: "Emballage", mustBe: 1, performance: 4, attractive: 2 },
  { department: "CQ Entrée", mustBe: 5, performance: 2, attractive: 0 },
];
