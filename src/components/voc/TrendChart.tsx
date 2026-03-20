import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { trendData } from "@/data/vocData";

export function TrendChart() {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-mono text-primary uppercase tracking-widest">▸ Analyse Tendance</span>
        <span className="text-xs text-muted-foreground font-mono">— Signaux VOC 6 Mois</span>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 18%)" />
            <XAxis
              dataKey="month"
              tick={{ fill: "hsl(215 12% 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
              axisLine={{ stroke: "hsl(220 14% 18%)" }}
            />
            <YAxis
              tick={{ fill: "hsl(215 12% 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
              axisLine={{ stroke: "hsl(220 14% 18%)" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220 18% 10%)",
                border: "1px solid hsl(220 14% 18%)",
                borderRadius: "4px",
                fontFamily: "JetBrains Mono",
                fontSize: 12,
              }}
            />
            <Legend
              wrapperStyle={{ fontFamily: "JetBrains Mono", fontSize: 11 }}
            />
            <Line type="monotone" dataKey="plaintes" name="Plaintes" stroke="hsl(38 92% 55%)" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="reprises" name="Reprises" stroke="hsl(0 72% 55%)" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="ncFournisseur" name="NC Fournisseur" stroke="hsl(210 80% 55%)" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="ncProduit" name="NC Produit" stroke="hsl(174 72% 46%)" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
