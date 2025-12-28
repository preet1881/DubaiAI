# Normalized API Reference

## Overview
The new normalized API updates only the specific field that changed, instead of the entire JSON blob.

## Fetch Operations

### `fetchAllDashboardData()`
Fetches all data and aggregates into the same structure as before.

```javascript
import { fetchAllDashboardData } from './api-normalized';

const data = await fetchAllDashboardData();
// Returns: { 'City Service': [...], 'Search': [...], etc. }
```

## Update Operations

### `updateStage(stageId, updates)`
Update a single stage field.

```javascript
import { updateStage } from './api-normalized';

// Update progress
await updateStage('stage-uuid', { progress: 50 });

// Update status
await updateStage('stage-uuid', { status: 'done' });

// Update multiple fields
await updateStage('stage-uuid', { 
  progress: 75, 
  status: 'active',
  eta: '2025-01-15',
  actual: '2025-01-14',
  notes: 'Completed early'
});
```

### `updateJourneyNotes(journeyId, notes)`
Update journey notes.

```javascript
import { updateJourneyNotes } from './api-normalized';

await updateJourneyNotes('journey-uuid', 'New notes here');
```

### `updateDependency(dependencyId, updates)`
Update a dependency.

```javascript
import { updateDependency } from './api-normalized';

await updateDependency('dep-uuid', {
  item: 'API Integration',
  dependsOn: 'Third-party API',
  status: 'blocked'
});
```

## Create Operations

### `createStage(journeyId, stageData)`
Create a new stage.

```javascript
import { createStage } from './api-normalized';

await createStage('journey-uuid', {
  name: 'New Stage',
  status: 'not-started',
  progress: 0,
  display_order: 10
});
```

### `createJourney(categoryId, journeyData)`
Create a new journey.

```javascript
import { createJourney } from './api-normalized';

await createJourney('category-uuid', {
  name: 'New Journey',
  notes: 'Journey notes'
});
```

## Delete Operations

### `deleteStage(stageId)`
Delete a stage.

```javascript
import { deleteStage } from './api-normalized';

await deleteStage('stage-uuid');
```

### `deleteJourney(journeyId)`
Delete a journey (cascades to stages and dependencies).

```javascript
import { deleteJourney } from './api-normalized';

await deleteJourney('journey-uuid');
```

## Frontend Integration Example

### Before (Current - Inefficient)
```javascript
// Updates entire dashboard on any change
const handleProgressChange = async (stageIndex, newProgress) => {
  const updatedData = { ...journeyData };
  updatedData[selectedCategory][journeyIndex].stages[stageIndex].progress = newProgress;
  setJourneyData(updatedData);
  // This saves ENTIRE dashboard (100KB+)
  await saveDashboardData(updatedData);
};
```

### After (Normalized - Efficient)
```javascript
// Updates only the changed field
const handleProgressChange = async (stageId, newProgress) => {
  // Update local state immediately
  setJourneyData(prev => {
    const updated = JSON.parse(JSON.stringify(prev));
    // Find and update the stage
    // ... update logic ...
    return updated;
  });
  
  // Save only the changed field (< 1KB)
  await updateStage(stageId, { progress: newProgress });
};
```

## Benefits

1. **Performance**: Only updates what changed
2. **Efficiency**: Small payloads instead of large JSON
3. **Scalability**: Works well as data grows
4. **Reliability**: Database constraints ensure data integrity

