# 🚀 Exact Steps to Hand Over the Chatbot

## Step 1: Deploy Your Server (Do This First)

### Option A: Deploy to Vercel (Easiest)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to Vercel.com and sign up/login**

3. **Import your GitHub repository:**
   - Click "New Project"
   - Select your repository
   - Click "Import"

4. **Set Environment Variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add these (from your `.env` file):
     ```
     OPENAI_API_KEY=your_key_here
     SUPABASE_URL=your_url_here
     SUPABASE_SERVICE_ROLE_KEY=your_key_here
     KNOWLEDGE_WITH_EMBEDDINGS=1
     ALLOWED_ORIGINS=https://client-website.com,https://www.client-website.com
     WEBSITE_URL=https://www.cccp.com
     PORT=3000
     ```

5. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to finish
   - **Copy your deployment URL:** `https://your-project.vercel.app`

### Option B: Deploy to Your Own Server

1. **Set up server** (AWS, DigitalOcean, Heroku, etc.)
2. **SSH into server**
3. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
4. **Clone your repo:**
   ```bash
   git clone YOUR_REPO_URL
   cd widget
   ```
5. **Install dependencies:**
   ```bash
   npm install
   ```
6. **Set environment variables:**
   ```bash
   nano .env
   # Paste your .env content
   ```
7. **Start server (use PM2 for production):**
   ```bash
   npm install -g pm2
   pm2 start api/server.js --name chatbot
   pm2 save
   pm2 startup
   ```
8. **Set up reverse proxy (nginx) if needed**
9. **Get your server URL:** `https://your-domain.com`

---

## Step 2: Configure CORS for Client's Website

**In your `.env` file (or Vercel environment variables), add the client's domain:**

```bash
ALLOWED_ORIGINS=https://client-website.com,https://www.client-website.com,https://client-website.netlify.app
```

**Important:** 
- Add ALL variations of their domain (with/without www, different subdomains)
- If they have multiple domains, add them all
- Restart server after changing (or redeploy on Vercel)

---

## Step 3: Create the Embed Code for Client

**Replace `YOUR-SERVER-URL` with your actual deployed server URL:**

```html
<script 
  defer 
  src="YOUR-SERVER-URL/widget/widget.js" 
  data-api-url="YOUR-SERVER-URL"
  data-privacy-url="https://www.cccp.com/privacy-policy">
</script>
```

**Example (if deployed to Vercel):**
```html
<script 
  defer 
  src="https://your-chatbot.vercel.app/widget/widget.js" 
  data-api-url="https://your-chatbot.vercel.app"
  data-privacy-url="https://www.cccp.com/privacy-policy">
</script>
```

---

## Step 4: Test It Yourself First

1. **Create a test HTML file:**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <title>Test Chatbot</title>
   </head>
   <body>
     <h1>Test Page</h1>
     <script 
       defer 
       src="YOUR-SERVER-URL/widget/widget.js" 
       data-api-url="YOUR-SERVER-URL">
     </script>
   </body>
   </html>
   ```

2. **Open it in a browser**
3. **Test the chat:**
   - Click the chat button
   - Send a message: "Hello"
   - Verify it responds
   - Test: "Where are you located?"
   - Test: "What are your hours?"

4. **If it works, you're ready!**

---

## Step 5: Give Client These Files

### File 1: `CLIENT_INSTRUCTIONS.md`
**Give them this file** - it has all the installation steps

### File 2: The Embed Code
**Send them this exact code (with YOUR server URL filled in):**

```html
<!-- Add this before </body> tag on every page -->
<script 
  defer 
  src="YOUR-SERVER-URL/widget/widget.js" 
  data-api-url="YOUR-SERVER-URL"
  data-privacy-url="https://www.cccp.com/privacy-policy">
</script>
```

### File 3: Optional Customization
**If they want to customize:**

```html
<script 
  defer 
  src="YOUR-SERVER-URL/widget/widget.js" 
  data-api-url="YOUR-SERVER-URL"
  data-button-text="Support"
  data-header-text="How can we help?"
  data-privacy-url="https://www.cccp.com/privacy-policy">
</script>
```

**Options:**
- `data-button-text` - Change "Chat" button text
- `data-header-text` - Change header text in chat window
- `data-privacy-url` - Link to their privacy policy page

---

## Step 6: Client Installation (What They Do)

### For WordPress:
1. Go to **Appearance → Theme Editor**
2. Edit `footer.php`
3. Add the script tag **before** `</body>`
4. Save

### For Shopify:
1. Go to **Online Store → Themes → Actions → Edit Code**
2. Open `theme.liquid`
3. Add the script tag **before** `</body>`
4. Save

### For Squarespace:
1. Go to **Settings → Advanced → Code Injection**
2. Add the script tag to **Footer**
3. Save

### For HTML Website:
1. Open your HTML file
2. Add the script tag **before** `</body>`
3. Save and upload

---

## Step 7: Verify It Works

**After client installs, check:**

1. ✅ Chat button appears on their website
2. ✅ Chat opens when clicked
3. ✅ Messages send and receive responses
4. ✅ No console errors (F12 → Console tab)
5. ✅ Works on mobile

**If there are issues:**
- Check browser console for errors
- Verify CORS is set correctly
- Make sure server URL is correct
- Check that server is running

---

## Step 8: Support Information

**Give client your contact info for:**
- Questions about installation
- Troubleshooting
- Customization requests
- Updates/maintenance

---

## Quick Checklist

Before handing over:

- [ ] Server is deployed and accessible
- [ ] Environment variables are set
- [ ] CORS is configured for client's domain
- [ ] Tested the embed code yourself
- [ ] Created embed code with correct server URL
- [ ] Gave client `CLIENT_INSTRUCTIONS.md`
- [ ] Gave client the embed code
- [ ] Provided your contact info

---

## What Client Needs to Do

1. ✅ Add one script tag to their website
2. ✅ That's it! Chatbot works immediately

---

## Summary

**You do:**
1. Deploy server (Vercel/your server)
2. Set CORS for client's domain
3. Give client the embed code

**Client does:**
1. Adds script tag to their website
2. Done!

**Total time:** 10-15 minutes for you, 2 minutes for client.

---

## Need Help?

If client has issues:
1. Check browser console (F12)
2. Verify server URL is correct
3. Check CORS settings
4. Verify server is running

**That's it! The chatbot is ready to hand over! 🎉**
