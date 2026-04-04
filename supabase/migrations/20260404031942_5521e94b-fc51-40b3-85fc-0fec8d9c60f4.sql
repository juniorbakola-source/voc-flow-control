
-- Table des plaintes clients
CREATE TABLE public.complaints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'autre',
  source TEXT NOT NULL DEFAULT 'client',
  status TEXT NOT NULL DEFAULT 'open',
  complaint_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read complaints" ON public.complaints FOR SELECT USING (true);
CREATE POLICY "Anyone can insert complaints" ON public.complaints FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update complaints" ON public.complaints FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete complaints" ON public.complaints FOR DELETE USING (true);

CREATE TRIGGER update_complaints_updated_at
  BEFORE UPDATE ON public.complaints
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function: when a complaint is inserted/updated, mark matching deliveries
CREATE OR REPLACE FUNCTION public.sync_order_error_from_complaint()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.category = 'erreur_commande' AND NEW.order_number IS NOT NULL AND NEW.order_number != '' THEN
    UPDATE public.deliveries SET is_order_error = true WHERE order_number = NEW.order_number;
  END IF;
  -- If category changed away from erreur_commande, unmark
  IF TG_OP = 'UPDATE' AND OLD.category = 'erreur_commande' AND NEW.category != 'erreur_commande' AND OLD.order_number IS NOT NULL THEN
    -- Only unmark if no other erreur_commande complaint references same order
    UPDATE public.deliveries SET is_order_error = false
    WHERE order_number = OLD.order_number
      AND NOT EXISTS (
        SELECT 1 FROM public.complaints
        WHERE order_number = OLD.order_number AND category = 'erreur_commande' AND id != NEW.id
      );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER sync_complaint_to_delivery
  AFTER INSERT OR UPDATE ON public.complaints
  FOR EACH ROW EXECUTE FUNCTION public.sync_order_error_from_complaint();

-- Function: when a delivery is inserted, check if a matching complaint exists
CREATE OR REPLACE FUNCTION public.sync_order_error_from_delivery()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NOT NULL AND NEW.order_number != '' THEN
    IF EXISTS (
      SELECT 1 FROM public.complaints
      WHERE order_number = NEW.order_number AND category = 'erreur_commande'
    ) THEN
      NEW.is_order_error := true;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER sync_delivery_from_complaint
  BEFORE INSERT ON public.deliveries
  FOR EACH ROW EXECUTE FUNCTION public.sync_order_error_from_delivery();
