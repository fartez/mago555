/*
  # Create admin verification RPC function

  1. New Function
    - `verify_admin_login(p_email text, p_password text)`
    - Returns boolean indicating if credentials are valid
    - Updates last_login timestamp on successful verification
    - SECURITY DEFINER so anon role can call it without direct table access

  2. Security
    - Function is SECURITY DEFINER (runs as table owner)
    - Password compared as SHA-256 hash
    - Anon users can call this function but cannot query admin_users directly
*/

CREATE OR REPLACE FUNCTION verify_admin_login(p_email text, p_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_hash text;
  v_stored_hash text;
  v_id uuid;
BEGIN
  v_hash := encode(sha256(p_password::bytea), 'hex');

  SELECT id, password_hash INTO v_id, v_stored_hash
  FROM admin_users
  WHERE email = p_email;

  IF v_id IS NULL THEN
    RETURN false;
  END IF;

  IF v_hash = v_stored_hash THEN
    UPDATE admin_users SET last_login = now() WHERE id = v_id;
    RETURN true;
  END IF;

  RETURN false;
END;
$$;

-- Allow anon and authenticated roles to call this function
GRANT EXECUTE ON FUNCTION verify_admin_login(text, text) TO anon, authenticated;
