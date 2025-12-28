-- Migration: Clean up old dashboard_data table
-- Since we've migrated to normalized tables, the old JSONB table is no longer needed

-- Option 1: Archive the old table (recommended for safety)
-- ALTER TABLE dashboard_data RENAME TO dashboard_data_archive;

-- Option 2: Clear the data but keep table structure (allows rollback)
TRUNCATE TABLE dashboard_data;

-- Option 3: Drop the table entirely (cleanest, but no rollback)
-- DROP TABLE IF EXISTS dashboard_data CASCADE;

-- Note: The frontend now uses normalized tables:
-- - categories
-- - journeys  
-- - stages
-- - dependencies
-- 
-- The old dashboard_data table is no longer used by the application.

