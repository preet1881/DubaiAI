-- Migration Script: Migrate JSONB data to normalized tables
-- Run this after creating the normalized schema

DO $$
DECLARE
  json_data JSONB;
  category_rec RECORD;
  journey_rec RECORD;
  stage_rec RECORD;
  dep_rec RECORD;
  category_id_val UUID;
  journey_id_val UUID;
  stage_order INTEGER;
BEGIN
  -- Get the latest JSONB data
  SELECT data INTO json_data
  FROM dashboard_data
  ORDER BY updated_at DESC
  LIMIT 1;

  -- If no data exists, exit
  IF json_data IS NULL THEN
    RAISE NOTICE 'No data to migrate';
    RETURN;
  END IF;

  -- Loop through each category
  FOR category_rec IN SELECT * FROM jsonb_each(json_data) LOOP
    -- Get or create category
    SELECT id INTO category_id_val
    FROM categories
    WHERE name = category_rec.key;

    IF category_id_val IS NULL THEN
      INSERT INTO categories (name, display_order)
      VALUES (category_rec.key, 0)
      RETURNING id INTO category_id_val;
    END IF;

    -- Loop through journeys in this category
    FOR journey_rec IN SELECT * FROM jsonb_array_elements(category_rec.value) LOOP
      -- Get or create journey
      SELECT id INTO journey_id_val
      FROM journeys
      WHERE category_id = category_id_val
        AND name = journey_rec.value->>'name';

      IF journey_id_val IS NULL THEN
        INSERT INTO journeys (category_id, name, notes)
        VALUES (
          category_id_val,
          journey_rec.value->>'name',
          COALESCE(journey_rec.value->>'notes', '')
        )
        RETURNING id INTO journey_id_val;
      ELSE
        -- Update existing journey notes
        UPDATE journeys
        SET notes = COALESCE(journey_rec.value->>'notes', ''),
            updated_at = NOW()
        WHERE id = journey_id_val;
      END IF;

      -- Insert/update stages
      stage_order := 0;
      FOR stage_rec IN SELECT * FROM jsonb_array_elements(journey_rec.value->'stages') LOOP
        INSERT INTO stages (
          journey_id, name, status, progress, eta, actual, notes, display_order
        )
        VALUES (
          journey_id_val,
          stage_rec.value->>'name',
          COALESCE(stage_rec.value->>'status', 'not-started'),
          COALESCE((stage_rec.value->>'progress')::INTEGER, 0),
          NULLIF(stage_rec.value->>'eta', ''),
          NULLIF(stage_rec.value->>'actual', ''),
          COALESCE(stage_rec.value->>'notes', ''),
          stage_order
        )
        ON CONFLICT (journey_id, name) DO UPDATE SET
          status = EXCLUDED.status,
          progress = EXCLUDED.progress,
          eta = EXCLUDED.eta,
          actual = EXCLUDED.actual,
          notes = EXCLUDED.notes,
          display_order = EXCLUDED.display_order,
          updated_at = NOW();

        stage_order := stage_order + 1;
      END LOOP;

      -- Insert/update dependencies
      FOR dep_rec IN SELECT * FROM jsonb_array_elements(COALESCE(journey_rec.value->'dependencies', '[]'::jsonb)) LOOP
        INSERT INTO dependencies (journey_id, item, depends_on, status)
        VALUES (
          journey_id_val,
          dep_rec.value->>'item',
          dep_rec.value->>'dependsOn',
          COALESCE(dep_rec.value->>'status', 'pending')
        )
        ON CONFLICT DO NOTHING;
      END LOOP;
    END LOOP;
  END LOOP;

  RAISE NOTICE 'Migration completed successfully';
END $$;

