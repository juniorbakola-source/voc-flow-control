import { vocIssues } from "@/data/vocData";

const kanoBadge = {
  "must-be": "bg-destructive/10 text-destructive border-destructive/30",
  performance: "bg-warning/10 text-warning border-warning/30",
  attractive: "bg-primary/10 text-primary border-primary/30",
};

export function IssueTable() {
  const sorted = [...vocIssues].sort((a, b) => b.compositeScore - a.compositeScore);

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-mono text-primary uppercase tracking-widest">▸ Couche Décision</span>
        <span className="text-xs text-muted-foreground font-mono">— Problèmes Priorisés (Fréq × Sév × Kano)</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {["ID", "Problème", "Kano", "CTQ", "Score", "Dépt"].map((h) => (
                <th key={h} className="text-left text-[10px] font-mono text-muted-foreground uppercase tracking-wider pb-2 pr-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((issue) => (
              <tr key={issue.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="py-2 pr-3 text-xs font-mono text-muted-foreground">{issue.id}</td>
                <td className="py-2 pr-3 text-xs text-foreground max-w-[200px] truncate">{issue.title}</td>
                <td className="py-2 pr-3">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${kanoBadge[issue.kano]}`}>
                    {issue.kano === "must-be" ? "OBLIGATOIRE" : issue.kano === "performance" ? "PERFORMANCE" : "ATTRACTIVE"}
                  </span>
                </td>
                <td className="py-2 pr-3 text-[10px] font-mono text-muted-foreground max-w-[150px] truncate">
                  {issue.ctq}
                </td>
                <td className="py-2 pr-3">
                  <span className="text-xs font-mono font-bold text-accent">{issue.compositeScore}</span>
                </td>
                <td className="py-2 text-xs font-mono text-muted-foreground">{issue.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
