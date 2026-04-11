import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Save, Database, FileSpreadsheet, DollarSign, ChevronDown, Trash2, AlertCircle, MessageSquareWarning } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useCostNonQuality, useUpdateCostNonQuality } from "@/hooks/useCostNonQuality";
import { toast } from "sonner";

export function DataManagement() {
  const [open, setOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importingComplaints, setImportingComplaints] = useState(false);
  const [costInput, setCostInput] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);
  const complaintsFileRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: costData } = useCostNonQuality();
  const updateCost = useUpdateCostNonQuality();

  const { data: deliveries, refetch: refetchDeliveries } = useQuery({
    queryKey: ["deliveries-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deliveries")
        .select("*")
        .order("order_date", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
  });

  const { data: complaints, refetch: refetchComplaints } = useQuery({
    queryKey: ["complaints-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .order("complaint_date", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
  });

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["deliveries-list"] });
    queryClient.invalidateQueries({ queryKey: ["complaints-list"] });
    queryClient.invalidateQueries({ queryKey: ["delivery-stats"] });
    queryClient.invalidateQueries({ queryKey: ["live-kpis"] });
  };

  const handleCSVImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);

    try {
      const text = await file.text();
      const lines = text.split("\n").filter((l) => l.trim());
      const headers = lines[0].split(/[,;]/).map((h) => h.trim().toLowerCase());

      const rows = lines.slice(1).map((line) => {
        const values = line.split(/[,;]/).map((v) => v.trim());
        const row: Record<string, string> = {};
        headers.forEach((h, i) => (row[h] = values[i] || ""));
        return row;
      });

      const mapped = rows
        .filter((r) => r.order_number || r.numero_commande || r.no_commande)
        .map((r) => ({
          order_number: r.order_number || r.numero_commande || r.no_commande || "",
          customer_name: r.customer_name || r.client || r.nom_client || null,
          product: r.product || r.produit || null,
          order_date: r.order_date || r.date_commande || new Date().toISOString().split("T")[0],
          ship_date: r.ship_date || r.date_expedition || null,
          delivery_date: r.delivery_date || r.date_livraison || null,
          status: r.status || r.statut || "delivered",
          is_order_error: false, // Will be auto-set by DB trigger from complaints
          notes: r.notes || null,
        }));

      if (mapped.length === 0) {
        toast.error("Aucune ligne valide trouvée dans le fichier");
        return;
      }

      const { error } = await supabase.from("deliveries").insert(mapped);
      if (error) throw error;

      toast.success(`${mapped.length} livraisons importées avec succès`);
      invalidateAll();
      refetchDeliveries();
    } catch (err: any) {
      toast.error("Erreur d'importation: " + err.message);
    } finally {
      setImporting(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleComplaintsImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportingComplaints(true);

    try {
      const text = await file.text();
      const lines = text.split("\n").filter((l) => l.trim());
      const headers = lines[0].split(/[,;]/).map((h) => h.trim().toLowerCase());

      const rows = lines.slice(1).map((line) => {
        const values = line.split(/[,;]/).map((v) => v.trim());
        const row: Record<string, string> = {};
        headers.forEach((h, i) => (row[h] = values[i] || ""));
        return row;
      });

      const mapped = rows
        .filter((r) => r.title || r.titre || r.description)
        .map((r) => ({
          order_number: r.order_number || r.numero_commande || r.no_commande || null,
          title: r.title || r.titre || r.description || "",
          category: r.category || r.categorie || r.type || "autre",
          source: r.source || "client",
          status: r.status || r.statut || "open",
          complaint_date: r.complaint_date || r.date_plainte || r.date || new Date().toISOString().split("T")[0],
          notes: r.notes || null,
        }));

      if (mapped.length === 0) {
        toast.error("Aucune ligne valide trouvée dans le fichier");
        return;
      }

      const { error } = await supabase.from("complaints").insert(mapped);
      if (error) throw error;

      toast.success(`${mapped.length} plaintes importées — correspondances erreur commande mises à jour automatiquement`);
      invalidateAll();
      refetchComplaints();
      refetchDeliveries();
    } catch (err: any) {
      toast.error("Erreur d'importation: " + err.message);
    } finally {
      setImportingComplaints(false);
      if (complaintsFileRef.current) complaintsFileRef.current.value = "";
    }
  };

  const handleSaveCost = () => {
    if (!costData?.id || !costInput) return;
    updateCost.mutate(
      { id: costData.id, value: parseFloat(costInput) },
      {
        onSuccess: () => {
          toast.success("Coût de non-qualité mis à jour");
          invalidateAll();
        },
      }
    );
  };

  const handleDeleteDeliveries = async () => {
    if (!confirm("Supprimer toutes les livraisons ?")) return;
    const { error } = await supabase.from("deliveries").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (error) { toast.error("Erreur: " + error.message); return; }
    toast.success("Toutes les livraisons supprimées");
    invalidateAll();
  };

  const handleDeleteComplaints = async () => {
    if (!confirm("Supprimer toutes les plaintes ?")) return;
    const { error } = await supabase.from("complaints").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (error) { toast.error("Erreur: " + error.message); return; }
    toast.success("Toutes les plaintes supprimées");
    invalidateAll();
  };

  const errorComplaints = complaints?.filter((c) => c.category === "erreur_commande") || [];

  return (
    <div className="rounded-lg border bg-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-primary" />
          <span className="text-sm font-mono font-bold text-foreground">
            GESTION DES DONNÉES
          </span>
          <span className="text-[10px] font-mono text-muted-foreground ml-2">
            Livraisons • Plaintes • Coût NQ
          </span>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-6 border-t">
              {/* Import Livraisons */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4 text-info" />
                  <span className="text-xs font-mono font-bold text-foreground uppercase">
                    Table Livraisons — Import CSV
                  </span>
                </div>

                <div className="bg-secondary/30 rounded p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-3 w-3 text-muted-foreground mt-0.5 shrink-0" />
                    <p className="text-[10px] font-mono text-muted-foreground">
                      Colonnes : order_number, customer_name, product, order_date, ship_date, delivery_date, status, notes
                      <br />
                      FR : numero_commande, client, produit, date_commande, date_expedition, date_livraison, statut
                      <br />
                      <span className="text-primary">⚡ Le champ "erreur_commande" est populé automatiquement via la correspondance avec les plaintes clients</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input ref={fileRef} type="file" accept=".csv" onChange={handleCSVImport} className="hidden" />
                  <button
                    onClick={() => fileRef.current?.click()}
                    disabled={importing}
                    className="flex items-center gap-2 px-4 py-2 rounded bg-primary/20 border border-primary/40 text-primary text-xs font-mono hover:bg-primary/30 transition-colors disabled:opacity-50"
                  >
                    <Upload className="h-3 w-3" />
                    {importing ? "Importation..." : "Importer CSV Livraisons"}
                  </button>
                  {deliveries && deliveries.length > 0 && (
                    <button onClick={handleDeleteDeliveries} className="flex items-center gap-2 px-4 py-2 rounded bg-destructive/20 border border-destructive/40 text-destructive text-xs font-mono hover:bg-destructive/30 transition-colors">
                      <Trash2 className="h-3 w-3" />Vider
                    </button>
                  )}
                </div>

                {deliveries && deliveries.length > 0 && (
                  <div className="mt-3 overflow-auto max-h-48 rounded border">
                    <table className="w-full text-[10px] font-mono">
                      <thead>
                        <tr className="bg-secondary/50 text-muted-foreground">
                          <th className="p-1.5 text-left">N° Commande</th>
                          <th className="p-1.5 text-left">Client</th>
                          <th className="p-1.5 text-left">Date CMD</th>
                          <th className="p-1.5 text-left">Date Livr.</th>
                          <th className="p-1.5 text-center">Erreur</th>
                        </tr>
                      </thead>
                      <tbody>
                        {deliveries.slice(0, 10).map((d) => (
                          <tr key={d.id} className="border-t border-border/50">
                            <td className="p-1.5 text-foreground">{d.order_number}</td>
                            <td className="p-1.5 text-foreground">{d.customer_name || "—"}</td>
                            <td className="p-1.5 text-foreground">{d.order_date}</td>
                            <td className="p-1.5 text-foreground">{d.delivery_date || "—"}</td>
                            <td className="p-1.5 text-center">
                              {d.is_order_error ? <span className="text-destructive">● OUI</span> : <span className="text-success">○</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="p-1.5 text-[10px] font-mono text-muted-foreground bg-secondary/30">
                      {deliveries.length} livraison(s) • Erreurs commande auto-détectées : {deliveries.filter(d => d.is_order_error).length}
                    </div>
                  </div>
                )}
              </div>

              {/* Import Plaintes Clients */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MessageSquareWarning className="h-4 w-4 text-destructive" />
                  <span className="text-xs font-mono font-bold text-foreground uppercase">
                    Table Plaintes Clients — Import CSV
                  </span>
                </div>

                <div className="bg-secondary/30 rounded p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-3 w-3 text-muted-foreground mt-0.5 shrink-0" />
                    <p className="text-[10px] font-mono text-muted-foreground">
                      Colonnes : order_number, title, category, source, status, complaint_date, notes
                      <br />
                      FR : numero_commande, titre, categorie, source, statut, date_plainte
                      <br />
                      <span className="text-warning">⚡ Catégorie "erreur_commande" → auto-correspondance avec livraisons via le numéro de commande</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input ref={complaintsFileRef} type="file" accept=".csv" onChange={handleComplaintsImport} className="hidden" />
                  <button
                    onClick={() => complaintsFileRef.current?.click()}
                    disabled={importingComplaints}
                    className="flex items-center gap-2 px-4 py-2 rounded bg-destructive/20 border border-destructive/40 text-destructive text-xs font-mono hover:bg-destructive/30 transition-colors disabled:opacity-50"
                  >
                    <Upload className="h-3 w-3" />
                    {importingComplaints ? "Importation..." : "Importer CSV Plaintes"}
                  </button>
                  {complaints && complaints.length > 0 && (
                    <button onClick={handleDeleteComplaints} className="flex items-center gap-2 px-4 py-2 rounded bg-destructive/20 border border-destructive/40 text-destructive text-xs font-mono hover:bg-destructive/30 transition-colors">
                      <Trash2 className="h-3 w-3" />Vider
                    </button>
                  )}
                </div>

                {complaints && complaints.length > 0 && (
                  <div className="mt-3 overflow-auto max-h-48 rounded border">
                    <table className="w-full text-[10px] font-mono">
                      <thead>
                        <tr className="bg-secondary/50 text-muted-foreground">
                          <th className="p-1.5 text-left">N° Commande</th>
                          <th className="p-1.5 text-left">Titre</th>
                          <th className="p-1.5 text-left">Catégorie</th>
                          <th className="p-1.5 text-left">Date</th>
                          <th className="p-1.5 text-left">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {complaints.slice(0, 10).map((c) => (
                          <tr key={c.id} className="border-t border-border/50">
                            <td className="p-1.5 text-foreground">{c.order_number || "—"}</td>
                            <td className="p-1.5 text-foreground">{c.title}</td>
                            <td className="p-1.5">
                              <span className={`px-1.5 py-0.5 rounded text-[9px] ${c.category === "erreur_commande" ? "bg-destructive/20 text-destructive" : "bg-secondary text-muted-foreground"}`}>
                                {c.category}
                              </span>
                            </td>
                            <td className="p-1.5 text-foreground">{c.complaint_date}</td>
                            <td className="p-1.5 text-foreground">{c.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="p-1.5 text-[10px] font-mono text-muted-foreground bg-secondary/30">
                      {complaints.length} plainte(s) • Erreurs commande : {errorComplaints.length}
                    </div>
                  </div>
                )}
              </div>

              {/* Coût Non-Qualité */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-warning" />
                  <span className="text-xs font-mono font-bold text-foreground uppercase">
                    Coût de Non-Qualité — Édition manuelle
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-xs font-mono text-muted-foreground">Valeur actuelle :</span>
                    <span className="text-sm font-mono font-bold text-foreground">
                      {costData?.value?.toLocaleString("fr-FR")} {costData?.currency}
                    </span>
                  </div>
                  <input
                    type="number"
                    placeholder="Nouvelle valeur"
                    value={costInput}
                    onChange={(e) => setCostInput(e.target.value)}
                    className="w-32 px-2 py-1.5 rounded border border-input bg-background text-foreground text-xs font-mono focus:ring-1 focus:ring-ring"
                  />
                  <button
                    onClick={handleSaveCost}
                    disabled={!costInput || updateCost.isPending}
                    className="flex items-center gap-2 px-4 py-1.5 rounded bg-warning/20 border border-warning/40 text-warning text-xs font-mono hover:bg-warning/30 transition-colors disabled:opacity-50"
                  >
                    <Save className="h-3 w-3" />
                    Sauvegarder
                  </button>
                </div>
              </div>

              {/* Sync info */}
              <div className="bg-primary/5 border border-primary/20 rounded p-3">
                <p className="text-[10px] font-mono text-primary">
                  ⚡ SYNCHRONISATION AUTOMATIQUE — Les KPIs "Délai Livraison", "Exactitude Commande" et "Coût Non-Qualité" sont calculés en temps réel à partir des données ci-dessus. La colonne "Erreur Commande" des livraisons est auto-populée par correspondance de numéro de commande avec les plaintes de catégorie "erreur_commande".
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
