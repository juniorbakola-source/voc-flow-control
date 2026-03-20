import { motion } from "framer-motion";
import { kpis } from "@/data/vocData";
import { KPICard } from "@/components/voc/KPICard";
import { InputChannels } from "@/components/voc/InputChannels";
import { ParetoChart } from "@/components/voc/ParetoChart";
import { TrendChart } from "@/components/voc/TrendChart";
import { ActionTracker } from "@/components/voc/ActionTracker";
import { SystemFlow } from "@/components/voc/SystemFlow";
import { HeatmapTable } from "@/components/voc/HeatmapTable";
import { IssueTable } from "@/components/voc/IssueTable";
import { EcosystemDiagram } from "@/components/voc/EcosystemDiagram";

const Index = () => {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* En-tête */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="text-primary font-mono font-bold text-sm">V</span>
            </div>
            <div>
              <h1 className="text-sm font-mono font-bold text-foreground tracking-wide">
                SYSTÈME DE CONTRÔLE VOC
              </h1>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                Boucle Fermée Voix du Client • WCM
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
              <span className="text-[10px] font-mono text-success">SYSTÈME ACTIF</span>
            </div>
            <div className="text-[10px] font-mono text-muted-foreground">
              {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "short", day: "numeric" })}
            </div>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {/* KPI */}
        <section>
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">
            ▸ Couche Sortie — Indicateurs Clés de Performance
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {kpis.map((kpi, i) => (
              <KPICard key={kpi.label} data={kpi} index={i} />
            ))}
          </div>
        </section>

        {/* Écosystème VOC Interactif */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <EcosystemDiagram />
        </motion.section>

        {/* Architecture Système */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <SystemFlow />
        </motion.section>

        {/* Grille Principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <InputChannels />
            <HeatmapTable />
          </div>
          <div className="space-y-6">
            <ParetoChart />
            <TrendChart />
          </div>
          <div>
            <ActionTracker />
          </div>
        </div>

        {/* Table des Problèmes */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <IssueTable />
        </motion.section>

        {/* Pied de page */}
        <footer className="border-t pt-4 pb-8 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
          <span>Système de Contrôle VOC v1.0 • World Class Manufacturing</span>
          <span>Boucles de rétroaction : 3 actives • Gouvernance : Quotidien / Hebdo / Mensuel</span>
        </footer>
      </main>
    </div>
  );
};

export default Index;
