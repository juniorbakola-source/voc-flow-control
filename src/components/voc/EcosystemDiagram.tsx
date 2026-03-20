import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// --- Nœuds et liens du diagramme écosystème ELKA Suspension ---
interface FlowNode {
  id: string;
  label: string;
  icon: string;
  group: "source" | "channel" | "process" | "action" | "output";
  x: number;
  y: number;
}

interface FlowLink {
  from: string;
  to: string;
  animated?: boolean;
}

const nodes: FlowNode[] = [
  // Sources VOC réelles ELKA (gauche)
  { id: "plaintes", label: "Plaintes\nClients (559)", icon: "📋", group: "source", x: 5, y: 10 },
  { id: "avis", label: "Avis en Ligne\n& Réseaux (150)", icon: "📡", group: "source", x: 5, y: 28 },
  { id: "nc-produit", label: "NC Produit\nFini (151)", icon: "⚠️", group: "source", x: 5, y: 46 },
  { id: "nc-fournisseur", label: "NC Réception\nFournisseurs", icon: "📦", group: "source", x: 5, y: 64 },
  { id: "reprises", label: "Reprises\nProduction", icon: "🔧", group: "source", x: 5, y: 82 },

  // Canaux d'interaction réels (entretiens VOC)
  { id: "emails", label: "Emails", icon: "📧", group: "channel", x: 28, y: 8 },
  { id: "telephone", label: "Téléphone", icon: "📞", group: "channel", x: 28, y: 20 },
  { id: "google", label: "Google\nReviews", icon: "⭐", group: "channel", x: 28, y: 32 },
  { id: "reseaux", label: "Facebook\nYouTube TikTok", icon: "💬", group: "channel", x: 28, y: 44 },
  { id: "forums", label: "Forums\nOff-Road", icon: "🏁", group: "channel", x: 28, y: 56 },
  { id: "terrain", label: "Visites\nTerrain / Dealers", icon: "🏭", group: "channel", x: 28, y: 68 },
  { id: "formelles", label: "Réclamations\nFormelles / RMA", icon: "📄", group: "channel", x: 28, y: 80 },
  { id: "sondage", label: "Sondage\nAnnuel", icon: "📊", group: "channel", x: 28, y: 92 },

  // Boîtes noires de traitement
  { id: "ctq", label: "Définition\nCTQ", icon: "🎯", group: "process", x: 52, y: 18 },
  { id: "kano", label: "Catégorisation\nKano", icon: "📊", group: "process", x: 52, y: 43 },
  { id: "scoring", label: "Score Composite\nFréq × Sév × Kano", icon: "⚡", group: "process", x: 52, y: 68 },

  // Actions CAPA
  { id: "corrective", label: "Actions\nCorrectives", icon: "🔴", group: "action", x: 75, y: 30 },
  { id: "preventive", label: "Actions\nPréventives", icon: "🟢", group: "action", x: 75, y: 60 },

  // Sortie
  { id: "dashboard", label: "Dashboard\nVOC ELKA", icon: "📈", group: "output", x: 93, y: 45 },
];

const links: FlowLink[] = [
  // Sources → Canaux (basé sur les vrais flux ELKA)
  { from: "plaintes", to: "emails", animated: true },
  { from: "plaintes", to: "telephone", animated: true },
  { from: "plaintes", to: "formelles", animated: true },
  { from: "avis", to: "google", animated: true },
  { from: "avis", to: "reseaux", animated: true },
  { from: "avis", to: "forums", animated: true },
  { from: "nc-produit", to: "formelles", animated: true },
  { from: "nc-fournisseur", to: "emails", animated: true },
  { from: "nc-fournisseur", to: "terrain", animated: true },
  { from: "reprises", to: "terrain", animated: true },
  { from: "reprises", to: "formelles", animated: true },

  // Canaux → Traitement
  { from: "emails", to: "ctq", animated: true },
  { from: "telephone", to: "ctq", animated: true },
  { from: "google", to: "kano", animated: true },
  { from: "reseaux", to: "kano", animated: true },
  { from: "forums", to: "kano", animated: true },
  { from: "terrain", to: "ctq", animated: true },
  { from: "formelles", to: "scoring", animated: true },
  { from: "sondage", to: "kano", animated: true },

  // Traitement → Traitement
  { from: "ctq", to: "scoring", animated: true },
  { from: "kano", to: "scoring", animated: true },

  // Traitement → Actions
  { from: "scoring", to: "corrective", animated: true },
  { from: "scoring", to: "preventive", animated: true },

  // Actions → Dashboard
  { from: "corrective", to: "dashboard", animated: true },
  { from: "preventive", to: "dashboard", animated: true },

  // Boucles de rétroaction
  { from: "dashboard", to: "plaintes" },
  { from: "corrective", to: "reprises" },
];

const groupColors = {
  source: { bg: "bg-destructive/15", border: "border-destructive/40", text: "text-destructive" },
  channel: { bg: "bg-info/15", border: "border-info/40", text: "text-info" },
  process: { bg: "bg-warning/15", border: "border-warning/40", text: "text-warning" },
  action: { bg: "bg-primary/15", border: "border-primary/40", text: "text-primary" },
  output: { bg: "bg-success/15", border: "border-success/40", text: "text-success" },
};

const groupLabels = {
  source: "Sources VOC",
  channel: "Canaux d'Interaction",
  process: "Boîtes Noires",
  action: "Actions CAPA",
  output: "Tableau de Bord",
};

function AnimatedParticle({ fromNode, toNode, delay }: { fromNode: FlowNode; toNode: FlowNode; delay: number }) {
  return (
    <motion.circle
      r="3"
      fill="hsl(174 72% 46%)"
      initial={{ cx: `${fromNode.x}%`, cy: `${fromNode.y}%` }}
      animate={{
        cx: [`${fromNode.x}%`, `${toNode.x}%`],
        cy: [`${fromNode.y}%`, `${toNode.y}%`],
      }}
      transition={{
        duration: 2 + Math.random(),
        delay,
        repeat: Infinity,
        repeatDelay: 1.5 + Math.random() * 2,
        ease: "easeInOut",
      }}
      opacity={0.8}
    />
  );
}

export function EcosystemDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex(prev => (prev + 1) % nodes.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  const highlightedLinks = activeNode
    ? links.filter(l => l.from === activeNode || l.to === activeNode)
    : [];
  const highlightedNodeIds = activeNode
    ? new Set([activeNode, ...highlightedLinks.map(l => l.from), ...highlightedLinks.map(l => l.to)])
    : null;

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-mono text-primary uppercase tracking-widest">▸ Écosystème VOC — ELKA Suspension</span>
        <span className="text-xs text-muted-foreground font-mono">— Flux Interactif Complet</span>
      </div>

      {/* Légende */}
      <div className="flex flex-wrap gap-3 mb-4">
        {(Object.keys(groupLabels) as Array<keyof typeof groupLabels>).map(g => (
          <div key={g} className="flex items-center gap-1.5">
            <div className={`h-2.5 w-2.5 rounded-sm ${groupColors[g].bg} ${groupColors[g].border} border`} />
            <span className="text-[10px] font-mono text-muted-foreground">{groupLabels[g]}</span>
          </div>
        ))}
      </div>

      {/* Diagramme */}
      <div className="relative w-full" style={{ paddingBottom: "55%" }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {links.map((link, i) => {
            const from = getNode(link.from);
            const to = getNode(link.to);
            const isHighlighted = highlightedLinks.includes(link);
            const isFeedback = !link.animated;
            return (
              <g key={i}>
                <motion.line
                  x1={`${from.x}%`} y1={`${from.y}%`}
                  x2={`${to.x}%`} y2={`${to.y}%`}
                  stroke={isFeedback ? "hsl(38 92% 55%)" : isHighlighted ? "hsl(174 72% 60%)" : "hsl(220 14% 25%)"}
                  strokeWidth={isHighlighted ? 0.4 : 0.2}
                  strokeDasharray={isFeedback ? "1 1" : undefined}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: i * 0.03 }}
                />
                {link.animated && <AnimatedParticle fromNode={from} toNode={to} delay={i * 0.15} />}
              </g>
            );
          })}
        </svg>

        {/* Nœuds */}
        {nodes.map((node, i) => {
          const colors = groupColors[node.group];
          const isPulsing = i === pulseIndex;
          const dimmed = highlightedNodeIds && !highlightedNodeIds.has(node.id);
          return (
            <motion.div
              key={node.id}
              className="absolute cursor-pointer select-none"
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: dimmed ? 0.3 : 1, scale: isPulsing && !activeNode ? 1.1 : 1 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              whileHover={{ scale: 1.15, zIndex: 50 }}
            >
              <div
                className={`px-2 py-1.5 rounded border text-center ${colors.bg} ${colors.border} ${isPulsing && !activeNode ? "ring-1 ring-primary/30" : ""} backdrop-blur-sm transition-shadow`}
                style={{ minWidth: "60px" }}
              >
                <div className="text-sm leading-none mb-0.5">{node.icon}</div>
                <div className={`text-[7px] font-mono font-bold leading-tight whitespace-pre-line ${colors.text}`}>
                  {node.label}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Label boucles */}
        <motion.div className="absolute bottom-1 right-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <div className="flex items-center gap-1.5">
            <span className="text-accent text-xs">↺</span>
            <span className="text-[8px] font-mono text-accent">Boucles de Rétroaction</span>
          </div>
        </motion.div>
      </div>

      {/* Info nœud actif */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="mt-3 p-3 rounded border border-primary/20 bg-primary/5"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{getNode(activeNode).icon}</span>
              <div>
                <div className="text-xs font-mono font-bold text-primary">
                  {getNode(activeNode).label.replace("\n", " ")}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                  Connexions : {links.filter(l => l.from === activeNode || l.to === activeNode).length} liens actifs
                  {" • "}Groupe : {groupLabels[getNode(activeNode).group]}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
