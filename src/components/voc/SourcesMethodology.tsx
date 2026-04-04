import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface Section {
  title: string;
  icon: string;
  items: { label: string; detail: string }[];
}

const sections: Section[] = [
  {
    title: "Sources de Données",
    icon: "📂",
    items: [
      { label: "Plaintes Clients (n=559)", detail: "Base de données CRM interne, période oct. 2024 – mars 2026. Inclut plaintes téléphone, courriel et portail web. Classification manuelle par famille de défaut." },
      { label: "Inspections Produit Fini (n=1 095)", detail: "Rapports d'inspection finale (100% visuel + test fonctionnel). Source : système MES ligne d'assemblage. Critères : fuite, O-ring, calibration, cosmétique." },
      { label: "Non-Conformités Fournisseurs (n=1 561)", detail: "Rapports de réception matière (IQC). Source : module qualité ERP. Inclut lots rejetés, dérogations et retours fournisseurs." },
      { label: "Avis en Ligne & Réseaux (n=150)", detail: "Agrégation manuelle des avis Google, forums spécialisés (ThumperTalk, DirtRider) et commentaires réseaux sociaux. Période : 12 derniers mois." },
      { label: "Reprises en Production (n=98)", detail: "Tickets de retouche/reprise issus du système MES. Inclut démontage, re-calibration et remplacement composant." },
    ],
  },
  {
    title: "Formules de Calcul",
    icon: "📐",
    items: [
      { label: "Score Composite (Priorisation)", detail: "Score = Fréquence × Sévérité × Poids Kano\n• Fréquence : nombre d'occurrences sur la période\n• Sévérité : échelle 1-10 (impact client)\n• Poids Kano : Must-Be = 3, Performance = 2, Attractive = 1" },
      { label: "DPMO (Fournisseurs)", detail: "DPMO = (Nombre de défauts / (Nombre d'unités inspectées × Opportunités par unité)) × 1 000 000\nOpportunités par unité = 4 (dimensions, matériau, traitement surface, emballage)" },
      { label: "PPM Fournisseurs", detail: "PPM = (Pièces non conformes / Pièces reçues totales) × 1 000 000\nBase : 1 561 NC sur ~56 000 pièces reçues = 27 875 PPM" },
      { label: "PPM Interne (Produit Fini)", detail: "PPM = (Unités NC inspection finale / Unités produites) × 1 000 000\nBase : 151 NC sur ~1 095 inspections = 137 900 PPM" },
      { label: "Cpk (Capacité Procédé)", detail: "Cpk = min((LSS - μ) / 3σ, (μ - LSI) / 3σ)\n• LSS/LSI : Limites de spécification supérieure/inférieure\n• μ : Moyenne du procédé\n• σ : Écart-type du procédé\nCpk Assemblage = 0.85 (sous-capable), Cpk Calibration = 1.12 (acceptable)" },
      { label: "Taux Lots Rejetés (LR)", detail: "LR = (Lots rejetés / Lots reçus totaux) × 100\nBase : 45 lots rejetés sur 312 lots reçus = 14.4%" },
      { label: "NPS / Score Satisfaction", detail: "Score moyen pondéré des avis en ligne (échelle 1-5).\nNPS estimé = % Promoteurs (4-5) − % Détracteurs (1-2)" },
      { label: "Cumul Pareto (%)", detail: "Cumul(i) = Σ(count₁..countᵢ) / Σ(count_total) × 100\nLe seuil 80/20 identifie les familles de problèmes prioritaires." },
    ],
  },
  {
    title: "Hypothèses & Limites",
    icon: "⚠️",
    items: [
      { label: "Classification Kano", detail: "Attribution basée sur l'analyse qualitative des entretiens VOC et le jugement expert. Les catégories (Must-Be, Performance, Attractive) sont fixées et non réévaluées dynamiquement." },
      { label: "Sévérité", detail: "Échelle 1-10 attribuée par l'équipe qualité selon l'impact client perçu. Non basée sur une étude AMDEC formelle pour tous les modes de défaillance." },
      { label: "Opportunités par unité (DPMO)", detail: "Fixé à 4 opportunités par pièce fournisseur. Ce chiffre est une estimation simplifiée ; une analyse détaillée pourrait révéler plus d'opportunités de défaut." },
      { label: "Période de référence", detail: "Données agrégées sur 6 mois (oct. 2025 – mars 2026) sauf mention contraire. Les tendances court terme peuvent ne pas refléter les variations saisonnières." },
      { label: "Cpk — Échantillonnage", detail: "Calculé sur les données d'inspection disponibles. Taille d'échantillon limitée pour certaines lignes de produit, ce qui peut affecter la fiabilité statistique." },
      { label: "Avis en ligne", detail: "Échantillon non exhaustif. Biais de sélection possible (clients insatisfaits surreprésentés). Pas de pondération par volume de ventes." },
    ],
  },
];

export const SourcesMethodology = () => {
  const [mainOpen, setMainOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});

  const toggle = (i: number) =>
    setOpenSections((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <Collapsible open={mainOpen} onOpenChange={setMainOpen}>
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CollapsibleTrigger className="w-full text-left">
          <CardHeader className="pb-3 flex flex-row items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors rounded-t-lg">
            <CardTitle className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <span className="text-primary">📖</span> Sources, Méthodologie & Hypothèses
            </CardTitle>
            <motion.span animate={{ rotate: mainOpen ? 90 : 0 }} className="text-muted-foreground text-xs">▸</motion.span>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-2 pt-0">
            {sections.map((section, i) => (
              <Collapsible key={i} open={openSections[i]} onOpenChange={() => toggle(i)}>
            <CollapsibleTrigger className="w-full flex items-center gap-2 px-3 py-2 rounded-md bg-muted/30 hover:bg-muted/60 transition-colors text-left">
              <span>{section.icon}</span>
              <span className="text-xs font-mono font-semibold text-foreground flex-1">
                {section.title}
              </span>
              <motion.span
                animate={{ rotate: openSections[i] ? 90 : 0 }}
                className="text-muted-foreground text-xs"
              >
                ▸
              </motion.span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-1 space-y-1 pl-2">
                {section.items.map((item, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.03 }}
                    className="border-l-2 border-primary/20 pl-3 py-2"
                  >
                    <div className="text-xs font-mono font-semibold text-foreground">{item.label}</div>
                    <div className="text-[11px] font-mono text-muted-foreground whitespace-pre-line leading-relaxed mt-0.5">
                      {item.detail}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
