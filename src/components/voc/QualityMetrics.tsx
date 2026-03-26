import { motion } from "framer-motion";
import { Factory, Truck, TrendingDown, TrendingUp, Gauge, AlertTriangle } from "lucide-react";

interface MetricItem {
  label: string;
  value: number;
  target: number;
  unit: string;
  trend: number;
  status: "on-track" | "at-risk" | "off-track";
}

const supplierMetrics: MetricItem[] = [
  { label: "DPMO Fournisseurs", value: 18500, target: 6210, unit: "dpmo", trend: -12.3, status: "off-track" },
  { label: "PPM Fournisseurs", value: 4200, target: 1000, unit: "ppm", trend: -8.1, status: "off-track" },
  { label: "Lot Rejeté (LR)", value: 6.8, target: 2.0, unit: "%", trend: -4.5, status: "off-track" },
];

const internalMetrics: MetricItem[] = [
  { label: "PPM Internes", value: 1380, target: 500, unit: "ppm", trend: -15.2, status: "off-track" },
  { label: "Cpk Assemblage", value: 0.92, target: 1.33, unit: "", trend: 5.8, status: "at-risk" },
  { label: "Cpk Calibration", value: 1.15, target: 1.33, unit: "", trend: 3.2, status: "at-risk" },
];

const statusBorder = {
  "on-track": "border-success/40",
  "at-risk": "border-warning/40",
  "off-track": "border-destructive/40",
};

const statusDot = {
  "on-track": "bg-success",
  "at-risk": "bg-warning",
  "off-track": "bg-destructive",
};

function MetricCard({ m, i }: { m: MetricItem; i: number }) {
  const lowerIsBetter = m.unit === "ppm" || m.unit === "dpmo" || m.unit === "%";
  const trendIsGood = lowerIsBetter ? m.trend < 0 : m.trend > 0;
  const progress = lowerIsBetter
    ? Math.min((m.target / m.value) * 100, 100)
    : Math.min((m.value / m.target) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.07, duration: 0.35 }}
      className={`rounded-lg border bg-card p-3 ${statusBorder[m.status]} hover:scale-[1.02] transition-transform cursor-default`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider truncate">
          {m.label}
        </span>
        <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${statusDot[m.status]}`} />
      </div>
      <div className="flex items-end gap-1.5">
        <span className="text-xl font-mono font-bold text-foreground">
          {m.value.toLocaleString("fr-FR")}
        </span>
        {m.unit && <span className="text-[10px] text-muted-foreground mb-0.5">{m.unit}</span>}
      </div>
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[10px] text-muted-foreground font-mono">
          Cible: {m.target.toLocaleString("fr-FR")}{m.unit}
        </span>
        <div className={`flex items-center gap-0.5 text-[10px] font-mono ${trendIsGood ? "text-success" : "text-destructive"}`}>
          {m.trend > 0 ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
          {Math.abs(m.trend)}%
        </div>
      </div>
      <div className="mt-2 h-0.5 w-full rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ delay: i * 0.07 + 0.3, duration: 0.6 }}
          className={`h-full rounded-full ${
            m.status === "on-track" ? "bg-success" : m.status === "at-risk" ? "bg-warning" : "bg-destructive"
          }`}
        />
      </div>
    </motion.div>
  );
}

export function QualityMetrics() {
  return (
    <div className="space-y-4">
      {/* Fournisseurs */}
      <div className="rounded-lg border bg-card/60 backdrop-blur-sm p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-6 rounded bg-warning/15 border border-warning/30 flex items-center justify-center">
            <Truck className="h-3 w-3 text-warning" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            Métriques Fournisseurs
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {supplierMetrics.map((m, i) => (
            <MetricCard key={m.label} m={m} i={i} />
          ))}
        </div>
      </div>

      {/* Internes */}
      <div className="rounded-lg border bg-card/60 backdrop-blur-sm p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-6 rounded bg-info/15 border border-info/30 flex items-center justify-center">
            <Gauge className="h-3 w-3 text-info" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            Métriques Internes (PPM & Cpk)
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {internalMetrics.map((m, i) => (
            <MetricCard key={m.label} m={m} i={i + 3} />
          ))}
        </div>
      </div>
    </div>
  );
}
