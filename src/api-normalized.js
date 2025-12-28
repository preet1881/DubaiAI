/**
 * Normalized API Service for Dubai AI Dashboard
 * Uses normalized tables instead of JSONB blob
 * Each update only touches the specific field/table that changed
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase credentials not found.');
}

/**
 * Fetch all dashboard data and aggregate into the same structure
 * This is called once on page load
 */
export const fetchAllDashboardData = async () => {
  if (!supabase) throw new Error('Supabase not initialized');

  try {
    // Fetch all data in parallel
    const [categoriesResult, journeysResult, stagesResult, dependenciesResult] = await Promise.all([
      supabase.from('categories').select('*').order('display_order'),
      supabase.from('journeys').select('*'),
      supabase.from('stages').select('*').order('display_order'),
      supabase.from('dependencies').select('*')
    ]);

    if (categoriesResult.error) throw categoriesResult.error;
    if (journeysResult.error) throw journeysResult.error;
    if (stagesResult.error) throw stagesResult.error;
    if (dependenciesResult.error) throw dependenciesResult.error;

    const categories = categoriesResult.data || [];
    const journeys = journeysResult.data || [];
    const stages = stagesResult.data || [];
    const dependencies = dependenciesResult.data || [];

    // Aggregate into the same structure as before
    const aggregated = {};

    categories.forEach(category => {
      aggregated[category.name] = journeys
        .filter(j => j.category_id === category.id)
        .map(journey => {
          const journeyStages = stages
            .filter(s => s.journey_id === journey.id)
            .map(stage => ({
              id: stage.id,
              name: stage.name,
              status: stage.status,
              progress: stage.progress,
              eta: stage.eta || '',
              actual: stage.actual || '',
              notes: stage.notes || ''
            }));

          const journeyDependencies = dependencies
            .filter(d => d.journey_id === journey.id)
            .map(dep => ({
              id: dep.id,
              item: dep.item,
              dependsOn: dep.depends_on,
              status: dep.status
            }));

          return {
            id: journey.id,
            name: journey.name,
            notes: journey.notes || '',
            stages: journeyStages,
            dependencies: journeyDependencies
          };
        });
    });

    return aggregated;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

/**
 * Update a single stage field
 */
export const updateStage = async (stageId, updates) => {
  if (!supabase) throw new Error('Supabase not initialized');

  const updateData = {
    ...updates,
    updated_at: new Date().toISOString()
  };

  // Convert empty strings to null for date fields
  if (updateData.eta === '') updateData.eta = null;
  if (updateData.actual === '') updateData.actual = null;

  // Remove undefined values
  Object.keys(updateData).forEach(key => 
    updateData[key] === undefined && delete updateData[key]
  );

  const { data, error } = await supabase
    .from('stages')
    .update(updateData)
    .eq('id', stageId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Update journey notes
 */
export const updateJourneyNotes = async (journeyId, notes) => {
  if (!supabase) throw new Error('Supabase not initialized');

  const { data, error } = await supabase
    .from('journeys')
    .update({ 
      notes,
      updated_at: new Date().toISOString()
    })
    .eq('id', journeyId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Update a dependency
 */
export const updateDependency = async (dependencyId, updates) => {
  if (!supabase) throw new Error('Supabase not initialized');

  const updateData = {
    ...updates,
    updated_at: new Date().toISOString()
  };

  // Map frontend field names to DB field names
  if (updateData.dependsOn) {
    updateData.depends_on = updateData.dependsOn;
    delete updateData.dependsOn;
  }

  const { data, error } = await supabase
    .from('dependencies')
    .update(updateData)
    .eq('id', dependencyId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Create a new stage
 */
export const createStage = async (journeyId, stageData) => {
  if (!supabase) throw new Error('Supabase not initialized');

  const { data, error } = await supabase
    .from('stages')
    .insert({
      journey_id: journeyId,
      name: stageData.name,
      status: stageData.status || 'not-started',
      progress: stageData.progress || 0,
      eta: stageData.eta || null,
      actual: stageData.actual || null,
      notes: stageData.notes || '',
      display_order: stageData.display_order || 0
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Delete a stage
 */
export const deleteStage = async (stageId) => {
  if (!supabase) throw new Error('Supabase not initialized');

  const { error } = await supabase
    .from('stages')
    .delete()
    .eq('id', stageId);

  if (error) throw error;
  return { success: true };
};

/**
 * Create a new journey
 */
export const createJourney = async (categoryId, journeyData) => {
  if (!supabase) throw new Error('Supabase not initialized');

  const { data, error } = await supabase
    .from('journeys')
    .insert({
      category_id: categoryId,
      name: journeyData.name,
      notes: journeyData.notes || ''
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Delete a journey (cascades to stages and dependencies)
 */
export const deleteJourney = async (journeyId) => {
  if (!supabase) throw new Error('Supabase not initialized');

  const { error } = await supabase
    .from('journeys')
    .delete()
    .eq('id', journeyId);

  if (error) throw error;
  return { success: true };
};

// Keep user preferences functions (already normalized)
export const fetchUserPreferences = async () => {
  if (!supabase) throw new Error('Supabase not initialized');

  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('selected_category, selected_journey')
      .eq('user_id', 'default')
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    return {
      selectedCategory: data?.selected_category || 'City Service',
      selectedJourney: data?.selected_journey || 'Property Sell (Sell/Buy)'
    };
  } catch (error) {
    console.error('Error fetching preferences:', error);
    throw error;
  }
};

export const saveUserPreferences = async (preferences) => {
  if (!supabase) throw new Error('Supabase not initialized');

  try {
    const { data: existing } = await supabase
      .from('user_preferences')
      .select('id')
      .eq('user_id', 'default')
      .maybeSingle();

    const prefsData = {
      selected_category: preferences.selectedCategory,
      selected_journey: preferences.selectedJourney,
      updated_at: new Date().toISOString()
    };

    if (existing) {
      const { error } = await supabase
        .from('user_preferences')
        .update(prefsData)
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('user_preferences')
        .insert({
          user_id: 'default',
          ...prefsData
        });

      if (error) throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error saving preferences:', error);
    throw error;
  }
};

