-- Convert single image URLs to arrays to support multiple uploads
ALTER TABLE public.submissions
  ALTER COLUMN photo_url TYPE text[] USING ARRAY[photo_url]::text[],
  ALTER COLUMN id_card_url TYPE text[] USING ARRAY[id_card_url]::text[];

-- Make motivation optional
ALTER TABLE public.submissions
  ALTER COLUMN motivation DROP NOT NULL;