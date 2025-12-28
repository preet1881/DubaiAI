-- Verify tables exist and structure
SELECT 
  'dashboard_data' as table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'dashboard_data'
UNION ALL
SELECT 
  'user_preferences' as table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'user_preferences'
ORDER BY table_name, column_name;
