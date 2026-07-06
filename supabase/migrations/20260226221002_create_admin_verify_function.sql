/*
  # Create increment_visitor RPC function

  ## Summary
  Creates a PostgreSQL function callable via Supabase RPC that atomically
  increments the daily visitor count for a given date.
  Uses INSERT ... ON CONFLICT to safely upsert the row without race conditions.

  ## Function
  - `increment_visitor(p_date date)` - inserts a new row for the date with count 1,
    or increments the existing count by 1 if the row already exists.
*/

CREATE OR REPLACE FUNCTION increment_visitor(p_date date)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO visitor_stats (visit_date, daily_count)
  VALUES (p_date, 1)
  ON CONFLICT (visit_date)
  DO UPDATE SET daily_count = visitor_stats.daily_count + 1;
END;
$$;
