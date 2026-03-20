import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { KPIData } from "@/data/vocData";

const statusStyles = {
  "on-track": "border-success/30 glow-primary",
  "at-risk": "border-warning/30 glow-accent",
  "off-track": "border-destructive/30 glow-destructive",
};

const statusDot = {
  "on-track": "bg-success",
  "at-risk": "bg-warning",
  "off-track": "bg-destructive",
};

export function KPICard({ data, index }: { data: KPIData; index: number }) {
  const isPositiveTrend = data.trend > 0;
  const lowerIsBetter = data.unit === "ppm" || data.unit === "jours";
  const trendIsGood = lowerIsBetter ? !isPositiveTrend : isPositiveTrend;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className={`relative rounded-lg border bg-card p-4 ${statusStyles[data.status]}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {data.label}
        </span>
        <span className={`h-2 w-2 rounded-full animate-pulse-glow ${statusDot[data.status]}`} />
      </div>

      <div className="flex items-end gap-2">
        <span className="text-2xl font-mono font-bold text-foreground">
          {data.value.toLocaleString("fr-FR")}
        </span>
        <span className="text-xs text-muted-foreground mb-1">{data.unit}</span>
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-muted-foreground font-mono">
          Cible: {data.target.toLocaleString("fr-FR")}{data.unit}
        </span>
        <div className={`flex items-center gap-1 text-xs font-mono ${trendIsGood ? "text-success" : "text-destructive"}`}>
          {isPositiveTrend ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {Math.abs(data.trend)}%
        </div>
      </div>

      <div className="mt-3 h-1 w-full rounded-full bg-secondary">
        <div
          className={`h-full rounded-full transition-all ${
            data.status === "on-track" ? "bg-success" : data.status === "at-risk" ? "bg-warning" : "bg-destructive"
          }`}
          style={{
            width: `${Math.min(
              (data.unit === "ppm" || data.unit === "jours"
                ? (data.target / data.value) * 100
                : (data.value / data.target) * 100),
              100
            )}%`,
          }}
        />
      </div>
    </motion.div>
  );
}
