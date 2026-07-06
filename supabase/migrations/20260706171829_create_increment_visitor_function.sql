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