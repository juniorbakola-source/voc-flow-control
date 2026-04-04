import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useCostNonQuality() {
  return useQuery({
    queryKey: ["cost-non-quality"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cost_non_quality")
        .select("*")
        .limit(1)
        .single();
      if (error) throw error;
      return data;
    },
    refetchInterval: 30000,
  });
}

export function useUpdateCostNonQuality() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, value }: { id: string; value: number }) => {
      const { error } = await supabase
        .from("cost_non_quality")
        .update({ value })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cost-non-quality"] });
      queryClient.invalidateQueries({ queryKey: ["live-kpis"] });
    },
  });
}
