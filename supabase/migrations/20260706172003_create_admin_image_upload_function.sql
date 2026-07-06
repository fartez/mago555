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