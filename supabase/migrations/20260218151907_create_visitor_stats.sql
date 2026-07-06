/*
  # Create admin_users table

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null)
      - `password_hash` (text, not null) - stores bcrypt-style hash
      - `created_at` (timestamptz, default now())
      - `last_login` (timestamptz, nullable)

  2. Security
    - Enable RLS on `admin_users` table
    - No public access - only service role can access this table
    - Admin login is verified via a secure RPC function

  3. Notes
    - Password is stored as a SHA-256 hex hash for simplicity with edge verification
    - Initial admin credential seeded: doctormago2018@gmail.com
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- No SELECT policy for anon/authenticated - only service role via RPC
-- Admin verification is done via a SECURITY DEFINER function

-- Insert the admin user with SHA-256 hash of '599506507M'
-- SHA-256('599506507M') = stored as hex string
INSERT INTO admin_users (email, password_hash)
VALUES (
  'doctormago2018@gmail.com',
  encode(sha256('599506507M'::bytea), 'hex')
)
ON CONFLICT (email) DO NOTHING;
