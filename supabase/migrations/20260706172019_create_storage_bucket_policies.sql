CREATE POLICY "Public can read site images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'site-images');

CREATE POLICY "Anyone can upload site images"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'site-images');

CREATE POLICY "Anyone can update site images"
  ON storage.objects FOR UPDATE
  TO anon, authenticated
  USING (bucket_id = 'site-images')
  WITH CHECK (bucket_id = 'site-images');