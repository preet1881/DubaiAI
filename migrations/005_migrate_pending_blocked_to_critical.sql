-- Migration: Move pending and blocked stages to critical status
-- This migration updates all stages with status 'pending' or 'blocked' to 'critical'

BEGIN;

-- Update stages table: move pending and blocked to critical
UPDATE public.stages
SET 
  status = 'critical',
  updated_at = NOW()
WHERE status IN ('pending', 'blocked');

-- Update dependencies table: move pending and blocked to critical
UPDATE public.dependencies
SET 
  status = 'critical',
  updated_at = NOW()
WHERE status IN ('pending', 'blocked');

COMMIT;

-- Verify the migration
-- SELECT status, COUNT(*) FROM public.stages GROUP BY status;
-- SELECT status, COUNT(*) FROM public.dependencies GROUP BY status;

