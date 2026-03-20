// Données VOC pour ELKA Suspension — Fabricant d'amortisseurs

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
  { id: "social", source: "Réseaux Sociaux", icon: "📡", count: 215, trend: -5.3, status: "active", lastUpdate: "il y a 5 min" },
  { id: "complaints", source: "Réclamations Clients", icon: "📋", count: 64, trend: 8.7, status: "warning", lastUpdate: "il y a 10 min" },
  { id: "rework", source: "Reprises en Production", icon: "🔧", count: 98, trend: -4.2, status: "active", lastUpdate: "il y a 3 min" },
  { id: "supplier", source: "NC Fournisseurs", icon: "📦", count: 37, trend: 18.5, status: "critical", lastUpdate: "il y a 1 h" },
  { id: "product", source: "NC Produit Fini", icon: "⚠️", count: 22, trend: -11.2, status: "active", lastUpdate: "il y a 20 min" },
];

export const vocIssues: VOCIssue[] = [
  { id: "I-001", title: "Fuite d'huile sur amortisseur Stage 5", source: "NC Produit Fini", kano: "must-be", ctq: "Étanchéité ≤ 0 ml/1000 cycles", frequency: 38, severity: 9, kanoWeight: 3, compositeScore: 1026, department: "Assemblage", product: "Stage 5 UTV" },
  { id: "I-002", title: "Retards de livraison commandes OEM", source: "Réclamations Clients", kano: "must-be", ctq: "OTD ≥ 95%", frequency: 34, severity: 8, kanoWeight: 3, compositeScore: 816, department: "Logistique", product: "Tous" },
  { id: "I-003", title: "Dommages emballage en transit", source: "Réclamations Clients", kano: "performance", ctq: "Taux casse ≤ 0.5%", frequency: 25, severity: 7, kanoWeight: 2, compositeScore: 350, department: "Emballage", product: "Coilover 2.5\"" },
  { id: "I-004", title: "Dérive force amortissement hors tolérance", source: "Reprises en Production", kano: "must-be", ctq: "Force ± 5% spec dyno", frequency: 48, severity: 9, kanoWeight: 3, compositeScore: 1296, department: "Calibration", product: "Stage 4 UTV" },
  { id: "I-005", title: "Variation dureté tige de piston fournisseur", source: "NC Fournisseurs", kano: "must-be", ctq: "Dureté 58-62 HRC", frequency: 16, severity: 9, kanoWeight: 3, compositeScore: 432, department: "CQ Réception", product: "Tous" },
  { id: "I-006", title: "Perception négative SAV sur réseaux sociaux", source: "Réseaux Sociaux", kano: "attractive", ctq: "NPS ≥ 50", frequency: 52, severity: 4, kanoWeight: 1, compositeScore: 208, department: "Service Client", product: "Tous" },
  { id: "I-007", title: "Couple de serrage valve inconsistant", source: "Reprises en Production", kano: "performance", ctq: "Couple ± 5% spec", frequency: 31, severity: 6, kanoWeight: 2, compositeScore: 372, department: "Assemblage", product: "IFP 2.0 Truck" },
];

export const actions: Action[] = [
  { id: "A-001", issueId: "I-004", title: "Recalibrer banc dyno et valves de réglage", type: "corrective", status: "in-progress", assignee: "J. Martin", dueDate: "2026-03-22", effectiveness: null },
  { id: "A-002", issueId: "I-004", title: "Implémenter cartes SPC sur ligne assemblage", type: "preventive", status: "open", assignee: "S. Chen", dueDate: "2026-04-01", effectiveness: null },
  { id: "A-003", issueId: "I-001", title: "Remplacer joints toriques lot défectueux", type: "corrective", status: "completed", assignee: "R. Kumar", dueDate: "2026-03-18", effectiveness: 85 },
  { id: "A-004", issueId: "I-002", title: "Ajouter stock tampon composants critiques", type: "corrective", status: "overdue", assignee: "L. Torres", dueDate: "2026-03-15", effectiveness: null },
  { id: "A-005", issueId: "I-005", title: "Audit inspection réception tiges piston", type: "preventive", status: "in-progress", assignee: "M. Ali", dueDate: "2026-03-25", effectiveness: null },
];

export const kpis: KPIData[] = [
  { label: "Satisfaction Client", value: 78, target: 85, unit: "%", trend: 2.1, status: "at-risk" },
  { label: "Conformité CTQ", value: 92, target: 95, unit: "%", trend: -1.0, status: "at-risk" },
  { label: "Taux Défauts (PPM)", value: 1180, target: 1000, unit: "ppm", trend: -6.5, status: "off-track" },
  { label: "Temps Réponse Moy.", value: 3.8, target: 3.0, unit: "jours", trend: -10, status: "off-track" },
  { label: "Taux Clôture Actions", value: 72, target: 80, unit: "%", trend: 5.4, status: "at-risk" },
  { label: "Livraison à Temps", value: 93.5, target: 95, unit: "%", trend: 1.8, status: "at-risk" },
];

export const paretoData = [
  { issue: "Force Amortissement", count: 48, cumulative: 21.6 },
  { issue: "Fuite Huile", count: 38, cumulative: 38.7 },
  { issue: "Retard Livraison", count: 34, cumulative: 54.1 },
  { issue: "Couple Valve", count: 31, cumulative: 68.0 },
  { issue: "Emballage", count: 25, cumulative: 79.3 },
  { issue: "Dureté Tige", count: 16, cumulative: 86.5 },
  { issue: "SAV Réseaux", count: 15, cumulative: 93.2 },
  { issue: "Pression Gaz N₂", count: 15, cumulative: 100 },
];

export const trendData = [
  { month: "Oct", plaintes: 72, reprises: 120, ncFournisseur: 42, ncProduit: 30 },
  { month: "Nov", plaintes: 65, reprises: 108, ncFournisseur: 38, ncProduit: 27 },
  { month: "Déc", plaintes: 78, reprises: 115, ncFournisseur: 45, ncProduit: 34 },
  { month: "Jan", plaintes: 68, reprises: 100, ncFournisseur: 35, ncProduit: 24 },
  { month: "Fév", plaintes: 60, reprises: 92, ncFournisseur: 32, ncProduit: 20 },
  { month: "Mar", plaintes: 64, reprises: 98, ncFournisseur: 37, ncProduit: 22 },
];

export const heatmapData = [
  { department: "Assemblage", mustBe: 7, performance: 4, attractive: 1 },
  { department: "Calibration", mustBe: 8, performance: 3, attractive: 0 },
  { department: "Usinage CNC", mustBe: 5, performance: 2, attractive: 1 },
  { department: "Logistique", mustBe: 4, performance: 3, attractive: 1 },
  { department: "Emballage", mustBe: 1, performance: 4, attractive: 2 },
  { department: "CQ Réception", mustBe: 6, performance: 2, attractive: 0 },
  { department: "Service Client", mustBe: 1, performance: 2, attractive: 3 },
];
