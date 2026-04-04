import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DeliveryStats {
  totalShipped: number;
  avgDeliveryDays: number;
  orderErrorCount: number;
  orderAccuracy: number;
}

export function useDeliveryStats() {
  return useQuery({
    queryKey: ["delivery-stats"],
    queryFn: async (): Promise<DeliveryStats> => {
      const { data, error } = await supabase
        .from("deliveries")
        .select("order_date, delivery_date, is_order_error, status");

      if (error) throw error;

      const shipped = data.filter((d) => d.status === "delivered" || d.delivery_date);
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

      const errorCount = data.filter((d) => d.is_order_error).length;
      const totalShipped = shipped.length || 1;
      const accuracy = ((totalShipped - errorCount) / totalShipped) * 100;

      return {
        totalShipped,
        avgDeliveryDays: Math.round(avgDays * 10) / 10,
        orderErrorCount: errorCount,
        orderAccuracy: Math.round(accuracy * 10) / 10,
      };
    },
    refetchInterval: 30000,
  });
}
