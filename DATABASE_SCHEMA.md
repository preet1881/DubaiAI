# Normalized Database Schema Design

## Overview
Instead of storing everything in a single JSONB blob, we'll use normalized tables for efficient updates.

## Database Tables

### 1. `categories`
Stores journey categories (City Service, Search, Events, Booking)

```sql
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL, -- 'City Service', 'Search', 'Events', 'Booking'
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. `journeys`
Stores individual journeys (Property Sell, Domestic Worker, etc.)

```sql
CREATE TABLE journeys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(category_id, name)
);
```

### 3. `stages`
Stores individual stages for each journey

```sql
CREATE TABLE stages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  journey_id UUID REFERENCES journeys(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not-started', -- 'done', 'active', 'critical', 'not-started'
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  eta DATE,
  actual DATE,
  notes TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(journey_id, name)
);
```

### 4. `dependencies`
Stores dependencies for journeys

```sql
CREATE TABLE dependencies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  journey_id UUID REFERENCES journeys(id) ON DELETE CASCADE,
  item TEXT NOT NULL,
  depends_on TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'blocked', 'in-progress'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. `user_preferences` (already exists)
No changes needed - already normalized

## Benefits

1. **Efficient Updates**: Only update the specific field that changed
   - Update stage progress: `UPDATE stages SET progress = 50 WHERE id = 'xxx'`
   - Update journey notes: `UPDATE journeys SET notes = '...' WHERE id = 'xxx'`
   - Update stage status: `UPDATE stages SET status = 'done' WHERE id = 'xxx'`

2. **Better Performance**: 
   - No need to fetch/update entire JSON blob
   - Smaller payloads
   - Faster queries

3. **Scalability**: 
   - Easy to add indexes
   - Better query optimization
   - Can add relationships later

4. **Data Integrity**: 
   - Foreign key constraints
   - Unique constraints
   - Data validation at DB level

## API Design

### Fetch Operations (Aggregation on Frontend)

```javascript
// Fetch all data (aggregated on frontend)
fetchAllDashboardData() {
  // Fetch in parallel:
  // - categories
  // - journeys (with category_id)
  // - stages (with journey_id)
  // - dependencies (with journey_id)
  // Then aggregate into the same structure as before
}
```

### Update Operations (Granular)

```javascript
// Update single stage
updateStage(stageId, { progress, status, eta, actual, notes })

// Update journey notes
updateJourneyNotes(journeyId, notes)

// Update dependency
updateDependency(dependencyId, { item, dependsOn, status })

// Add new stage
createStage(journeyId, stageData)

// Delete stage
deleteStage(stageId)
```

## Migration Strategy

1. Create new normalized tables
2. Migrate existing JSONB data to normalized tables
3. Update frontend API calls
4. Keep old table for rollback (optional)

