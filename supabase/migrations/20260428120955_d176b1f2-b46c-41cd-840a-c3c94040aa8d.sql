CREATE TABLE public.config (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  public_key text NOT NULL DEFAULT '',
  service_id text NOT NULL DEFAULT '',
  approve_template_id text NOT NULL DEFAULT '',
  reject_template_id text NOT NULL DEFAULT '',
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read config"
  ON public.config FOR SELECT
  USING (true);

CREATE POLICY "Public can insert config"
  ON public.config FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can update config"
  ON public.config FOR UPDATE
  USING (true)
  WITH CHECK (true);

INSERT INTO public.config (public_key, service_id, approve_template_id, reject_template_id)
VALUES ('', '', '', '');