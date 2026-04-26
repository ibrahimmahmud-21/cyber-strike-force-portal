ALTER TABLE public.submissions
ADD COLUMN IF NOT EXISTS is_read boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON public.submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_is_read ON public.submissions (is_read);

-- Allow public to mark submissions as read (admin uses password gate client-side)
DROP POLICY IF EXISTS "Public can mark submissions as read" ON public.submissions;
CREATE POLICY "Public can mark submissions as read"
ON public.submissions
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Enable realtime for new-submission notifications
ALTER TABLE public.submissions REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.submissions;