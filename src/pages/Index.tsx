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
import { QualityMetrics } from "@/components/voc/QualityMetrics";

const Index = () => {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* En-tête */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="text-primary font-mono font-bold text-sm">E</span>
            </div>
            <div>
              <h1 className="text-sm font-mono font-bold text-foreground tracking-wide">
                ELKA SUSPENSION — SYSTÈME VOC
              </h1>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                Voix du Client • Amortisseurs Haute Performance • WCM
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

      <main className="container py-4 space-y-4">
        {/* KPI */}
        <section>
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">
            ▸ Couche Sortie — Indicateurs Clés de Performance
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {kpis.map((kpi, i) => (
              <KPICard key={kpi.label} data={kpi} index={i} />
            ))}
          </div>
        </section>

        {/* Écosystème & Architecture — côte à côte */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <EcosystemDiagram />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <SystemFlow />
          </motion.div>
        </div>

        {/* Couche Analyse — Canaux, Pareto, Tendance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <InputChannels />
          <ParetoChart />
          <TrendChart />
        </div>

        {/* Couche Opérationnelle — Actions & Métriques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ActionTracker />
          <QualityMetrics />
        </div>

        {/* Carte Thermique */}
        <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <HeatmapTable />
        </motion.section>

        {/* Table des Problèmes */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <IssueTable />
        </motion.section>

        {/* Pied de page */}
        <footer className="border-t pt-4 pb-8 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
          <span>ELKA Suspension — Système VOC v1.0 • World Class Manufacturing</span>
          <span>Données : 559 plaintes • 1 095 inspections • 150 avis en ligne</span>
        </footer>
      </main>
    </div>
  );
};

export default Index;
