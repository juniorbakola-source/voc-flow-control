import { motion } from "framer-motion";
import { vocInputs } from "@/data/vocData";
import { TrendingUp, TrendingDown } from "lucide-react";

const statusBorder = {
  active: "border-primary/30",
  warning: "border-warning/30",
  critical: "border-destructive/30",
};

const statusPulse = {
  active: "bg-primary",
  warning: "bg-warning",
  critical: "bg-destructive",
};

export function InputChannels() {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-mono text-primary uppercase tracking-widest">▸ Couche Entrée</span>
        <span className="text-xs text-muted-foreground font-mono">— Sources VOC</span>
      </div>
      <div className="space-y-2">
        {vocInputs.map((input, i) => (
          <motion.div
            key={input.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center justify-between p-3 rounded border ${statusBorder[input.status]} bg-secondary/30`}
          >
            <div className="flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full animate-pulse-glow ${statusPulse[input.status]}`} />
              <span className="text-lg">{input.icon}</span>
              <div>
                <div className="text-sm font-medium text-foreground">{input.source}</div>
                <div className="text-xs text-muted-foreground font-mono">{input.lastUpdate}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg font-mono font-bold text-foreground">{input.count}</span>
              <div className={`flex items-center gap-1 text-xs font-mono ${input.trend < 0 ? "text-success" : "text-destructive"}`}>
                {input.trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(input.trend)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t flex justify-between text-xs font-mono text-muted-foreground">
        <span>Total signaux : {vocInputs.reduce((a, b) => a + b.count, 0)}</span>
        <span className="text-primary">Système : EN LIGNE</span>
      </div>
    </div>
  );
}
