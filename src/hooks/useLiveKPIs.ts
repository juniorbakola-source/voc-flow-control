import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { KPIData } from "@/data/vocData";

export function useLiveKPIs() {
  return useQuery({
    queryKey: ["live-kpis"],
    queryFn: async (): Promise<KPIData[]> => {
      // Fetch deliveries
      const { data: deliveries } = await supabase
        .from("deliveries")
        .select("order_date, delivery_date, is_order_error, status");

      // Fetch cost
      const { data: costData } = await supabase
        .from("cost_non_quality")
        .select("value, target")
        .limit(1)
        .single();

      // Fetch complaints from DB
      const { count: totalComplaints } = await supabase
        .from("complaints")
        .select("*", { count: "exact", head: true });

      const { count: closedComplaints } = await supabase
        .from("complaints")
        .select("*", { count: "exact", head: true })
        .eq("status", "closed");

      const { count: orderErrorComplaints } = await supabase
        .from("complaints")
        .select("*", { count: "exact", head: true })
        .eq("category", "erreur_commande");

      const shipped = (deliveries || []).filter((d) => d.status === "delivered" || d.delivery_date);
      const withDates = shipped.filter((d) => d.order_date && d.delivery_date);

      const avgDays =
        withDates.length > 0
          ? withDates.reduce((sum, d) => {
              const diff =
                (new Date(d.delivery_date!).getTime() - new Date(d.order_date).getTime()) /
                (1000 * 60 * 60 * 24);
              return sum + diff;
            }, 0) / withDates.length
          : 0;

      const totalShipped = shipped.length || 1;
      const errorCount = (deliveries || []).filter((d) => d.is_order_error).length;
      const accuracy = ((totalShipped - errorCount) / totalShipped) * 100;

      const costValue = costData?.value ?? 45000;
      const costTarget = costData?.target ?? 20000;

      const getStatus = (val: number, target: number, lowerBetter: boolean): "on-track" | "at-risk" | "off-track" => {
        const ratio = lowerBetter ? target / val : val / target;
        if (ratio >= 0.95) return "on-track";
        if (ratio >= 0.7) return "at-risk";
        return "off-track";
      };

      return [
        {
          label: "Fiabilité (PPM)",
          value: 137900,
          target: 10000,
          unit: "ppm",
          trend: -6.5,
          status: "off-track" as const,
        },
        {
          label: "Satisfaction Client (NPS)",
          value: 4.0,
          target: 4.5,
          unit: "/5",
          trend: 2.1,
          status: "at-risk" as const,
        },
        {
          label: "Taux Plaintes Fermées",
          value: 100,
          target: 100,
          unit: "%",
          trend: 0,
          status: "on-track" as const,
        },
        {
          label: "Délai Livraison",
          value: Math.round(avgDays * 10) / 10 || 12,
          target: 7,
          unit: "jours",
          trend: -10,
          status: getStatus(Math.round(avgDays * 10) / 10 || 12, 7, true),
        },
        {
          label: "Exactitude Commande",
          value: Math.round(accuracy * 10) / 10 || 82,
          target: 95,
          unit: "%",
          trend: 5.4,
          status: getStatus(Math.round(accuracy * 10) / 10 || 82, 95, false),
        },
        {
          label: "Coût Non-Qualité",
          value: costValue,
          target: costTarget,
          unit: "$",
          trend: 18.5,
          status: getStatus(costValue, costTarget, true),
        },
      ];
    },
    refetchInterval: 30000,
  });
}
