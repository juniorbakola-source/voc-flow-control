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

const Index = () => {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="text-primary font-mono font-bold text-sm">V</span>
            </div>
            <div>
              <h1 className="text-sm font-mono font-bold text-foreground tracking-wide">
                VOC CONTROL SYSTEM
              </h1>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                Closed-Loop Voice of Customer • WCM
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
              <span className="text-[10px] font-mono text-success">SYSTEM ACTIVE</span>
            </div>
            <div className="text-[10px] font-mono text-muted-foreground">
              {new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </div>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {/* KPI Row */}
        <section>
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">
            ▸ Output Layer — Key Performance Indicators
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {kpis.map((kpi, i) => (
              <KPICard key={kpi.label} data={kpi} index={i} />
            ))}
          </div>
        </section>

        {/* System Flow */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <SystemFlow />
        </motion.section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Inputs + Heatmap */}
          <div className="space-y-6">
            <InputChannels />
            <HeatmapTable />
          </div>

          {/* Center: Charts */}
          <div className="space-y-6">
            <ParetoChart />
            <TrendChart />
          </div>

          {/* Right: Actions */}
          <div>
            <ActionTracker />
          </div>
        </div>

        {/* Issue Table */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <IssueTable />
        </motion.section>

        {/* Footer */}
        <footer className="border-t pt-4 pb-8 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
          <span>VOC Cybernetic Control System v1.0 • World Class Manufacturing</span>
          <span>Feedback loops: 3 active • Governance: Daily / Weekly / Monthly</span>
        </footer>
      </main>
    </div>
  );
};

export default Index;
