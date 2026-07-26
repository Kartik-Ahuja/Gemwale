/*
Enable product image uploads in Supabase Storage.
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('products', 'products', true, 5242880, ARRAY['image/jpeg','image/png','image/webp','image/gif'])
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "public_read_products" ON storage.objects;
CREATE POLICY "public_read_products"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'products');

DROP POLICY IF EXISTS "anon_insert_products" ON storage.objects;
CREATE POLICY "anon_insert_products"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'products');

DROP POLICY IF EXISTS "anon_update_products" ON storage.objects;
CREATE POLICY "anon_update_products"
  ON storage.objects FOR UPDATE
  TO anon, authenticated
  USING (bucket_id = 'products')
  WITH CHECK (bucket_id = 'products');

DROP POLICY IF EXISTS "anon_delete_products" ON storage.objects;
CREATE POLICY "anon_delete_products"
  ON storage.objects FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'products');
