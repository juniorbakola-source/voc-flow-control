import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heatmapData, vocIssues, type KanoCategory } from "@/data/vocData";

function getIntensityClasses(value: number, max: number) {
  if (value === 0) return "bg-secondary/30 text-muted-foreground border-secondary/50";
  const ratio = value / max;
  if (ratio > 0.7) return "bg-destructive/30 text-destructive border-destructive/50";
  if (ratio > 0.4) return "bg-warning/30 text-warning border-warning/50";
  return "bg-primary/20 text-primary border-primary/50";
}

function getBarWidth(value: number, max: number) {
  if (max === 0) return 0;
  return Math.max(8, (value / max) * 100);
}

function getBarColor(value: number, max: number) {
  if (value === 0) return "bg-secondary/40";
  const ratio = value / max;
  if (ratio > 0.7) return "bg-destructive/60";
  if (ratio > 0.4) return "bg-warning/60";
  return "bg-primary/40";
}

type CellKey = "mustBe" | "performance" | "attractive";

const cellKeyToKano: Record<CellKey, KanoCategory> = {
  mustBe: "must-be",
  performance: "performance",
  attractive: "attractive",
};

const kanoLabels: Record<CellKey, string> = {
  mustBe: "Obligatoire",
  performance: "Performance",
  attractive: "Attractive",
};

function getRelatedIssues(department: string, kano: KanoCategory) {
  return vocIssues.filter(
    (issue) =>
      issue.department.toLowerCase().includes(department.toLowerCase().split(" ")[0]) &&
      issue.kano === kano
  );
}

export function HeatmapTable() {
  const max = Math.max(...heatmapData.flatMap((d) => [d.mustBe, d.performance, d.attractive]));
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ dept: string; col: CellKey } | null>(null);

  const columns: { key: CellKey; label: string; icon: string }[] = [
    { key: "mustBe", label: "Obligatoire", icon: "🔴" },
    { key: "performance", label: "Performance", icon: "🟡" },
    { key: "attractive", label: "Attractive", icon: "🟢" },
  ];

  const selectedIssues = selectedCell
    ? getRelatedIssues(selectedCell.dept, cellKeyToKano[selectedCell.col])
    : [];

  const handleCellClick = (dept: string, col: CellKey, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedCell?.dept === dept && selectedCell?.col === col) {
      setSelectedCell(null);
    } else {
      setSelectedCell({ dept, col });
    }
  };

  const renderCell = (row: (typeof heatmapData)[0], colKey: CellKey, value: number) => {
    const cellId = `${row.department}-${colKey}`;
    const isHovered = hoveredCell === cellId;
    const isSelected = selectedCell?.dept === row.department && selectedCell?.col === colKey;

    return (
      <td className="py-1.5 px-1.5 sm:px-2" key={colKey}>
        <motion.div
          className={`relative text-center text-xs font-mono font-bold rounded-md px-2 py-1.5 sm:px-3 sm:py-2 border cursor-pointer overflow-hidden transition-shadow ${getIntensityClasses(value, max)} ${isSelected ? "ring-2 ring-accent ring-offset-1 ring-offset-background glow-accent" : ""}`}
          onHoverStart={() => setHoveredCell(cellId)}
          onHoverEnd={() => setHoveredCell(null)}
          onClick={(e) => handleCellClick(row.department, colKey, e)}
          animate={{
            scale: isHovered ? 1.08 : isSelected ? 1.04 : 1,
            y: isHovered ? -1 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          whileTap={{ scale: 0.96 }}
        >
          <motion.div
            className={`absolute bottom-0 left-0 h-[2px] rounded-full ${getBarColor(value, max)}`}
            initial={{ width: 0 }}
            animate={{ width: `${getBarWidth(value, max)}%` }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          />
          <AnimatePresence>
            {isHovered && value > 0 && (
              <motion.div
                className="absolute inset-0 rounded-md border-2 border-current"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.4, 0], scale: 1.1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </AnimatePresence>
          <span className="relative z-10">{value}</span>
        </motion.div>
      </td>
    );
  };

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            ▸ Carte Thermique Dépt × Kano
          </span>
          <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">
            — Cliquez sur une case pour voir les problèmes
          </span>
        </div>
        {selectedCell && (
          <button
            onClick={() => setSelectedCell(null)}
            className="text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors border border-border/50 rounded px-2 py-0.5 hover:bg-secondary/30"
          >
            ✕ Fermer
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left text-[10px] font-mono text-muted-foreground uppercase tracking-wider pb-2 pr-3">
                  Département
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="text-center text-[10px] font-mono text-muted-foreground uppercase tracking-wider pb-2 px-1.5"
                  >
                    <span className="hidden sm:inline">{col.icon} </span>{col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmapData.map((row, i) => (
                <motion.tr
                  key={row.department}
                  className={`border-b border-border/50 transition-colors ${
                    selectedCell?.dept === row.department
                      ? "bg-primary/5"
                      : "hover:bg-secondary/20"
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                >
                  <td className="py-1.5 pr-3 text-xs font-mono text-foreground whitespace-nowrap">
                    {row.department}
                  </td>
                  {renderCell(row, "mustBe", row.mustBe)}
                  {renderCell(row, "performance", row.performance)}
                  {renderCell(row, "attractive", row.attractive)}
                </motion.tr>
              ))}
            </tbody>
          </table>

          {/* Legend */}
          <div className="flex items-center gap-3 mt-3 pt-2 border-t border-border/50">
            <span className="text-[10px] font-mono text-muted-foreground">Intensité :</span>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded bg-primary/20 border border-primary/50" />
              <span className="text-[10px] font-mono text-muted-foreground">Faible</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded bg-warning/30 border border-warning/50" />
              <span className="text-[10px] font-mono text-muted-foreground">Moyen</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded bg-destructive/30 border border-destructive/50" />
              <span className="text-[10px] font-mono text-muted-foreground">Élevé</span>
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {selectedCell ? (
            <motion.div
              key={`${selectedCell.dept}-${selectedCell.col}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="rounded-lg border border-border/50 bg-secondary/10 p-4 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-mono text-accent uppercase tracking-wider font-bold">
                  ▸ Problèmes liés
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
                <span className="text-xs font-mono text-foreground font-bold">{selectedCell.dept}</span>
                <span className="text-[10px] font-mono text-muted-foreground">×</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  selectedCell.col === "mustBe"
                    ? "bg-destructive/10 text-destructive border-destructive/30"
                    : selectedCell.col === "performance"
                    ? "bg-warning/10 text-warning border-warning/30"
                    : "bg-primary/10 text-primary border-primary/30"
                }`}>
                  {kanoLabels[selectedCell.col]}
                </span>
              </div>

              {selectedIssues.length > 0 ? (
                <div className="space-y-2 flex-1 overflow-y-auto max-h-[300px]">
                  {selectedIssues.map((issue, idx) => (
                    <motion.div
                      key={issue.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="rounded-md border border-border/50 bg-card px-3 py-2.5 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-muted-foreground">{issue.id}</span>
                        <span className="text-xs font-mono font-bold text-accent">{issue.compositeScore}</span>
                      </div>
                      <p className="text-xs text-foreground leading-snug">{issue.title}</p>
                      <p className="text-[10px] font-mono text-muted-foreground">CTQ: {issue.ctq}</p>
                      <div className="flex items-center gap-3 pt-1">
                        <span className="text-[10px] font-mono text-muted-foreground">
                          Fréq: <span className="text-foreground">{issue.frequency}</span>
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          Sév: <span className="text-foreground">{issue.severity}</span>
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          Produit: <span className="text-foreground">{issue.product}</span>
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-xs font-mono text-muted-foreground italic text-center py-8">
                    Aucun problème enregistré pour cette combinaison.
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-lg border border-dashed border-border/50 bg-secondary/5 p-4 flex items-center justify-center"
            >
              <div className="text-center space-y-2">
                <span className="text-2xl">🔍</span>
                <p className="text-xs font-mono text-muted-foreground">
                  Cliquez sur une case pour explorer<br />les problèmes associés
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
