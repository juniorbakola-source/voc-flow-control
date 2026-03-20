// Mock VOC data for the dashboard

export type KanoCategory = "must-be" | "performance" | "attractive";
export type ActionStatus = "open" | "in-progress" | "completed" | "overdue";
export type Severity = "critical" | "high" | "medium" | "low";

export interface VOCInput {
  id: string;
  source: string;
  icon: string;
  count: number;
  trend: number; // percentage change
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
  { id: "social", source: "Social Media", icon: "📡", count: 342, trend: -8.2, status: "active", lastUpdate: "2 min ago" },
  { id: "complaints", source: "Customer Complaints", icon: "📋", count: 87, trend: 12.5, status: "warning", lastUpdate: "15 min ago" },
  { id: "rework", source: "Production Rework", icon: "🔧", count: 156, trend: -3.1, status: "active", lastUpdate: "5 min ago" },
  { id: "supplier", source: "Supplier NCRs", icon: "📦", count: 43, trend: 22.0, status: "critical", lastUpdate: "1 hr ago" },
  { id: "product", source: "Product NCRs", icon: "⚠️", count: 28, trend: -15.4, status: "active", lastUpdate: "30 min ago" },
];

export const vocIssues: VOCIssue[] = [
  { id: "I-001", title: "Surface finish defects on Part A", source: "Product NCRs", kano: "must-be", ctq: "Surface Roughness ≤ 1.6μm", frequency: 45, severity: 9, kanoWeight: 3, compositeScore: 1215, department: "Machining", product: "Part A" },
  { id: "I-002", title: "Late delivery complaints Q1", source: "Customer Complaints", kano: "must-be", ctq: "OTD ≥ 95%", frequency: 38, severity: 8, kanoWeight: 3, compositeScore: 912, department: "Logistics", product: "All" },
  { id: "I-003", title: "Packaging damage in transit", source: "Customer Complaints", kano: "performance", ctq: "Damage Rate ≤ 0.5%", frequency: 29, severity: 7, kanoWeight: 2, compositeScore: 406, department: "Packaging", product: "Part B" },
  { id: "I-004", title: "Dimensional tolerance drift", source: "Production Rework", kano: "must-be", ctq: "Cpk ≥ 1.33", frequency: 52, severity: 8, kanoWeight: 3, compositeScore: 1248, department: "Machining", product: "Part C" },
  { id: "I-005", title: "Raw material hardness variation", source: "Supplier NCRs", kano: "must-be", ctq: "Hardness 58-62 HRC", frequency: 18, severity: 9, kanoWeight: 3, compositeScore: 486, department: "Incoming QC", product: "Part A" },
  { id: "I-006", title: "Negative brand perception on social", source: "Social Media", kano: "attractive", ctq: "NPS ≥ 50", frequency: 67, severity: 4, kanoWeight: 1, compositeScore: 268, department: "Marketing", product: "All" },
  { id: "I-007", title: "Assembly torque inconsistency", source: "Production Rework", kano: "performance", ctq: "Torque ± 5%", frequency: 34, severity: 6, kanoWeight: 2, compositeScore: 408, department: "Assembly", product: "Part D" },
  { id: "I-008", title: "Weld porosity on subassembly", source: "Product NCRs", kano: "must-be", ctq: "Porosity ≤ 2%", frequency: 22, severity: 9, kanoWeight: 3, compositeScore: 594, department: "Welding", product: "Part E" },
];

export const actions: Action[] = [
  { id: "A-001", issueId: "I-004", title: "Recalibrate CNC tool offsets", type: "corrective", status: "in-progress", assignee: "J. Martin", dueDate: "2026-03-22", effectiveness: null },
  { id: "A-002", issueId: "I-004", title: "Implement SPC charting on Line 3", type: "preventive", status: "open", assignee: "S. Chen", dueDate: "2026-04-01", effectiveness: null },
  { id: "A-003", issueId: "I-001", title: "Replace worn grinding wheel", type: "corrective", status: "completed", assignee: "R. Kumar", dueDate: "2026-03-18", effectiveness: 82 },
  { id: "A-004", issueId: "I-002", title: "Add buffer stock for top 10 SKUs", type: "corrective", status: "overdue", assignee: "L. Torres", dueDate: "2026-03-15", effectiveness: null },
  { id: "A-005", issueId: "I-005", title: "Audit supplier incoming inspection", type: "preventive", status: "in-progress", assignee: "M. Ali", dueDate: "2026-03-25", effectiveness: null },
  { id: "A-006", issueId: "I-008", title: "Retrain welding operators on WPS", type: "corrective", status: "completed", assignee: "D. Novak", dueDate: "2026-03-17", effectiveness: 74 },
];

export const kpis: KPIData[] = [
  { label: "Customer Satisfaction", value: 78, target: 85, unit: "%", trend: 2.1, status: "at-risk" },
  { label: "CTQ Compliance", value: 91, target: 95, unit: "%", trend: -1.3, status: "at-risk" },
  { label: "Defect Rate (PPM)", value: 1240, target: 1000, unit: "ppm", trend: -8.5, status: "off-track" },
  { label: "Avg Response Time", value: 4.2, target: 3.0, unit: "days", trend: -12, status: "off-track" },
  { label: "Action Closure Rate", value: 68, target: 80, unit: "%", trend: 5.4, status: "at-risk" },
  { label: "On-Time Delivery", value: 93.2, target: 95, unit: "%", trend: 1.8, status: "at-risk" },
];

export const paretoData = [
  { issue: "Dim. Tolerance", count: 52, cumulative: 22.8 },
  { issue: "Surface Finish", count: 45, cumulative: 42.5 },
  { issue: "Late Delivery", count: 38, cumulative: 59.2 },
  { issue: "Assembly Torque", count: 34, cumulative: 74.1 },
  { issue: "Packaging", count: 29, cumulative: 86.8 },
  { issue: "Weld Porosity", count: 22, cumulative: 96.5 },
  { issue: "Hardness Var.", count: 8, cumulative: 100 },
];

export const trendData = [
  { month: "Oct", complaints: 95, rework: 180, supplierNCR: 52, productNCR: 38 },
  { month: "Nov", complaints: 88, rework: 165, supplierNCR: 48, productNCR: 35 },
  { month: "Dec", complaints: 102, rework: 172, supplierNCR: 55, productNCR: 42 },
  { month: "Jan", complaints: 92, rework: 158, supplierNCR: 41, productNCR: 30 },
  { month: "Feb", complaints: 85, rework: 148, supplierNCR: 38, productNCR: 26 },
  { month: "Mar", complaints: 87, rework: 156, supplierNCR: 43, productNCR: 28 },
];

export const heatmapData = [
  { department: "Machining", mustBe: 8, performance: 3, attractive: 1 },
  { department: "Assembly", mustBe: 2, performance: 5, attractive: 2 },
  { department: "Welding", mustBe: 6, performance: 1, attractive: 0 },
  { department: "Logistics", mustBe: 4, performance: 3, attractive: 1 },
  { department: "Packaging", mustBe: 1, performance: 4, attractive: 2 },
  { department: "Incoming QC", mustBe: 5, performance: 2, attractive: 0 },
];
