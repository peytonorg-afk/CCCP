# Why It Worked on Localhost But Not on Vercel

## The Main Issue: CORS (Cross-Origin Resource Sharing)

### On Localhost:
- **Same-origin requests** - Browser and server are on the same domain (`localhost:3001`)
- **No CORS check** - Browsers don't enforce CORS for same-origin requests
- **ALLOWED_ORIGINS not needed** - Even if set incorrectly, it doesn't matter

### On Vercel:
- **Different origin** - Widget loads from `cameracorner.vercel.app`, API is also on `cameracorner.vercel.app`
- **CORS is enforced** - Even same-origin can trigger CORS checks in some cases
- **ALLOWED_ORIGINS must be set** - If it's set to a value that doesn't include your domain, requests are blocked

## The Fix: Set ALLOWED_ORIGINS in Vercel

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Click your project: **cameracorner**

### Step 2: Add/Update Environment Variable
1. Go to: **Settings** → **Environment Variables**
2. Find: `ALLOWED_ORIGINS`
3. **Set it to ONE of these:**

   **Option A: Allow your Vercel domain (Recommended)**
   ```
   https://cameracorner.vercel.app
   ```

   **Option B: Allow all origins (Quick fix)**
   ```
   *
   ```

   **Option C: Allow multiple domains**
   ```
   https://cameracorner.vercel.app,https://www.cccp.com,https://cccp.com
   ```

4. **CRITICAL:** Make sure it's set for **Production**, **Preview**, AND **Development**
5. Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click **"..."** on latest deployment → **"Redeploy"**
3. Wait 1-2 minutes

## Why This Happens

The code checks:
```javascript
const ALLOWED = (process.env.ALLOWED_ORIGINS || "").split(",").map(s=>s.trim()).filter(Boolean);
```

If `ALLOWED_ORIGINS` is:
- **Not set** → `ALLOWED = []` → Allows all (because `!ALLOWED.length` is true)
- **Set to empty string** → `ALLOWED = []` → Allows all
- **Set to "domain1,domain2"** → `ALLOWED = ["domain1", "domain2"]` → Only allows those domains

**If it's set to something that doesn't include your Vercel domain, it blocks requests!**

## Test It

After setting ALLOWED_ORIGINS and redeploying:

```bash
curl -X POST https://cameracorner.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -H "Origin: https://cameracorner.vercel.app" \
  -d '{"message":"test"}'
```

Should return: `{"reply":"...", ...}` NOT `{"error":"Origin not allowed"}`

## Summary

**Localhost worked because:** No CORS enforcement for same-origin  
**Vercel doesn't work because:** CORS is blocking requests - `ALLOWED_ORIGINS` needs to include your domain

**Fix:** Set `ALLOWED_ORIGINS=https://cameracorner.vercel.app` (or `*`) in Vercel environment variables and redeploy.
