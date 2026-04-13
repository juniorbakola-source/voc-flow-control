import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Loader2, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import AgentsSidebar from "@/components/agents/AgentsSidebar";

interface AgentReply {
  name: string;
  emoji: string;
  reply: string;
}

interface GroupMessage {
  type: "user" | "agents";
  content?: string;
  replies?: AgentReply[];
}

const AGENTS_INFO = [
  { name: "Aria", emoji: "🎨", role: "Frontend" },
  { name: "Kael", emoji: "⚙️", role: "Backend" },
  { name: "Sentry", emoji: "🔒", role: "Sécurité" },
  { name: "Fixer", emoji: "🔍", role: "Debugger" },
];

const AgentGroupChat = () => {
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { type: "user", content: text }]);
    setInput("");
    setLoading(true);

    // Build conversation history for context
    const history = messages.flatMap((msg) => {
      if (msg.type === "user") return [{ role: "user" as const, content: msg.content! }];
      if (msg.replies) {
        const combined = msg.replies.map((r) => `${r.emoji} ${r.name}: ${r.reply}`).join("\n\n");
        return [{ role: "assistant" as const, content: combined }];
      }
      return [];
    });
    history.push({ role: "user", content: text });

    try {
      const { data, error } = await supabase.functions.invoke("agent-group-chat", {
        body: { messages: history },
      });

      if (error) throw error;

      setMessages((prev) => [...prev, { type: "agents", replies: data.replies }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          type: "agents",
          replies: AGENTS_INFO.map((a) => ({
            name: a.name,
            emoji: a.emoji,
            reply: "❌ Erreur de communication.",
          })),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <AgentsSidebar activeItem="Chat de Groupe" />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card px-6 py-3 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-accent/20 border border-primary/20 flex items-center justify-center">
            <Users size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-foreground">Chat de Groupe</h1>
            <p className="text-xs text-muted-foreground">
              Discutez avec tous les agents simultanément
            </p>
          </div>
          <div className="ml-4 flex items-center gap-1">
            {AGENTS_INFO.map((a) => (
              <span key={a.name} className="text-lg" title={a.name}>
                {a.emoji}
              </span>
            ))}
          </div>
          <span className="ml-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-success">4 en ligne</span>
          </span>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground gap-3">
              <div className="flex gap-2 text-4xl">
                {AGENTS_INFO.map((a) => (
                  <span key={a.name}>{a.emoji}</span>
                ))}
              </div>
              <p className="text-lg font-medium text-foreground">Chat de Groupe</p>
              <p className="text-sm max-w-md">
                Posez une question et tous les agents y répondront en même temps, chacun avec son expertise.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i}>
              {msg.type === "user" ? (
                <div className="flex justify-end">
                  <div className="max-w-[75%] rounded-lg px-4 py-3 text-sm bg-primary text-primary-foreground">
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {msg.replies?.map((reply) => (
                    <div key={reply.name} className="flex justify-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 border border-border flex items-center justify-center text-base shrink-0 mt-1">
                        {reply.emoji}
                      </div>
                      <div className="max-w-[75%] rounded-lg px-4 py-3 text-sm bg-card border border-border">
                        <p className="text-xs font-semibold text-primary mb-1">{reply.name}</p>
                        <div className="prose prose-sm prose-invert max-w-none text-card-foreground">
                          <ReactMarkdown>{reply.reply}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="space-y-3">
              {AGENTS_INFO.map((a) => (
                <div key={a.name} className="flex justify-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 border border-border flex items-center justify-center text-base shrink-0">
                    {a.emoji}
                  </div>
                  <div className="bg-card border border-border rounded-lg px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 size={14} className="animate-spin" />
                    {a.name} réfléchit...
                  </div>
                </div>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border bg-card px-6 py-4">
          <div className="flex gap-3 max-w-4xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Message à tous les agents..."
              className="flex-1 bg-secondary border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-4 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentGroupChat;
