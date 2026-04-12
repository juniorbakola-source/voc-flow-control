import { Bot, Zap, Shield, Search } from "lucide-react";
import AgentsSidebar from "@/components/agents/AgentsSidebar";

const agents = [
  { name: "Aria", emoji: "🎨", role: "Frontend Specialist", heartbeat: "2h", status: "active" },
  { name: "Kael", emoji: "⚙️", role: "Backend Specialist", heartbeat: "2h", status: "active" },
  { name: "Sentry", emoji: "🔒", role: "Security Specialist", heartbeat: "24h", status: "active" },
  { name: "Fixer", emoji: "🔍", role: "Debugger Specialist", heartbeat: "1h", status: "active" },
];

const AgentsSettings = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <AgentsSidebar activeItem="Settings" />
      <main className="flex-1 overflow-auto">
        <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10 px-8 py-4">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Configuration des agents et préférences</p>
        </header>
        <div className="p-8 max-w-3xl space-y-6">
          {/* General */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Général</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Notifications</p>
                  <p className="text-xs text-muted-foreground">Recevoir des alertes quand un agent termine une tâche</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-10 h-5 bg-secondary rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-foreground after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Mode automatique</p>
                  <p className="text-xs text-muted-foreground">Les agents exécutent les tâches sans validation manuelle</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-10 h-5 bg-secondary rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-foreground after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
            </div>
          </section>

          {/* Agents config */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Agents</h2>
            <div className="space-y-3">
              {agents.map((agent) => (
                <div key={agent.name} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{agent.emoji}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">Heartbeat: {agent.heartbeat}</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <span className="text-xs text-success">{agent.status}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AgentsSettings;
