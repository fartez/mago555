/*
  # Create admin image upsert function

  1. New Function
    - `admin_upsert_image(p_email text, p_password text, p_key text, p_url text)`
    - Verifies admin credentials then updates the image URL
    - Returns boolean indicating success

  2. Notes
    - Works similarly to admin_upsert_content but for images
    - URL can be a Supabase Storage public URL after upload
*/

CREATE OR REPLACE FUNCTION admin_upsert_image(
  p_email text,
  p_password text,
  p_key text,
  p_url text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_is_admin boolean;
BEGIN
  SELECT verify_admin_login(p_email, p_password) INTO v_is_admin;

  IF NOT v_is_admin THEN
    RETURN false;
  END IF;

  UPDATE site_images
  SET url = p_url, updated_at = now()
  WHERE key = p_key;

  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION admin_upsert_image(text, text, text, text) TO anon, authenticated;
