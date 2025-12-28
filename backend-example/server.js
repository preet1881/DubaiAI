/**
 * Simple Express.js Backend Server for Dubai AI Dashboard
 * 
 * This is a basic example backend. For production, add:
 * - Database integration (PostgreSQL, MongoDB, etc.)
 * - Authentication/Authorization
 * - Input validation
 * - Error handling
 * - Rate limiting
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data storage file (in production, use a database)
const DATA_FILE = path.join(__dirname, 'data.json');
const PREFERENCES_FILE = path.join(__dirname, 'preferences.json');

// Helper function to read JSON file
const readJsonFile = async (filePath, defaultValue = {}) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, return default
      return defaultValue;
    }
    throw error;
  }
};

// Helper function to write JSON file
const writeJsonFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// GET /api/dashboard - Fetch dashboard data
app.get('/api/dashboard', async (req, res) => {
  try {
    const data = await readJsonFile(DATA_FILE, {});
    
    // Return 404 if no data exists (frontend will use defaults)
    if (Object.keys(data).length === 0) {
      return res.status(404).json({});
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// PUT /api/dashboard - Save dashboard data
app.put('/api/dashboard', async (req, res) => {
  try {
    await writeJsonFile(DATA_FILE, req.body);
    res.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving dashboard data:', error);
    res.status(500).json({ error: 'Failed to save dashboard data' });
  }
});

// GET /api/preferences - Fetch user preferences
app.get('/api/preferences', async (req, res) => {
  try {
    const preferences = await readJsonFile(PREFERENCES_FILE, {
      selectedCategory: 'City Service',
      selectedJourney: 'Property Sell (Sell/Buy)'
    });
    res.json(preferences);
  } catch (error) {
    console.error('Error fetching preferences:', error);
    res.status(500).json({ error: 'Failed to fetch preferences' });
  }
});

// PUT /api/preferences - Save user preferences
app.put('/api/preferences', async (req, res) => {
  try {
    await writeJsonFile(PREFERENCES_FILE, req.body);
    res.json({ success: true, message: 'Preferences saved successfully' });
  } catch (error) {
    console.error('Error saving preferences:', error);
    res.status(500).json({ error: 'Failed to save preferences' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Dubai AI Dashboard API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Dubai AI Dashboard API server running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard endpoint: http://localhost:${PORT}/api/dashboard`);
  console.log(`⚙️  Preferences endpoint: http://localhost:${PORT}/api/preferences`);
});

