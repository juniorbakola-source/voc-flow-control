import { motion } from "framer-motion";

const layers = [
  { id: "input", label: "ENTRÉE", sub: "Plaintes, NC, Avis", color: "bg-info/20 border-info/40 text-info" },
  { id: "process", label: "TRAITEMENT", sub: "Kano + CTQ + Score", color: "bg-primary/20 border-primary/40 text-primary" },
  { id: "decide", label: "DÉCISION", sub: "Moteur de Priorisation", color: "bg-warning/20 border-warning/40 text-warning" },
  { id: "act", label: "ACTION", sub: "Actions CAPA", color: "bg-success/20 border-success/40 text-success" },
  { id: "output", label: "SORTIE", sub: "KPIs & Métriques", color: "bg-foreground/10 border-foreground/20 text-foreground" },
];

export function SystemFlow() {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-mono text-primary uppercase tracking-widest">▸ Architecture Système</span>
        <span className="text-xs text-muted-foreground font-mono">— Boucle Fermée ELKA Suspension</span>
      </div>

      <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-2">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-1 shrink-0"
          >
            <div className={`px-3 py-2 rounded border text-center ${layer.color}`}>
              <div className="text-[10px] font-mono font-bold tracking-widest">{layer.label}</div>
              <div className="text-[9px] font-mono opacity-70 mt-0.5">{layer.sub}</div>
            </div>
            {i < layers.length - 1 && (
              <span className="text-muted-foreground font-mono text-xs">→</span>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="border-t border-dashed pt-3 space-y-2"
      >
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">
          Boucles de Rétroaction
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "CAPA → Production", desc: "Les actions correctives réduisent les NC et reprises", type: "équilibrage" },
            { label: "Dérive CTQ → Escalade", desc: "PPM > 10 000 déclenche alerte qualité", type: "équilibrage" },
            { label: "Revue Gouvernance", desc: "Quotidien (QC) / Hebdo (Direction) / Mensuel (Stratégique)", type: "renforcement" },
          ].map((loop, i) => (
            <div key={i} className="flex-1 min-w-[140px] p-2 rounded border border-dashed border-primary/20 bg-primary/5">
              <div className="flex items-center gap-1.5">
                <span className="text-primary text-xs">↺</span>
                <span className="text-[10px] font-mono font-bold text-primary">{loop.label}</span>
              </div>
              <div className="text-[9px] font-mono text-muted-foreground mt-1">{loop.desc}</div>
              <div className="text-[8px] font-mono text-muted-foreground/60 mt-1 uppercase">
                Boucle {loop.type}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
