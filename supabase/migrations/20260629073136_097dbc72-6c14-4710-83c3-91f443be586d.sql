
-- CONFIG: drop public policies, restrict to authenticated
DROP POLICY IF EXISTS "Public can insert config" ON public.config;
DROP POLICY IF EXISTS "Public can read config" ON public.config;
DROP POLICY IF EXISTS "Public can update config" ON public.config;

CREATE POLICY "Authenticated can read config" ON public.config
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert config" ON public.config
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update config" ON public.config
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

REVOKE ALL ON public.config FROM anon;
GRANT SELECT, INSERT, UPDATE ON public.config TO authenticated;
GRANT ALL ON public.config TO service_role;

-- SUBMISSIONS: keep public INSERT, restrict everything else to authenticated
DROP POLICY IF EXISTS "Public can delete submissions" ON public.submissions;
DROP POLICY IF EXISTS "Public can mark submissions as read" ON public.submissions;
DROP POLICY IF EXISTS "Public can read submissions" ON public.submissions;

CREATE POLICY "Authenticated can read submissions" ON public.submissions
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can update submissions" ON public.submissions
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete submissions" ON public.submissions
  FOR DELETE TO authenticated USING (true);

REVOKE SELECT, UPDATE, DELETE ON public.submissions FROM anon;
GRANT INSERT ON public.submissions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.submissions TO authenticated;
GRANT ALL ON public.submissions TO service_role;

-- REALTIME: stop broadcasting submissions
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'submissions'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.submissions';
  END IF;
END $$;

-- STORAGE: drop public read policies, restrict to authenticated
DROP POLICY IF EXISTS "Public read csf-photos" ON storage.objects;
DROP POLICY IF EXISTS "Public read csf-ids" ON storage.objects;

CREATE POLICY "Authenticated read csf-photos" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'csf-photos');
CREATE POLICY "Authenticated read csf-ids" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'csf-ids');
