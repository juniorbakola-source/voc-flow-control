import { heatmapData } from "@/data/vocData";

function getIntensity(value: number, max: number) {
  if (value === 0) return "bg-secondary/30 text-muted-foreground";
  const ratio = value / max;
  if (ratio > 0.7) return "bg-destructive/30 text-destructive";
  if (ratio > 0.4) return "bg-warning/30 text-warning";
  return "bg-primary/20 text-primary";
}

export function HeatmapTable() {
  const max = Math.max(...heatmapData.flatMap(d => [d.mustBe, d.performance, d.attractive]));

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-mono text-primary uppercase tracking-widest">▸ Dept × Kano Heatmap</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left text-[10px] font-mono text-muted-foreground uppercase tracking-wider pb-2 pr-4">
                Department
              </th>
              <th className="text-center text-[10px] font-mono text-muted-foreground uppercase tracking-wider pb-2 px-2">
                Must-Be
              </th>
              <th className="text-center text-[10px] font-mono text-muted-foreground uppercase tracking-wider pb-2 px-2">
                Performance
              </th>
              <th className="text-center text-[10px] font-mono text-muted-foreground uppercase tracking-wider pb-2 px-2">
                Attractive
              </th>
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((row) => (
              <tr key={row.department} className="border-b border-border/50">
                <td className="py-2 pr-4 text-xs font-mono text-foreground">{row.department}</td>
                <td className="py-2 px-2">
                  <div className={`text-center text-xs font-mono font-bold rounded px-2 py-1 ${getIntensity(row.mustBe, max)}`}>
                    {row.mustBe}
                  </div>
                </td>
                <td className="py-2 px-2">
                  <div className={`text-center text-xs font-mono font-bold rounded px-2 py-1 ${getIntensity(row.performance, max)}`}>
                    {row.performance}
                  </div>
                </td>
                <td className="py-2 px-2">
                  <div className={`text-center text-xs font-mono font-bold rounded px-2 py-1 ${getIntensity(row.attractive, max)}`}>
                    {row.attractive}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
