/*
  # Create site_images table for admin image management

  1. New Tables
    - `site_images`
      - `id` (uuid, primary key)
      - `key` (text, unique, not null) - identifier for the image (e.g. 'hero_banner', 'doctor_photo')
      - `page` (text, not null) - which page/section this image belongs to
      - `label` (text, not null) - Georgian display label for admin UI
      - `url` (text, not null) - current image URL or path
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `site_images` table
    - Anyone can read (for frontend display)
    - Writes go through admin_upsert_image function

  3. Notes
    - Images are stored in Supabase Storage bucket 'site-images'
    - This table stores the metadata/URL references
*/

CREATE TABLE IF NOT EXISTS site_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  page text NOT NULL,
  label text NOT NULL,
  url text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site images"
  ON site_images FOR SELECT
  TO anon, authenticated
  USING (true);

-- Seed initial image registry
INSERT INTO site_images (key, page, label, url) VALUES
  ('home_hero', 'home', 'მთავარი გვერდი - ჰეროს სურათი', '/images/img1.jpg'),
  ('home_doctor', 'home', 'მთავარი გვერდი - ექიმის სურათი', '/images/avtori.jpg'),
  ('home_apparatus', 'home', 'მთავარი გვერდი - აპარატი', '/images/app.jpg'),
  ('home_patent', 'home', 'მთავარი გვერდი - პატენტი', '/images/d8c9c41a322726df07f26884b2acc310.png'),
  ('about_doctor', 'about', 'ჩვენს შესახებ - ექიმის სურათი', '/images/avtori.jpg'),
  ('about_brain', 'about', 'ჩვენს შესახებ - ტვინი', '/images/mozg.jpg'),
  ('about_patent', 'about', 'ჩვენს შესახებ - პატენტი', '/newpage/about/patent.jpg'),
  ('magotherapy_main', 'magotherapy', 'მაგოთერაპია - მთავარი სურათი', '/images/neurofinal.jpg'),
  ('magotherapy_cell', 'magotherapy', 'მაგოთერაპია - უჯრედი', '/images/ujredi.jpg'),
  ('magotherapy_brain', 'magotherapy', 'მაგოთერაპია - ტვინი', '/images/NEIRONI2.jpg'),
  ('glaukoma_hero', 'glaukoma', 'გლაუკომა - მთავარი სურათი', '/newpage/glaucoma/glaukomafoto.jpg'),
  ('amblyopia_hero', 'amblyopia', 'ამბლიოპია - მთავარი სურათი', '/images/AMBLIOPIA.jpg'),
  ('astigmatizm_hero', 'astigmatizm', 'ასტიგმატიზმი - მთავარი სურათი', '/newpage/astigmatizm/ASTIGMATIZM.png'),
  ('sielme_hero', 'sielme', 'სიელმე - მთავარი სურათი', '/images/sielme2.jpg'),
  ('pigmenturetinite_hero', 'pigmenturetinite', 'პიგმენტური რეტინიტი - მთავარი სურათი', '/images/retinitis_saTauris_suraTi.jpg'),
  ('zogadi_hero', 'zogadi', 'ზოგადი შედეგები - მთავარი სურათი', '/images/zogadi.jpg')
ON CONFLICT (key) DO NOTHING;
