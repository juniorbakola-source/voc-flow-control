import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from "recharts";
import { paretoData } from "@/data/vocData";

export function ParetoChart() {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-mono text-primary uppercase tracking-widest">▸ Analyse Pareto</span>
        <span className="text-xs text-muted-foreground font-mono">— Problèmes par Fréquence</span>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={paretoData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 18%)" />
            <XAxis
              dataKey="issue"
              tick={{ fill: "hsl(215 12% 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
              axisLine={{ stroke: "hsl(220 14% 18%)" }}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: "hsl(215 12% 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
              axisLine={{ stroke: "hsl(220 14% 18%)" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              tick={{ fill: "hsl(215 12% 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
              axisLine={{ stroke: "hsl(220 14% 18%)" }}
              tickFormatter={(v) => `${v}%`}
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
            <Bar yAxisId="left" dataKey="count" name="Occurrences" fill="hsl(174 72% 46%)" radius={[2, 2, 0, 0]} opacity={0.8} />
            <Line yAxisId="right" dataKey="cumulative" name="Cumulé %" stroke="hsl(38 92% 55%)" strokeWidth={2} dot={{ fill: "hsl(38 92% 55%)", r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
