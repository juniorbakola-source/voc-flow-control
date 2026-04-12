import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bot, MessageSquare, Settings, ArrowRight, Zap } from "lucide-react";
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
import { SourcesMethodology } from "@/components/voc/SourcesMethodology";
import { DataManagement } from "@/components/voc/DataManagement";
import { useLiveKPIs } from "@/hooks/useLiveKPIs";

const agents = [
  { name: "Aria", emoji: "🎨", role: "Frontend Specialist", status: "active", tasks: 156 },
  { name: "Kael", emoji: "⚙️", role: "Backend Specialist", status: "active", tasks: 203 },
  { name: "Sentry", emoji: "🔒", role: "Security Specialist", status: "active", tasks: 89 },
  { name: "Fixer", emoji: "🔍", role: "Debugger Specialist", status: "active", tasks: 312 },
];

const Index = () => {
  const navigate = useNavigate();
  const { data: liveKpis } = useLiveKPIs();
  const displayKpis = liveKpis || kpis;

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

      <main className="container py-6 space-y-6">
        {/* KPI */}
        <section>
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">
            ▸ Couche Sortie — Indicateurs Clés de Performance
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {displayKpis.map((kpi, i) => (
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div>
            <InputChannels />
          </div>
          <div className="space-y-6">
            <ParetoChart />
            <TrendChart />
          </div>
          <div>
            <ActionTracker />
          </div>
          <div>
            <QualityMetrics />
          </div>
        </div>

        {/* Carte Thermique — pleine largeur */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <HeatmapTable />
        </motion.section>

        {/* Table des Problèmes */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <IssueTable />
        </motion.section>

        {/* Gestion des Données */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          <DataManagement />
        </motion.section>

        {/* Sources & Méthodologie */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <SourcesMethodology />
        </motion.section>

        {/* Agent Hub */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
          <div className="border border-border rounded-lg bg-card overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <Bot className="text-primary" size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-mono font-bold text-foreground tracking-wide">AGENT HUB</h2>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                    Équipe d'agents autonomes • {agents.filter(a => a.status === "active").length} actifs
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/agents")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
              >
                Voir tout
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  className="group border border-border rounded-lg p-4 hover:border-primary/40 transition-all cursor-pointer bg-background/50"
                  onClick={() => navigate(`/agents/chat/${agent.name}`)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-accent/20 border border-primary/20 flex items-center justify-center text-lg">
                      {agent.emoji}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{agent.name}</h3>
                      <p className="text-[10px] text-muted-foreground">{agent.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                      <span className="text-[10px] text-success font-mono">Actif</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Zap size={10} />
                      <span>{agent.tasks} tâches</span>
                    </div>
                  </div>
                  <button
                    className="w-full mt-3 py-1.5 rounded text-[11px] font-medium bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors flex items-center justify-center gap-1.5"
                    onClick={(e) => { e.stopPropagation(); navigate(`/agents/chat/${agent.name}`); }}
                  >
                    <MessageSquare size={12} />
                    Communiquer
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="px-5 pb-4 flex gap-2">
              <button
                onClick={() => navigate("/agents/chats")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-xs hover:bg-secondary/80 transition-colors"
              >
                <MessageSquare size={12} />
                Tous les chats
              </button>
              <button
                onClick={() => navigate("/agents/settings")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-xs hover:bg-secondary/80 transition-colors"
              >
                <Settings size={12} />
                Paramètres
              </button>
            </div>
          </div>
        </motion.section>

        <footer className="border-t pt-4 pb-8 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
          <span>ELKA Suspension — Système VOC v1.0 • World Class Manufacturing</span>
          <span>Données : 559 plaintes • 1 095 inspections • 150 avis en ligne</span>
        </footer>
      </main>
    </div>
  );
};

export default Index;
