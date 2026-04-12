import { Link } from "react-router-dom";
import { Bot, MessageSquare, Settings, ArrowLeft } from "lucide-react";

const navItems = [
  { label: "Agents", icon: Bot, path: "/agents" },
  { label: "Chat", icon: MessageSquare, path: "/agents/chats" },
  { label: "Settings", icon: Settings, path: "/agents/settings" },
];

interface AgentsSidebarProps {
  activeItem: string;
}

const AgentsSidebar = ({ activeItem }: AgentsSidebarProps) => {
  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
          <ArrowLeft size={16} />
          Retour au Dashboard
        </Link>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <Bot className="text-primary" size={24} />
          <span className="font-bold text-lg text-foreground">Agents Hub</span>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                activeItem === item.label
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          <span className="text-success">●</span> 4 agents actifs
        </div>
      </div>
    </aside>
  );
};

export default AgentsSidebar;
