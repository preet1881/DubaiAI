// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

/**
 * API Service for Dubai AI Dashboard
 * Handles all cloud storage operations
 */

// Helper function for API calls
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
 * Fetch dashboard data from cloud storage
 */
export const fetchDashboardData = async () => {
  return await apiCall('/dashboard');
};

/**
 * Save dashboard data to cloud storage
 */
export const saveDashboardData = async (data) => {
  return await apiCall('/dashboard', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * Fetch selected category and journey from cloud storage
 */
export const fetchUserPreferences = async () => {
  return await apiCall('/preferences');
};

/**
 * Save selected category and journey to cloud storage
 */
export const saveUserPreferences = async (preferences) => {
  return await apiCall('/preferences', {
    method: 'PUT',
    body: JSON.stringify(preferences),
  });
};

