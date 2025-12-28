# API Documentation

This document describes the API endpoints required for the Dubai AI Dashboard cloud storage functionality.

## Base URL

The API base URL is configured via the `VITE_API_BASE_URL` environment variable. Default: `http://localhost:3001/api`

## Endpoints

### 1. Get Dashboard Data

**GET** `/dashboard`

Fetches all dashboard data including categories, journeys, stages, dependencies, and notes.

**Response:**
```json
{
  "City Service": [
    {
      "name": "Property Sell (Sell/Buy)",
      "stages": [
        {
          "name": "API Integration",
          "status": "done",
          "progress": 100,
          "eta": "2024-01-30",
          "actual": "2024-01-28"
        }
      ],
      "notes": "Alignment Call to be setup on 10th Dec",
      "dependencies": [
        {
          "item": "Security LLD Review",
          "dependsOn": "UnifyApps",
          "status": "pending"
        }
      ]
    }
  ],
  "Search": [...],
  "Events": [...],
  "Booking": [...]
}
```

**Error Response (404):**
If no data exists, return an empty object `{}` or 404. The frontend will use default data.

---

### 2. Save Dashboard Data

**PUT** `/dashboard`

Saves all dashboard data to cloud storage.

**Request Body:**
```json
{
  "City Service": [...],
  "Search": [...],
  "Events": [...],
  "Booking": [...]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Data saved successfully"
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid data)
- `500` - Server Error

---

### 3. Get User Preferences

**GET** `/preferences`

Fetches user preferences (selected category and journey).

**Response:**
```json
{
  "selectedCategory": "City Service",
  "selectedJourney": "Property Sell (Sell/Buy)"
}
```

**Error Response (404):**
If no preferences exist, return an empty object `{}` or 404. The frontend will use defaults.

---

### 4. Save User Preferences

**PUT** `/preferences`

Saves user preferences to cloud storage.

**Request Body:**
```json
{
  "selectedCategory": "City Service",
  "selectedJourney": "Property Sell (Sell/Buy)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Preferences saved successfully"
}
```

---

## Example Backend Implementation

### Node.js/Express Example

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
let dashboardData = {};
let userPreferences = {
  selectedCategory: 'City Service',
  selectedJourney: 'Property Sell (Sell/Buy)'
};

// Get dashboard data
app.get('/api/dashboard', (req, res) => {
  if (Object.keys(dashboardData).length === 0) {
    return res.status(404).json({});
  }
  res.json(dashboardData);
});

// Save dashboard data
app.put('/api/dashboard', (req, res) => {
  dashboardData = req.body;
  res.json({ success: true, message: 'Data saved successfully' });
});

// Get user preferences
app.get('/api/preferences', (req, res) => {
  res.json(userPreferences);
});

// Save user preferences
app.put('/api/preferences', (req, res) => {
  userPreferences = req.body;
  res.json({ success: true, message: 'Preferences saved successfully' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
```

### Python/Flask Example

```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory storage (replace with database in production)
dashboard_data = {}
user_preferences = {
    "selectedCategory": "City Service",
    "selectedJourney": "Property Sell (Sell/Buy)"
}

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard():
    if not dashboard_data:
        return jsonify({}), 404
    return jsonify(dashboard_data)

@app.route('/api/dashboard', methods=['PUT'])
def save_dashboard():
    global dashboard_data
    dashboard_data = request.json
    return jsonify({"success": True, "message": "Data saved successfully"})

@app.route('/api/preferences', methods=['GET'])
def get_preferences():
    return jsonify(user_preferences)

@app.route('/api/preferences', methods=['PUT'])
def save_preferences():
    global user_preferences
    user_preferences = request.json
    return jsonify({"success": True, "message": "Preferences saved successfully"})

if __name__ == '__main__':
    app.run(port=3001)
```

---

## Notes

1. **CORS**: Make sure your backend allows CORS requests from your frontend domain.

2. **Authentication**: For production, add authentication/authorization as needed.

3. **Database**: Replace in-memory storage with a proper database (PostgreSQL, MongoDB, etc.).

4. **Error Handling**: The frontend handles API errors gracefully and falls back to default data if needed.

5. **Debouncing**: The frontend debounces save requests (500ms delay) to avoid excessive API calls.

6. **Data Validation**: Implement server-side validation to ensure data integrity.

