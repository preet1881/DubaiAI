# Deploy to Vercel

## Quick Deploy (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign in

3. **Click "Add New Project"**

4. **Import your GitHub repository** (`DubaiAI`)

5. **Configure the project:**
   - Framework Preset: **Vite**
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)

6. **Add Environment Variables:**
   Click "Environment Variables" and add:
   - `VITE_SUPABASE_URL` = `https://rkjzbzhdnkfmdntoklqw.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJranpiemhkbmtmbWRudG9rbHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MTIyOTgsImV4cCI6MjA4MjQ4ODI5OH0.XkknXGyHzhbmK_KlFqyVurvndPnIkyNScqmxzAvw_XI`

7. **Click "Deploy"**

8. **Wait for deployment** (usually 1-2 minutes)

9. **Your dashboard will be live!** 🎉

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No**
   - Project name? `dubai-ai-dashboard` (or your choice)
   - Directory? `./` (default)
   - Override settings? **No**

5. **Add environment variables:**
   ```bash
   vercel env add VITE_SUPABASE_URL
   # Paste: https://rkjzbzhdnkfmdntoklqw.supabase.co
   
   vercel env add VITE_SUPABASE_ANON_KEY
   # Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJranpiemhkbmtmbWRudG9rbHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MTIyOTgsImV4cCI6MjA4MjQ4ODI5OH0.XkknXGyHzhbmK_KlFqyVurvndPnIkyNScqmxzAvw_XI
   ```

6. **Redeploy with environment variables:**
   ```bash
   vercel --prod
   ```

---

## Important Notes

### Environment Variables
- Make sure to add **both** environment variables in Vercel
- They must be prefixed with `VITE_` to be accessible in the frontend
- Add them for **Production**, **Preview**, and **Development** environments

### After Deployment

1. **Test your dashboard:**
   - Visit your Vercel URL
   - Make some edits
   - Refresh the page - edits should persist

2. **Check Supabase:**
   - Go to Supabase dashboard
   - Check `dashboard_data` table - your edits should be there

3. **Custom Domain (Optional):**
   - In Vercel project settings → Domains
   - Add your custom domain

---

## Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify `vercel.json` is correct

### Environment Variables Not Working
- Make sure they're prefixed with `VITE_`
- Redeploy after adding environment variables
- Check Vercel project settings → Environment Variables

### API Errors
- Verify Supabase credentials are correct
- Check Supabase RLS policies allow public access
- Check browser console for detailed errors

---

## Your Vercel URL

After deployment, you'll get a URL like:
`https://dubai-ai-dashboard.vercel.app`

Share this URL with your team! 🚀

