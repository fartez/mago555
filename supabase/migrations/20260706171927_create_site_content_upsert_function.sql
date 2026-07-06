CREATE OR REPLACE FUNCTION admin_upsert_content(
  p_email text,
  p_password text,
  p_page text,
  p_key text,
  p_lang text,
  p_value text
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

  INSERT INTO site_content (page, key, lang, value, updated_at)
  VALUES (p_page, p_key, p_lang, p_value, now())
  ON CONFLICT (page, key, lang)
  DO UPDATE SET value = EXCLUDED.value, updated_at = now();

  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION admin_upsert_content(text, text, text, text, text, text) TO anon, authenticated;