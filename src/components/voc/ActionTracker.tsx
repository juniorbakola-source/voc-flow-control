import { motion } from "framer-motion";
import { actions } from "@/data/vocData";

const statusStyles = {
  open: { bg: "bg-info/10 border-info/30", text: "text-info", label: "OUVERT" },
  "in-progress": { bg: "bg-primary/10 border-primary/30", text: "text-primary", label: "EN COURS" },
  completed: { bg: "bg-success/10 border-success/30", text: "text-success", label: "TERMINÉ" },
  overdue: { bg: "bg-destructive/10 border-destructive/30", text: "text-destructive", label: "EN RETARD" },
};

const typeStyles = {
  corrective: "bg-warning/10 text-warning border-warning/30",
  preventive: "bg-primary/10 text-primary border-primary/30",
};

export function ActionTracker() {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">▸ Couche Actions</span>
          <span className="text-xs text-muted-foreground font-mono">— Correctives & Préventives</span>
        </div>
        <div className="flex gap-2 text-xs font-mono">
          <span className="text-warning">C: {actions.filter(a => a.type === "corrective").length}</span>
          <span className="text-primary">P: {actions.filter(a => a.type === "preventive").length}</span>
        </div>
      </div>
      <div className="space-y-2 max-h-[360px] overflow-y-auto">
        {actions.map((action, i) => {
          const style = statusStyles[action.status];
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`p-3 rounded border ${style.bg} flex flex-col gap-2`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{action.title}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">
                    {action.issueId} → {action.assignee}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${style.bg} ${style.text}`}>
                    {style.label}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${typeStyles[action.type]}`}>
                    {action.type === "corrective" ? "CAPA-C" : "CAPA-P"}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>Échéance : {action.dueDate}</span>
                {action.effectiveness !== null && (
                  <span className="text-success">Eff: {action.effectiveness}%</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
