/**
 * Migration Script: Migrate JSONB data to normalized tables
 * 
 * Run this after creating the normalized schema:
 * node migrations/migrate-data.js
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrateData() {
  console.log('Starting migration...');

  try {
    // 1. Fetch existing JSONB data
    const { data: existingData, error: fetchError } = await supabase
      .from('dashboard_data')
      .select('data')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !existingData || !existingData.data) {
      console.log('No existing data found. Starting fresh.');
      return;
    }

    const jsonData = existingData.data;
    console.log('Found existing data. Migrating...');

    // 2. Get or create categories
    const categoryMap = {};
    for (const [categoryName, journeys] of Object.entries(jsonData)) {
      // Get or create category
      let { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('name', categoryName)
        .single();

      if (!category) {
        const { data: newCategory, error } = await supabase
          .from('categories')
          .insert({ name: categoryName })
          .select()
          .single();

        if (error) throw error;
        category = newCategory;
      }

      categoryMap[categoryName] = category.id;

      // 3. Create journeys
      for (let journeyIndex = 0; journeyIndex < journeys.length; journeyIndex++) {
        const journey = journeys[journeyIndex];

        // Check if journey exists
        let { data: existingJourney } = await supabase
          .from('journeys')
          .select('id')
          .eq('category_id', category.id)
          .eq('name', journey.name)
          .single();

        let journeyId;

        if (!existingJourney) {
          const { data: newJourney, error } = await supabase
            .from('journeys')
            .insert({
              category_id: category.id,
              name: journey.name,
              notes: journey.notes || ''
            })
            .select()
            .single();

          if (error) throw error;
          journeyId = newJourney.id;
        } else {
          journeyId = existingJourney.id;
        }

        // 4. Create stages
        if (journey.stages) {
          for (let stageIndex = 0; stageIndex < journey.stages.length; stageIndex++) {
            const stage = journey.stages[stageIndex];

            // Check if stage exists
            let { data: existingStage } = await supabase
              .from('stages')
              .select('id')
              .eq('journey_id', journeyId)
              .eq('name', stage.name)
              .single();

            if (!existingStage) {
              const { error } = await supabase
                .from('stages')
                .insert({
                  journey_id: journeyId,
                  name: stage.name,
                  status: stage.status || 'not-started',
                  progress: stage.progress || 0,
                  eta: stage.eta || null,
                  actual: stage.actual || null,
                  notes: stage.notes || '',
                  display_order: stageIndex
                });

              if (error) throw error;
            }
          }
        }

        // 5. Create dependencies
        if (journey.dependencies) {
          for (const dep of journey.dependencies) {
            // Check if dependency exists
            let { data: existingDep } = await supabase
              .from('dependencies')
              .select('id')
              .eq('journey_id', journeyId)
              .eq('item', dep.item)
              .eq('depends_on', dep.dependsOn)
              .single();

            if (!existingDep) {
              const { error } = await supabase
                .from('dependencies')
                .insert({
                  journey_id: journeyId,
                  item: dep.item,
                  depends_on: dep.dependsOn,
                  status: dep.status || 'pending'
                });

              if (error) throw error;
            }
          }
        }
      }
    }

    console.log('✅ Migration completed successfully!');
    console.log('You can now use the normalized API.');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateData();

