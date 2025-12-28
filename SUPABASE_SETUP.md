# Supabase Backend Setup Guide

This guide will help you set up Supabase as the backend for your Dubai AI Dashboard.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Project Name**: `dubai-ai-dashboard` (or your choice)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to you
4. Click "Create new project"
5. Wait 2-3 minutes for the project to be created

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 3: Create Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Paste and run this SQL:

```sql
-- Create dashboard_data table
CREATE TABLE IF NOT EXISTS dashboard_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT DEFAULT 'default', -- Change this if you add authentication
  selected_category TEXT,
  selected_journey TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default dashboard data (optional - frontend has defaults)
INSERT INTO dashboard_data (data) 
VALUES ('{}'::jsonb)
ON CONFLICT DO NOTHING;

-- Insert default preferences
INSERT INTO user_preferences (user_id, selected_category, selected_journey)
VALUES ('default', 'City Service', 'Property Sell (Sell/Buy)')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS) - optional but recommended
ALTER TABLE dashboard_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read/write (for now)
-- In production, add proper authentication
CREATE POLICY "Allow public read" ON dashboard_data
  FOR SELECT USING (true);

CREATE POLICY "Allow public write" ON dashboard_data
  FOR INSERT, UPDATE USING (true);

CREATE POLICY "Allow public read preferences" ON user_preferences
  FOR SELECT USING (true);

CREATE POLICY "Allow public write preferences" ON user_preferences
  FOR INSERT, UPDATE USING (true);
```

4. Click "Run" to execute the SQL

## Step 4: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

## Step 5: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual Supabase URL and anon key from Step 2.

## Step 6: Update API Service

The `src/api.js` file has been updated to use Supabase. No additional changes needed!

## Step 7: Test the Integration

1. Start your frontend: `npm run dev`
2. Make some edits in the dashboard
3. Check Supabase dashboard → **Table Editor** → `dashboard_data` to see your data

## Optional: Add Authentication

If you want to add user authentication later:

1. In Supabase, go to **Authentication** → **Policies**
2. Update RLS policies to use `auth.uid()`
3. Update the API to include user authentication tokens

## Troubleshooting

### "Failed to fetch" errors
- Check your Supabase URL and key in `.env`
- Make sure RLS policies allow public access (for now)
- Check browser console for CORS errors

### Data not saving
- Verify RLS policies are set correctly
- Check Supabase logs in dashboard
- Ensure tables exist and have correct structure

### 401 Unauthorized
- Your RLS policies might be too restrictive
- Check that policies allow INSERT/UPDATE operations

## Production Considerations

1. **Add Authentication**: Don't use public access in production
2. **Row Level Security**: Set up proper RLS policies per user
3. **Backup**: Supabase automatically backs up your database
4. **Monitoring**: Use Supabase dashboard to monitor usage

