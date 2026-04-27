-- Add status, reject_reason fields
ALTER TABLE public.submissions
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS reject_reason text;

-- Add a check on status values via trigger (avoids immutable issues)
CREATE OR REPLACE FUNCTION public.csf_validate_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status NOT IN ('pending', 'approved', 'rejected') THEN
    RAISE EXCEPTION 'Invalid status: %', NEW.status;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

DROP TRIGGER IF EXISTS csf_validate_status_trigger ON public.submissions;
CREATE TRIGGER csf_validate_status_trigger
BEFORE INSERT OR UPDATE ON public.submissions
FOR EACH ROW EXECUTE FUNCTION public.csf_validate_status();

-- Index on status for filtering
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.submissions(status);

-- Deduplicate existing rows by email (keep latest)
DELETE FROM public.submissions a
USING public.submissions b
WHERE a.email = b.email
  AND a.created_at < b.created_at;

-- Unique constraint on email (case-insensitive) for upsert
CREATE UNIQUE INDEX IF NOT EXISTS submissions_email_unique ON public.submissions (lower(email));

-- Allow public DELETE so admin panel can delete submissions
DROP POLICY IF EXISTS "Public can delete submissions" ON public.submissions;
CREATE POLICY "Public can delete submissions"
ON public.submissions
FOR DELETE
TO public
USING (true);