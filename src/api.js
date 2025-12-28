// Supabase Configuration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase client
let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase credentials not found. Using REST API fallback.');
}

/**
 * API Service for Dubai AI Dashboard
 * Uses Supabase for cloud storage operations
 * Falls back to REST API if Supabase is not configured
 */

// Fallback REST API configuration (for backward compatibility)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};

/**
 * Fetch dashboard data from Supabase
 */
export const fetchDashboardData = async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('dashboard_data')
        .select('data')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        // If no data exists, return empty object (frontend will use defaults)
        if (error.code === 'PGRST116') {
          return {};
        }
        throw error;
      }

      return data?.data || {};
    } catch (error) {
      console.error('Supabase fetch error:', error);
      throw error;
    }
  } else {
    // Fallback to REST API
    return await apiCall('/dashboard');
  }
};

/**
 * Save dashboard data to Supabase
 */
export const saveDashboardData = async (data) => {
  if (supabase) {
    try {
      // Check if record exists (handle case where no records exist)
      const { data: existing, error: fetchError } = await supabase
        .from('dashboard_data')
        .select('id')
        .limit(1)
        .maybeSingle();

      // If error is not "no rows" error, throw it
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existing && existing.id) {
        // Update existing record
        const { error } = await supabase
          .from('dashboard_data')
          .update({ 
            data: data,
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Insert new record
        const { error } = await supabase
          .from('dashboard_data')
          .insert({ data: data });

        if (error) throw error;
      }

      return { success: true, message: 'Data saved successfully' };
    } catch (error) {
      console.error('Supabase save error:', error);
      throw error;
    }
  } else {
    // Fallback to REST API
    return await apiCall('/dashboard', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
};

/**
 * Fetch user preferences from Supabase
 */
export const fetchUserPreferences = async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('selected_category, selected_journey')
        .eq('user_id', 'default')
        .single();

      if (error) {
        // If no preferences exist, return defaults
        if (error.code === 'PGRST116') {
          return {
            selectedCategory: 'City Service',
            selectedJourney: 'Property Sell (Sell/Buy)'
          };
        }
        throw error;
      }

      return {
        selectedCategory: data?.selected_category || 'City Service',
        selectedJourney: data?.selected_journey || 'Property Sell (Sell/Buy)'
      };
    } catch (error) {
      console.error('Supabase preferences fetch error:', error);
      throw error;
    }
  } else {
    // Fallback to REST API
    return await apiCall('/preferences');
  }
};

/**
 * Save user preferences to Supabase
 */
export const saveUserPreferences = async (preferences) => {
  if (supabase) {
    try {
      // Check if record exists
      const { data: existing } = await supabase
        .from('user_preferences')
        .select('id')
        .eq('user_id', 'default')
        .single();

      const prefsData = {
        selected_category: preferences.selectedCategory,
        selected_journey: preferences.selectedJourney,
        updated_at: new Date().toISOString()
      };

      if (existing) {
        // Update existing record
        const { error } = await supabase
          .from('user_preferences')
          .update(prefsData)
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Insert new record
        const { error } = await supabase
          .from('user_preferences')
          .insert({
            user_id: 'default',
            ...prefsData
          });

        if (error) throw error;
      }

      return { success: true, message: 'Preferences saved successfully' };
    } catch (error) {
      console.error('Supabase preferences save error:', error);
      throw error;
    }
  } else {
    // Fallback to REST API
    return await apiCall('/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  }
};

