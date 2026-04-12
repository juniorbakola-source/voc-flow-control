import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Bot, MessageSquare, Settings, Zap, Shield, Search } from "lucide-react";
import { motion } from "framer-motion";
import AgentsSidebar from "@/components/agents/AgentsSidebar";

const agents = [
  { name: "Aria", emoji: "🎨", role: "Frontend Specialist", icon: Zap },
  { name: "Kael", emoji: "⚙️", role: "Backend Specialist", icon: Bot },
  { name: "Sentry", emoji: "🔒", role: "Security Specialist", icon: Shield },
  { name: "Fixer", emoji: "🔍", role: "Debugger Specialist", icon: Search },
];

const AgentsChatList = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-background">
      <AgentsSidebar activeItem="Chat" />
      <main className="flex-1 overflow-auto">
        <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10 px-8 py-4">
          <h1 className="text-2xl font-bold text-foreground">Chat</h1>
          <p className="text-sm text-muted-foreground">Sélectionnez un agent pour démarrer une conversation</p>
        </header>
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          {agents.map((agent, i) => (
            <motion.button
              key={agent.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/agents/chat/${agent.name}`)}
              className="flex items-center gap-4 p-5 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 border border-primary/20 flex items-center justify-center text-2xl">
                {agent.emoji}
              </div>
              <div>
                <p className="font-bold text-foreground">{agent.name}</p>
                <p className="text-xs text-muted-foreground">{agent.role}</p>
              </div>
              <MessageSquare size={18} className="ml-auto text-muted-foreground" />
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AgentsChatList;
