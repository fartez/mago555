/*
  # Create site_content table for multilingual content management

  1. New Tables
    - `site_content`
      - `id` (uuid, primary key)
      - `page` (text, not null) - which page this content belongs to (e.g. 'home', 'about', 'navigation')
      - `key` (text, not null) - the translation key identifier
      - `lang` (text, not null) - language code: 'ge', 'en', or 'ru'
      - `value` (text, not null) - the actual text content
      - `updated_at` (timestamptz, default now())
      - Unique constraint on (page, key, lang)

  2. Security
    - Enable RLS on `site_content` table
    - Anyone can SELECT (public website reads translations)
    - Only admin-authenticated users can INSERT/UPDATE (via admin token in localStorage)
    - Updates go through a SECURITY DEFINER function that checks admin session

  3. Notes
    - Page values: 'home', 'about', 'contact', 'navigation', 'footer', 'faq',
      'magotherapy', 'gallery', 'booking', 'glaukoma', 'amblyopia',
      'astigmatizm', 'sielme', 'pigmenturetinite', 'zogadi', 'shared'
    - lang values: 'ge', 'en', 'ru'
*/

CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  key text NOT NULL,
  lang text NOT NULL CHECK (lang IN ('ge', 'en', 'ru')),
  value text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page, key, lang)
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public can read all site content (needed for frontend to display translated text)
CREATE POLICY "Anyone can read site content"
  ON site_content FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only service role can insert/update (admin operations go through RPC)
-- No direct INSERT/UPDATE for anon users
