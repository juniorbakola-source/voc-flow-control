import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heatmapData } from "@/data/vocData";

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

export function HeatmapTable() {
  const max = Math.max(...heatmapData.flatMap(d => [d.mustBe, d.performance, d.attractive]));
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const columns: { key: CellKey; label: string }[] = [
    { key: "mustBe", label: "Obligatoire" },
    { key: "performance", label: "Performance" },
    { key: "attractive", label: "Attractive" },
  ];

  const renderCell = (row: typeof heatmapData[0], colKey: CellKey, value: number) => {
    const cellId = `${row.department}-${colKey}`;
    const isHovered = hoveredCell === cellId;
    const isDeptSelected = selectedDept === row.department;

    return (
      <td className="py-2 px-2" key={colKey}>
        <motion.div
          className={`relative text-center text-xs font-mono font-bold rounded-md px-3 py-2 border cursor-pointer overflow-hidden ${getIntensityClasses(value, max)}`}
          onHoverStart={() => setHoveredCell(cellId)}
          onHoverEnd={() => setHoveredCell(null)}
          animate={{
            scale: isHovered ? 1.12 : isDeptSelected ? 1.04 : 1,
            y: isHovered ? -2 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated bar background */}
          <motion.div
            className={`absolute bottom-0 left-0 h-[3px] rounded-full ${getBarColor(value, max)}`}
            initial={{ width: 0 }}
            animate={{ width: `${getBarWidth(value, max)}%` }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          />
          {/* Pulse ring on hover */}
          <AnimatePresence>
            {isHovered && value > 0 && (
              <motion.div
                className="absolute inset-0 rounded-md border-2 border-current"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.5, 0], scale: 1.15 }}
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
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-mono text-primary uppercase tracking-widest">▸ Carte Thermique Dépt × Kano</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left text-[10px] font-mono text-muted-foreground uppercase tracking-wider pb-2 pr-4">
                Département
              </th>
              {columns.map(col => (
                <th key={col.key} className="text-center text-[10px] font-mono text-muted-foreground uppercase tracking-wider pb-2 px-2">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((row, i) => (
              <motion.tr
                key={row.department}
                className={`border-b border-border/50 cursor-pointer transition-colors ${selectedDept === row.department ? "bg-primary/5" : "hover:bg-secondary/20"}`}
                onClick={() => setSelectedDept(selectedDept === row.department ? null : row.department)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
              >
                <td className="py-2 pr-4 text-xs font-mono text-foreground">{row.department}</td>
                {renderCell(row, "mustBe", row.mustBe)}
                {renderCell(row, "performance", row.performance)}
                {renderCell(row, "attractive", row.attractive)}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/50">
        <span className="text-[10px] font-mono text-muted-foreground">Intensité :</span>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-primary/20 border border-primary/50" />
          <span className="text-[10px] font-mono text-muted-foreground">Faible</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-warning/30 border border-warning/50" />
          <span className="text-[10px] font-mono text-muted-foreground">Moyen</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-destructive/30 border border-destructive/50" />
          <span className="text-[10px] font-mono text-muted-foreground">Élevé</span>
        </div>
      </div>
    </div>
  );
}
