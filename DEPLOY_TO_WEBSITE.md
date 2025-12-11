# How to Deploy Chatbot on a Website

## Two Steps:
1. **Deploy the server** (backend) - Makes chatbot accessible
2. **Embed on website** (frontend) - Adds chat button to your site

---

## Step 1: Deploy Server to Vercel (Easiest - 5 minutes)

### Option A: Deploy via Vercel Dashboard

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Chatbot ready for deployment"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com) and sign up/login**

3. **Import your project:**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Select your GitHub repo
   - Click "Import"

4. **Configure project:**
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)

5. **Add Environment Variables:**
   Click "Environment Variables" and add these (from your `.env` file):
   
   ```
   OPENAI_API_KEY=your_openai_key_here
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_key_here
   KNOWLEDGE_WITH_EMBEDDINGS=1
   ALLOWED_ORIGINS=https://your-website.com,https://www.your-website.com
   WEBSITE_URL=https://www.cccp.com
   PORT=3000
   ```

6. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes
   - **Copy your deployment URL:** `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow prompts
   - It will ask for environment variables - add them one by one
   - Or set them later in Vercel dashboard

4. **Set environment variables:**
   ```bash
   vercel env add OPENAI_API_KEY
   vercel env add SUPABASE_URL
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   vercel env add KNOWLEDGE_WITH_EMBEDDINGS
   vercel env add ALLOWED_ORIGINS
   vercel env add WEBSITE_URL
   ```

5. **Redeploy:**
   ```bash
   vercel --prod
   ```

---

## Step 2: Embed on Your Website

### Get Your Embed Code

Once deployed, you'll have a URL like: `https://your-project.vercel.app`

**Use this embed code on your website:**

```html
<script 
  defer 
  src="https://your-project.vercel.app/widget/widget.js" 
  data-api-url="https://your-project.vercel.app"
  data-privacy-url="https://www.cccp.com/privacy-policy">
</script>
```

### Where to Add It

#### WordPress:
1. Go to **Appearance → Theme Editor**
2. Edit `footer.php`
3. Add the script tag **before** `</body>`
4. Save

#### Shopify:
1. Go to **Online Store → Themes → Actions → Edit Code**
2. Open `theme.liquid`
3. Add the script tag **before** `</body>`
4. Save

#### Squarespace:
1. Go to **Settings → Advanced → Code Injection**
2. Add the script tag to **Footer**
3. Save

#### HTML Website:
1. Open your HTML file
2. Add the script tag **before** `</body>`
3. Save and upload

#### Example HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome</h1>
  <p>Your content here...</p>
  
  <!-- Chatbot Widget - Add before </body> -->
  <script 
    defer 
    src="https://your-project.vercel.app/widget/widget.js" 
    data-api-url="https://your-project.vercel.app"
    data-privacy-url="https://www.cccp.com/privacy-policy">
  </script>
</body>
</html>
```

---

## Step 3: Configure CORS

**Important:** Make sure your website domain is allowed!

In Vercel dashboard → Environment Variables, set:

```
ALLOWED_ORIGINS=https://your-website.com,https://www.your-website.com,https://your-website.netlify.app
```

**Add ALL variations:**
- With `https://`
- With `www.` and without
- Any subdomains
- Development URLs (for testing)

**Or allow all (testing only):**
```
ALLOWED_ORIGINS=*
```

After changing, **redeploy** or wait a few minutes for changes to take effect.

---

## Step 4: Test It

1. **Visit your website**
2. **Look for chat button** in bottom right corner
3. **Click it** - chat window should open
4. **Send a test message:** "Hello"
5. **Verify it responds**

**If it doesn't work:**
- Check browser console (F12 → Console) for errors
- Verify server URL is correct
- Check CORS settings
- Make sure server is deployed and running

---

## Alternative: Deploy to Your Own Server

### Using PM2 (Production)

1. **SSH into your server**

2. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone your repo:**
   ```bash
   git clone YOUR_REPO_URL
   cd widget
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Create `.env` file:**
   ```bash
   nano .env
   ```
   Paste your environment variables

6. **Install PM2:**
   ```bash
   npm install -g pm2
   ```

7. **Start server:**
   ```bash
   pm2 start api/server.js --name chatbot
   pm2 save
   pm2 startup
   ```

8. **Set up reverse proxy (nginx):**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

9. **Get SSL certificate:**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

---

## Quick Checklist

Before deploying:
- [ ] Code is pushed to GitHub
- [ ] `.env` file has all required variables
- [ ] `vercel.json` exists (already done ✅)
- [ ] Tested locally (`npm run dev`)

After deploying:
- [ ] Server URL works (visit it in browser)
- [ ] Environment variables are set in Vercel
- [ ] CORS is configured for your website
- [ ] Embed code is added to your website
- [ ] Tested on your website

---

## Troubleshooting

### "CORS error" in browser
- Add your domain to `ALLOWED_ORIGINS` in Vercel
- Redeploy after changing

### Chat button doesn't appear
- Check browser console (F12) for errors
- Verify script URL is correct
- Make sure server is deployed

### "Cannot connect" errors
- Verify server URL is correct
- Check that server is running
- Check environment variables are set

### Widget loads but chat doesn't work
- Check `OPENAI_API_KEY` is set
- Check `SUPABASE_URL` and keys are set
- Check server logs in Vercel dashboard

---

## Summary

**Deploy Server:**
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy
5. Copy URL

**Embed on Website:**
1. Add script tag before `</body>`
2. Replace URL with your Vercel URL
3. Save
4. Done!

**Total time:** ~10 minutes

---

## Need Help?

- Check Vercel logs: Dashboard → Your Project → Deployments → View Function Logs
- Check browser console: F12 → Console tab
- Verify all environment variables are set
- Make sure CORS allows your domain

**That's it! Your chatbot is now live on your website! 🎉**
