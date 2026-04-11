
-- Table des livraisons pour calculer délai livraison et total commandes
CREATE TABLE public.deliveries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL,
  customer_name TEXT,
  product TEXT,
  order_date DATE NOT NULL,
  ship_date DATE,
  delivery_date DATE,
  status TEXT NOT NULL DEFAULT 'pending',
  is_order_error BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour le coût de non-qualité (valeur éditable unique)
CREATE TABLE public.cost_non_quality (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  value NUMERIC NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'CAD',
  target NUMERIC NOT NULL DEFAULT 20000,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cost_non_quality ENABLE ROW LEVEL SECURITY;

-- Policies: everyone can read and write (no auth required for this dashboard)
CREATE POLICY "Anyone can read deliveries" ON public.deliveries FOR SELECT USING (true);
CREATE POLICY "Anyone can insert deliveries" ON public.deliveries FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update deliveries" ON public.deliveries FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete deliveries" ON public.deliveries FOR DELETE USING (true);

CREATE POLICY "Anyone can read cost_non_quality" ON public.cost_non_quality FOR SELECT USING (true);
CREATE POLICY "Anyone can insert cost_non_quality" ON public.cost_non_quality FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update cost_non_quality" ON public.cost_non_quality FOR UPDATE USING (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_deliveries_updated_at
  BEFORE UPDATE ON public.deliveries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cost_non_quality_updated_at
  BEFORE UPDATE ON public.cost_non_quality
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default cost_non_quality row
INSERT INTO public.cost_non_quality (value, currency, target) VALUES (45000, 'CAD', 20000);
