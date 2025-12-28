# Clear Browser Cache - Step by Step

## The Issue
Your browser has cached the **old JavaScript bundle** that still tries to access the deleted `dashboard_data` table. The new code is deployed correctly, but your browser is using the old cached version.

## Solution: Clear Browser Cache

### Method 1: Hard Refresh (Quickest)
1. Open your Vercel URL: https://dubai-ai-dashboard-4zo99k3bf-preets-projects-38540355.vercel.app
2. Press:
   - **Windows/Linux:** `Ctrl + Shift + R` or `Ctrl + F5`
   - **Mac:** `Cmd + Shift + R`
3. This forces a fresh reload

### Method 2: Clear Site Data (Most Reliable)
1. Open DevTools: Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Clear site data** or **Clear storage**
4. Check all boxes:
   - ✅ Cache storage
   - ✅ Local storage
   - ✅ Session storage
   - ✅ IndexedDB
5. Click **Clear site data**
6. Close DevTools and refresh the page

### Method 3: Incognito/Private Window (Easiest)
1. Open a new **Incognito** (Chrome) or **Private** (Firefox/Safari) window
2. Navigate to: https://dubai-ai-dashboard-4zo99k3bf-preets-projects-38540355.vercel.app
3. This bypasses all cache

### Method 4: Clear All Browser Cache
**Chrome:**
1. Settings → Privacy and security → Clear browsing data
2. Select "Cached images and files"
3. Click "Clear data"

**Firefox:**
1. Settings → Privacy & Security → Cookies and Site Data
2. Click "Clear Data"
3. Check "Cached Web Content"

**Safari:**
1. Develop menu → Empty Caches
2. (If Develop menu not visible: Preferences → Advanced → Show Develop menu)

## Verify It's Working

After clearing cache, check the **Network tab** in DevTools:

✅ **Should see:**
- `categories` table request
- `journeys` table request
- `stages` table request
- `dependencies` table request
- `user_preferences` table request

❌ **Should NOT see:**
- `dashboard_data` table request (404 error)

## Console Logs

After clearing cache, you should see in the console:
- `🔄 Fetching data from Supabase...`
- `📊 Fetched: 5 categories, 19 journeys...`
- `✅ Loaded data from database:`

If you still see `dashboard_data` errors, the cache hasn't cleared yet. Try Method 2 or 3.

