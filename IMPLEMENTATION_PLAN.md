# Normalized Database Implementation Plan

## Overview
Migrate from JSONB blob storage to normalized relational tables for better performance and efficiency.

## Benefits Comparison

### Current Approach (JSONB Blob)
- ❌ Updates entire JSON on every change (even changing one field)
- ❌ Large payloads (entire dashboard data)
- ❌ No database-level constraints
- ❌ Hard to query specific fields
- ❌ Slower as data grows

### New Approach (Normalized Tables)
- ✅ Updates only the specific field that changed
- ✅ Small payloads (just the changed field)
- ✅ Database constraints and validation
- ✅ Easy to query and filter
- ✅ Scales better with data growth

## Implementation Steps

### Phase 1: Database Setup
1. ✅ Create normalized schema (see `migrations/001_create_normalized_schema.sql`)
2. ⏳ Run migration SQL in Supabase
3. ⏳ Migrate existing data (run `migrations/migrate-data.js`)

### Phase 2: API Update
1. ✅ Create new normalized API (`src/api-normalized.js`)
2. ⏳ Update dashboard to use new API functions
3. ⏳ Replace bulk save with granular updates

### Phase 3: Frontend Updates
1. ⏳ Update `DubaiAIDashboard.jsx` to:
   - Use `fetchAllDashboardData()` on load
   - Use `updateStage()` when stage changes
   - Use `updateJourneyNotes()` when notes change
   - Use `updateDependency()` when dependency changes
2. ⏳ Remove debounced bulk save
3. ⏳ Add individual save calls per field

### Phase 4: Testing & Deployment
1. ⏳ Test all update operations
2. ⏳ Verify data integrity
3. ⏳ Deploy to Vercel

## API Usage Examples

### Before (Current)
```javascript
// Updates ENTIRE dashboard on any change
await saveDashboardData(entireJourneyData); // 100KB+ payload
```

### After (Normalized)
```javascript
// Update only the changed field
await updateStage(stageId, { progress: 50 }); // < 1KB payload
await updateJourneyNotes(journeyId, 'New notes'); // < 1KB payload
await updateDependency(depId, { status: 'blocked' }); // < 1KB payload
```

## Migration Checklist

- [ ] Run `001_create_normalized_schema.sql` in Supabase SQL Editor
- [ ] Run `migrations/migrate-data.js` to migrate existing data
- [ ] Verify data migrated correctly
- [ ] Update `src/DubaiAIDashboard.jsx` to use new API
- [ ] Test all CRUD operations
- [ ] Deploy to production
- [ ] (Optional) Keep old `dashboard_data` table for rollback

## Rollback Plan

If issues occur:
1. Keep `dashboard_data` table intact
2. Switch back to `src/api.js` (old API)
3. Revert frontend changes

## Next Steps

1. Review the schema design
2. Run the migration SQL
3. Migrate existing data
4. Update frontend code
5. Test thoroughly

