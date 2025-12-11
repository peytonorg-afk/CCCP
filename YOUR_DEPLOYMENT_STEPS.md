# Your Side: Deploy the Chatbot Server

## Quick Steps (5-10 minutes)

### Step 1: Push Code to GitHub

```bash
# If you haven't initialized git yet
cd /Users/peytonswipes/Downloads/widget
git init
git add .
git commit -m "Chatbot ready for deployment"

# Create a new repo on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

**Or if you already have a repo:**
```bash
git add .
git commit -m "Ready to deploy"
git push
```

---

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
   - Sign up (free) or login
   - Use GitHub to sign in (easiest)

2. **Import Your Project:**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Select your GitHub repo
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Other (or leave default)
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** (leave empty - not needed)
   - **Output Directory:** (leave empty - not needed)
   - **Install Command:** `npm install` (should auto-detect)

4. **Add Environment Variables:**
   
   Click "Environment Variables" and add these one by one:
   
   | Variable Name | Value | Where to Find |
   |--------------|-------|---------------|
   | `OPENAI_API_KEY` | `sk-...` | Your `.env` file |
   | `SUPABASE_URL` | `https://xxx.supabase.co` | Your `.env` file |
   | `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Your `.env` file |
   | `KNOWLEDGE_WITH_EMBEDDINGS` | `1` | Set to `1` |
   | `ALLOWED_ORIGINS` | `https://your-website.com,https://www.your-website.com` | Your website domains |
   | `WEBSITE_URL` | `https://www.cccp.com` | Your website URL |
   | `PORT` | `3000` | Optional (defaults to 3000) |

   **How to add:**
   - Click "Add" next to each variable
   - Enter the name
   - Enter the value
   - Click "Save"
   - Repeat for each variable

5. **Deploy:**
   - Click "Deploy" button
   - Wait 1-2 minutes
   - **Copy your deployment URL:** `https://your-project-name.vercel.app`

---

### Step 3: Test Your Deployment

1. **Visit your Vercel URL:**
   ```
   https://your-project-name.vercel.app
   ```

2. **You should see your `index.html` page with the chatbot**

3. **Test the widget:**
   - Click the chat button
   - Send a message: "Hello"
   - Verify it responds

4. **Test the API directly:**
   ```
   https://your-project-name.vercel.app/api/chat
   ```
   (Should return an error if you POST without data, but that's normal)

---

### Step 4: Configure CORS for Client Websites

**Important:** Add the client's website domain to allowed origins!

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Environment Variables"
   - Find `ALLOWED_ORIGINS`
   - Edit it to include client's domain:
     ```
     https://client-website.com,https://www.client-website.com,https://your-website.com
     ```
   - Save

2. **Redeploy (if needed):**
   - Changes to environment variables require a new deployment
   - Go to "Deployments" tab
   - Click "..." on latest deployment → "Redeploy"

---

### Step 5: Get Your Embed Code

**Your server URL is:** `https://your-project-name.vercel.app`

**Give this embed code to clients:**

```html
<script 
  defer 
  src="https://your-project-name.vercel.app/widget/widget.js" 
  data-api-url="https://your-project-name.vercel.app"
  data-privacy-url="https://www.cccp.com/privacy-policy">
</script>
```

**Replace `your-project-name.vercel.app` with your actual Vercel URL.**

---

## Detailed Step-by-Step (With Screenshots Guide)

### Step 1: Prepare Your Code

**Check your `.env` file has everything:**
```bash
cd /Users/peytonswipes/Downloads/widget
cat .env
```

**You should see:**
- `OPENAI_API_KEY=...`
- `SUPABASE_URL=...`
- `SUPABASE_SERVICE_ROLE_KEY=...`
- `KNOWLEDGE_WITH_EMBEDDINGS=1`
- `ALLOWED_ORIGINS=...`
- `WEBSITE_URL=...`

**If anything is missing, add it to `.env` first!**

---

### Step 2: Create GitHub Repository

1. **Go to [github.com](https://github.com)**
2. **Click "+" → "New repository"**
3. **Name it:** `chatbot-widget` (or whatever you want)
4. **Make it Private** (recommended - has API keys)
5. **Don't initialize with README** (you already have code)
6. **Click "Create repository"**

---

### Step 3: Push Code to GitHub

**In your terminal:**

```bash
cd /Users/peytonswipes/Downloads/widget

# Initialize git (if not already done)
git init

# Add all files (except .env - that's in .gitignore)
git add .

# Commit
git commit -m "Chatbot ready for deployment"

# Add remote (replace with YOUR repo URL from GitHub)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push
git branch -M main
git push -u origin main
```

**Note:** `.env` should NOT be committed (it's in `.gitignore`). That's why we add env vars in Vercel.

---

### Step 4: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** (use GitHub - easiest)
3. **Click "Add New..." → "Project"**
4. **Click "Import Git Repository"**
5. **Select your repository** from the list
6. **Click "Import"**

**Configure:**
- Framework: **Other** (or leave default)
- Root Directory: `./` (default)
- Build Command: (leave empty)
- Output Directory: (leave empty)

**Environment Variables:**
Click "Environment Variables" and add:

1. **OPENAI_API_KEY**
   - Value: Copy from your `.env` file
   - Click "Add"

2. **SUPABASE_URL**
   - Value: Copy from your `.env` file
   - Click "Add"

3. **SUPABASE_SERVICE_ROLE_KEY**
   - Value: Copy from your `.env` file
   - Click "Add"

4. **KNOWLEDGE_WITH_EMBEDDINGS**
   - Value: `1`
   - Click "Add"

5. **ALLOWED_ORIGINS**
   - Value: `https://your-website.com,https://www.your-website.com`
   - Add all domains that will use the chatbot
   - Click "Add"

6. **WEBSITE_URL**
   - Value: `https://www.cccp.com` (or your website)
   - Click "Add"

7. **PORT** (optional)
   - Value: `3000`
   - Click "Add"

**Deploy:**
- Click "Deploy" button
- Wait 1-2 minutes
- **Copy your URL:** `https://your-project-name.vercel.app`

---

### Step 5: Verify Deployment

1. **Visit your Vercel URL:**
   ```
   https://your-project-name.vercel.app
   ```

2. **You should see:**
   - Your `index.html` page
   - Chat button in bottom right

3. **Test the chat:**
   - Click chat button
   - Send: "Hello"
   - Should get a response

4. **Check logs (if issues):**
   - Vercel Dashboard → Your Project → Deployments
   - Click on latest deployment
   - Click "View Function Logs"
   - Check for errors

---

### Step 6: Update CORS for Clients

**When a client wants to use it:**

1. **Get their website URL:** `https://client-website.com`

2. **In Vercel:**
   - Settings → Environment Variables
   - Find `ALLOWED_ORIGINS`
   - Edit to add their domain:
     ```
     https://your-website.com,https://www.your-website.com,https://client-website.com,https://www.client-website.com
     ```
   - Save

3. **Redeploy:**
   - Deployments → Latest → "..." → "Redeploy"
   - Or just push a new commit (auto-redeploys)

---

## Quick Reference

**Your Server URL:**
```
https://your-project-name.vercel.app
```

**Embed Code for Clients:**
```html
<script 
  defer 
  src="https://your-project-name.vercel.app/widget/widget.js" 
  data-api-url="https://your-project-name.vercel.app"
  data-privacy-url="https://www.cccp.com/privacy-policy">
</script>
```

**Environment Variables Needed:**
- `OPENAI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `KNOWLEDGE_WITH_EMBEDDINGS=1`
- `ALLOWED_ORIGINS` (comma-separated domains)
- `WEBSITE_URL`

---

## Troubleshooting

### "Build failed"
- Check environment variables are all set
- Check Vercel logs for specific error
- Make sure `vercel.json` exists (it does ✅)

### "Function timeout"
- Vercel has 10s timeout on free tier
- Your API calls should be fast enough
- Check OpenAI API is responding

### "CORS error" when client embeds
- Add client's domain to `ALLOWED_ORIGINS`
- Redeploy after changing
- Wait a few minutes for changes to propagate

### Chat doesn't respond
- Check Vercel function logs
- Verify `OPENAI_API_KEY` is set correctly
- Check `SUPABASE_URL` and keys are correct

---

## Summary

**What you do:**
1. ✅ Push code to GitHub
2. ✅ Deploy to Vercel
3. ✅ Add environment variables
4. ✅ Get your server URL
5. ✅ Give embed code to clients
6. ✅ Update CORS when needed

**Total time:** 10-15 minutes

**That's it! Your server is deployed and ready! 🚀**
