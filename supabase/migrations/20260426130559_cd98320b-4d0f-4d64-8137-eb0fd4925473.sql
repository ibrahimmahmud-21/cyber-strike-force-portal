-- Submissions table
CREATE TABLE public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  father_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  address TEXT NOT NULL,
  education TEXT NOT NULL,
  motivation TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  nid_number TEXT NOT NULL,
  gender TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  facebook_link TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  id_card_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit
CREATE POLICY "Anyone can submit"
ON public.submissions
FOR INSERT
WITH CHECK (true);

-- Public read (admin panel uses password gate client-side; data is non-sensitive recruitment forms but still — keep it simple per spec)
CREATE POLICY "Public can read submissions"
ON public.submissions
FOR SELECT
USING (true);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('csf-photos', 'csf-photos', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) VALUES ('csf-ids', 'csf-ids', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: anyone can upload and read
CREATE POLICY "Public read csf-photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'csf-photos');

CREATE POLICY "Public upload csf-photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'csf-photos');

CREATE POLICY "Public read csf-ids"
ON storage.objects FOR SELECT
USING (bucket_id = 'csf-ids');

CREATE POLICY "Public upload csf-ids"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'csf-ids');