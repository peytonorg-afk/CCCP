# CORS Setup - Complete Guide

## Copy This EXACT Value for ALLOWED_ORIGINS

**Paste this into Vercel Environment Variables:**

```
http://localhost:8080,http://localhost:3000,http://localhost:3001,https://cameracorner.vercel.app,https://www.cccp.com,https://cccp.com
```

## Step-by-Step Instructions

### 1. Go to Vercel Dashboard
- Visit: https://vercel.com/dashboard
- Click your project: **cameracorner**

### 2. Add/Update Environment Variable
- Go to: **Settings** → **Environment Variables**
- Find or create: `ALLOWED_ORIGINS`
- **Paste this value:**
  ```
  http://localhost:8080,http://localhost:3000,http://localhost:3001,https://cameracorner.vercel.app,https://www.cccp.com,https://cccp.com
  ```

### 3. Select Environments
- ✅ **Production**
- ✅ **Preview**  
- ✅ **Development**

### 4. Save
- Click **Save**

### 5. Redeploy
- Go to **Deployments** tab
- Click **"..."** on latest deployment → **"Redeploy"**
- Wait 1-2 minutes

## What Each Origin Does

- `http://localhost:8080` - Your standalone test server
- `http://localhost:3000` - Default localhost (if you run main server locally)
- `http://localhost:3001` - Your main widget server (if running locally)
- `https://cameracorner.vercel.app` - Your Vercel deployment
- `https://www.cccp.com` - Production website (with www)
- `https://cccp.com` - Production website (without www)

## Quick Test Option (Less Secure)

If you want to allow ALL origins for testing:

```
*
```

**Warning:** Only use `*` for testing. Use the specific list above for production.

## Verify It Works

After redeploying, test:
1. Visit: `http://localhost:8080`
2. Open browser console (F12)
3. Try sending a message in the chat
4. Should work without CORS errors!

## Troubleshooting

**Still getting CORS errors?**
- Make sure you redeployed after changing the variable
- Check browser console for exact error message
- Verify the origin matches exactly (including http vs https, port numbers)

---

**That's it! Copy the value above and paste it into Vercel.**
