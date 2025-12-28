-- Migration: Migrate existing JSONB data to normalized tables
-- This script reads from dashboard_data table and populates the new normalized tables

-- Note: This should be run after the normalized schema is created
-- The migration logic will be handled by a Node.js script or can be done manually

-- Example query to extract data (for reference):
-- SELECT 
--   jsonb_each(data) as category_data
-- FROM dashboard_data
-- LIMIT 1;

-- The actual migration will be done via a script that:
-- 1. Reads the JSONB from dashboard_data
-- 2. For each category:
--    a. Insert/update category
--    b. For each journey:
--       - Insert/update journey
--       - For each stage: Insert/update stage
--       - For each dependency: Insert/update dependency

