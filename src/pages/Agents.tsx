import { useState } from "react";
import { Bot, Pause, Play, Settings, Plus, MessageSquare, Zap, Shield, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AgentsSidebar from "@/components/agents/AgentsSidebar";

interface Agent {
  name: string;
  emoji: string;
  role: string;
  status: "active" | "paused";
  skills: string[];
  heartbeat: string;
  tasksCompleted: number;
  lastAction: string;
  icon: React.ElementType;
}

const agentsData: Agent[] = [
  {
    name: "Aria",
    emoji: "🎨",
    role: "Frontend Specialist",
    status: "active",
    skills: ["React", "Vue", "UX", "Performance", "CSS"],
    heartbeat: "2h",
    tasksCompleted: 156,
    lastAction: "Optimisation bundle React",
    icon: Zap,
  },
  {
    name: "Kael",
    emoji: "⚙️",
    role: "Backend Specialist",
    status: "active",
    skills: ["APIs", "PostgreSQL", "Redis", "Docker", "Node.js"],
    heartbeat: "2h",
    tasksCompleted: 203,
    lastAction: "Déploiement API auth",
    icon: Bot,
  },
  {
    name: "Sentry",
    emoji: "🔒",
    role: "Security Specialist",
    status: "active",
    skills: ["Audit", "CVE", "Compliance", "Secrets", "OWASP"],
    heartbeat: "24h",
    tasksCompleted: 89,
    lastAction: "Scan quotidien complété",
    icon: Shield,
  },
  {
    name: "Fixer",
    emoji: "🔍",
    role: "Debugger Specialist",
    status: "active",
    skills: ["Investigation", "Profiling", "Refactoring", "Tests", "Logs"],
    heartbeat: "1h",
    tasksCompleted: 312,
    lastAction: "Bug pagination corrigé",
    icon: Search,
  },
];


const Agents = () => {
  const [agents, setAgents] = useState(agentsData);
  const navigate = useNavigate();

  const toggleAgent = (name: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.name === name
          ? { ...a, status: a.status === "active" ? "paused" : "active" }
          : a
      )
    );
  };

  return (
    <div className="min-h-screen flex bg-background">
      <AgentsSidebar activeItem="Agents" />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Agents</h1>
              <p className="text-sm text-muted-foreground">Gérez et surveillez vos agents autonomes</p>
            </div>
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              <Plus size={16} />
              Générer un Agent
            </button>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-lg border border-border hover:border-primary/40 transition-colors p-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 border border-primary/20 flex items-center justify-center text-2xl">
                      {agent.emoji}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground">{agent.role}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            agent.status === "active" ? "bg-success animate-pulse" : "bg-muted-foreground"
                          }`}
                        />
                        <span
                          className={`text-xs ${
                            agent.status === "active" ? "text-success" : "text-muted-foreground"
                          }`}
                        >
                          {agent.status}
                        </span>
                        <span className="text-border">|</span>
                        <span className="text-xs text-muted-foreground">Heartbeat: {agent.heartbeat}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => toggleAgent(agent.name)}
                      className="p-2 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
                      title={agent.status === "active" ? "Pause" : "Reprendre"}
                    >
                      {agent.status === "active" ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button className="p-2 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors">
                      <Settings size={16} />
                    </button>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Skills ({agent.skills.length})</p>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-secondary rounded text-xs text-secondary-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xl font-bold text-foreground">{agent.tasksCompleted}</p>
                    <p className="text-xs text-muted-foreground">Tâches complétées</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground truncate">{agent.lastAction}</p>
                    <p className="text-xs text-muted-foreground">Dernière action</p>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => navigate(`/agents/chat/${agent.name}`)}
                  className="w-full mt-4 py-2.5 rounded-md bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  Communiquer avec {agent.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Agents;
