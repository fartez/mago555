CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

INSERT INTO admin_users (email, password_hash)
VALUES (
  'doctormago2018@gmail.com',
  encode(sha256('599506507M'::bytea), 'hex')
)
ON CONFLICT (email) DO NOTHING;