# Vercel Environment Variables Setup

## The Problem
Vercel deployments need environment variables to connect to Supabase. If they're not set, the dashboard will fail to load data.

## Solution: Set Environment Variables on Vercel

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/preets-projects-38540355/dubai-ai-dashboard/settings/environment-variables
2. Or navigate: Vercel Dashboard → Your Project → Settings → Environment Variables

### Step 2: Add These Variables

Click **"Add New"** and add these two variables:

#### Variable 1:
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://rkjzbzhdnkfmdntoklqw.supabase.co`
- **Environment:** Select all (Production, Preview, Development)

#### Variable 2:
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJranpiemhkbmtmbWRudG9rbHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MTIyOTgsImV4cCI6MjA4MjQ4ODI5OH0.XkknXGyHzhbmK_KlFqyVurvndPnIkyNScqmxzAvw_XI`
- **Environment:** Select all (Production, Preview, Development)

### Step 3: Redeploy
After adding the variables:
1. Go to **Deployments** tab
2. Click the **three dots** (⋯) on the latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger auto-deploy

## Verify It's Working

After redeploying, check the browser console:
- ✅ Should see: `🔄 Fetching data from Supabase...`
- ✅ Should see: `📊 Fetched: 5 categories, 19 journeys...`
- ❌ Should NOT see: `❌ Supabase not initialized`

## Quick Command (Alternative)

If you have Vercel CLI configured, you can also set them via command line:

```bash
vercel env add VITE_SUPABASE_URL production
# Paste: https://rkjzbzhdnkfmdntoklqw.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJranpiemhkbmtmbWRudG9rbHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MTIyOTgsImV4cCI6MjA4MjQ4ODI5OH0.XkknXGyHzhbmK_KlFqyVurvndPnIkyNScqmxzAvw_XI

vercel --prod
```

