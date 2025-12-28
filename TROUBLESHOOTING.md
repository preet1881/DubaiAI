# Troubleshooting Local Server Issues

## Quick Checks

### 1. Is the server running?
```bash
npm run dev
```
You should see: `Local: http://localhost:5173/`

### 2. Check browser console
Open DevTools (F12) → Console tab and look for:
- ✅ `✅ Supabase client initialized` - Good!
- ❌ `❌ Supabase credentials not found!` - Check .env file
- ❌ `❌ Supabase not initialized` - Environment variables missing

### 3. Check Network tab
Open DevTools (F12) → Network tab → Filter: "Fetch/XHR"
You should see requests to:
- `categories`
- `journeys`
- `stages`
- `dependencies`
- `user_preferences`

**Should NOT see:**
- `dashboard_data` (this table was deleted)

### 4. Verify .env file
```bash
cat .env
```
Should contain:
```
VITE_SUPABASE_URL=https://rkjzbzhdnkfmdntoklqw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5. Clear browser cache
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Or use incognito/private window

### 6. Check for errors
Look in browser console for:
- Red error messages
- Failed network requests (red in Network tab)
- React errors

## Common Issues

### Issue: "Supabase not initialized"
**Solution:** Check `.env` file exists and has correct values

### Issue: "Failed to load data from cloud storage"
**Solution:** 
1. Check Supabase credentials in `.env`
2. Check browser console for specific error
3. Verify internet connection

### Issue: Page shows "Loading..." forever
**Solution:**
1. Check browser console for errors
2. Check Network tab for failed requests
3. Verify Supabase tables exist

### Issue: Old data showing
**Solution:**
1. Clear browser cache
2. Hard refresh
3. Check console for "Dashboard Version: 2.0.0"

## Still Not Working?

1. **Check terminal output** - Look for build errors
2. **Check browser console** - Look for JavaScript errors
3. **Check Network tab** - Look for failed API requests
4. **Try incognito window** - Rules out cache issues

