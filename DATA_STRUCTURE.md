# Data Structure in Supabase

## Tables Created

### 1. `dashboard_data` Table
Stores **ALL** dashboard data in a JSONB column. This includes:

**Structure:**
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
        },
        {
          "name": "Build",
          "status": "active",
          "progress": 50,
          "eta": "2025-01-20",
          "actual": ""
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

**What Gets Stored:**
- ✅ **Categories** (City Service, Search, Events, Booking)
- ✅ **Journeys** (Property Sell, Domestic Worker, etc.)
- ✅ **Stages** (API Integration, Build, QA, etc.)
- ✅ **Stage Progress** (0-100%)
- ✅ **Stage Status** (done, active, critical, pending)
- ✅ **ETA Dates** (Estimated completion dates)
- ✅ **Actual Dates** (Actual completion dates)
- ✅ **Dependencies** (Item, dependsOn, status)
- ✅ **Notes** (Journey notes)

### 2. `user_preferences` Table
Stores user UI preferences:

**Structure:**
- `user_id`: Text (default: 'default')
- `selected_category`: Text (e.g., "City Service")
- `selected_journey`: Text (e.g., "Property Sell (Sell/Buy)")

## How It Works

1. **On Page Load:**
   - Fetches entire dashboard data from `dashboard_data.data` (JSONB)
   - Fetches user preferences from `user_preferences`

2. **On Any Edit:**
   - Updates the entire dashboard data structure
   - Saves to `dashboard_data.data` column
   - All edits (progress, ETA, actual, dependencies, notes) are included

3. **JSONB Benefits:**
   - Stores complex nested structures
   - Supports queries on nested data
   - Efficient storage and retrieval
   - All editable fields are preserved

## Example: What Gets Saved

When you edit:
- Stage progress from 50% to 75% ✅
- ETA date from "2025-01-20" to "2025-01-15" ✅
- Actual date from "" to "2025-01-10" ✅
- Add a dependency ✅
- Change notes ✅
- Add/delete stages ✅
- Add/delete journeys ✅
- Add/delete categories ✅

**All of this is saved in the `data` JSONB column!**

## Verification

You can verify in Supabase:
1. Go to **Table Editor** → `dashboard_data`
2. Click on a row
3. View the `data` column - you'll see the entire nested structure
4. All your edits are there!

