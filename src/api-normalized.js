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
  // Only log in development to reduce console noise
  if (import.meta.env.DEV) {
    console.log('✅ Supabase client initialized');
  }
} else {
  console.error('❌ Supabase credentials not found!');
  console.error('Missing:', {
    url: !supabaseUrl ? 'VITE_SUPABASE_URL' : null,
    key: !supabaseAnonKey ? 'VITE_SUPABASE_ANON_KEY' : null
  });
}

/**
 * Fetch all dashboard data and aggregate into the same structure
 * This is called once on page load
 */
export const fetchAllDashboardData = async () => {
  if (!supabase) {
    console.error('❌ Supabase not initialized');
    throw new Error('Supabase not initialized');
  }

  try {
    console.log('🔄 Fetching data from Supabase...');
    
    // Fetch all data in parallel
    const [categoriesResult, journeysResult, stagesResult, dependenciesResult] = await Promise.all([
      supabase.from('categories').select('*').order('display_order'),
      supabase.from('journeys').select('*'),
      supabase.from('stages').select('*').order('display_order'),
      supabase.from('dependencies').select('*')
    ]);

    if (categoriesResult.error) {
      console.error('❌ Categories error:', categoriesResult.error);
      throw categoriesResult.error;
    }
    if (journeysResult.error) {
      console.error('❌ Journeys error:', journeysResult.error);
      throw journeysResult.error;
    }
    if (stagesResult.error) {
      console.error('❌ Stages error:', stagesResult.error);
      throw stagesResult.error;
    }
    if (dependenciesResult.error) {
      console.error('❌ Dependencies error:', dependenciesResult.error);
      throw dependenciesResult.error;
    }

    const categories = categoriesResult.data || [];
    const journeys = journeysResult.data || [];
    const stages = stagesResult.data || [];
    const dependencies = dependenciesResult.data || [];

    // Only log in development
    if (import.meta.env.DEV) {
      console.log(`📊 Fetched: ${categories.length} categories, ${journeys.length} journeys, ${stages.length} stages, ${dependencies.length} dependencies`);
    }

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

    // Log specific journey for debugging
    const newVisaJourney = journeys.find(j => j.name === 'New Visa');
    if (newVisaJourney) {
      console.log('🔍 New Visa journey from DB:', {
        name: newVisaJourney.name,
        notes: newVisaJourney.notes,
        id: newVisaJourney.id
      });
    }

    console.log('✅ Data aggregation complete');
    return aggregated;
  } catch (error) {
    console.error('❌ Error fetching dashboard data:', error);
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
 * Create a new dependency
 */
export const createDependency = async (journeyId, dependencyData) => {
  if (!supabase) throw new Error('Supabase not initialized');

  const { data, error } = await supabase
    .from('dependencies')
    .insert({
      journey_id: journeyId,
      item: dependencyData.item,
      depends_on: dependencyData.dependsOn || dependencyData.depends_on,
      status: dependencyData.status || 'critical'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Delete a dependency
 */
export const deleteDependency = async (dependencyId) => {
  if (!supabase) throw new Error('Supabase not initialized');

  const { error } = await supabase
    .from('dependencies')
    .delete()
    .eq('id', dependencyId);

  if (error) throw error;
  return { success: true };
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

/**
 * Create a new category
 */
export const createCategory = async (categoryName, displayOrder = 0) => {
  if (!supabase) throw new Error('Supabase not initialized');

  const { data, error } = await supabase
    .from('categories')
    .insert({
      name: categoryName,
      display_order: displayOrder
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Delete a category (cascades to journeys, stages, and dependencies)
 */
export const deleteCategory = async (categoryId) => {
  if (!supabase) throw new Error('Supabase not initialized');

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId);

  if (error) throw error;
  return { success: true };
};

/**
 * Get category by name
 */
export const getCategoryByName = async (categoryName) => {
  if (!supabase) throw new Error('Supabase not initialized');

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('name', categoryName)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

/**
 * Update a category
 */
export const updateCategory = async (categoryId, updates) => {
  if (!supabase) throw new Error('Supabase not initialized');

  const updateData = {
    ...updates,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('categories')
    .update(updateData)
    .eq('id', categoryId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Update a journey (name, notes, etc.)
 */
export const updateJourney = async (journeyId, updates) => {
  if (!supabase) throw new Error('Supabase not initialized');

  const updateData = {
    ...updates,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('journeys')
    .update(updateData)
    .eq('id', journeyId)
    .select()
    .single();

  if (error) throw error;
  return data;
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

