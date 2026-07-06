/*
  # Create visitor_stats table

  ## Summary
  Tracks daily website visitor counts to power the live visitor counter in the footer.

  ## New Tables
  - `visitor_stats`
    - `id` (uuid, primary key)
    - `visit_date` (date, unique) - one row per calendar day
    - `daily_count` (integer) - number of sessions that visited on this date

  ## Security
  - RLS enabled
  - Anonymous users can read all rows (to display total + today's count)
  - Anonymous users can insert or update today's row (to record their visit)
  - Policies are scoped so users can only upsert the current date row
*/

CREATE TABLE IF NOT EXISTS visitor_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_date date UNIQUE NOT NULL,
  daily_count integer NOT NULL DEFAULT 0
);

ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read visitor stats"
  ON visitor_stats FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert today's stats"
  ON visitor_stats FOR INSERT
  TO anon, authenticated
  WITH CHECK (visit_date = CURRENT_DATE);

CREATE POLICY "Anyone can update today's stats"
  ON visitor_stats FOR UPDATE
  TO anon, authenticated
  USING (visit_date = CURRENT_DATE)
  WITH CHECK (visit_date = CURRENT_DATE);
