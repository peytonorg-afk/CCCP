# Troubleshooting: Widget Not Appearing

## Quick Fixes:

### 1. **Hard Refresh Your Browser**
- **Mac:** `Cmd + Shift + R`
- **Windows/Linux:** `Ctrl + Shift + R` or `Ctrl + F5`

This clears the browser cache and loads the latest version.

### 2. **Check Browser Console**
1. Press `F12` (or right-click → Inspect)
2. Go to the **Console** tab
3. Look for any red error messages
4. Check if you see: `✅ Widget loaded successfully!` or `❌ Widget NOT loaded`

### 3. **Check Network Tab**
1. Press `F12` → **Network** tab
2. Refresh the page
3. Look for `widget.js` in the list
4. Check if it loaded (status should be `200`)
5. If it shows `404` or `Failed`, the script URL might be wrong

### 4. **Verify the Script Line**
Make sure the script is **NOT commented out**:

```html
<!-- ❌ WRONG (commented out) -->
<!-- <script defer src="..."></script> -->

<!-- ✅ CORRECT (active) -->
<script defer src="https://cameracorner.vercel.app/widget/widget.js" data-api-url="https://cameracorner.vercel.app" data-privacy-url="https://www.cccp.com/privacy-policy"></script>
```

### 5. **Check Script Location**
The script must be **before the closing `</body>` tag**:

```html
<body>
  <!-- Your content -->
  
  <!-- Widget script goes here, right before </body> -->
  <script defer src="..."></script>
</body>
```

### 6. **Test the Widget URL Directly**
Open this in your browser:
```
https://cameracorner.vercel.app/widget/widget.js
```

You should see JavaScript code. If you see an error, the server might be down.

### 7. **Common Issues:**

**Issue:** Script loads but button doesn't appear
- **Fix:** Check browser console for JavaScript errors
- **Fix:** Make sure `document.body` exists when script runs (using `defer` should handle this)

**Issue:** CORS errors in console
- **Fix:** Make sure `ALLOWED_ORIGINS` in Vercel includes your domain
- **Fix:** For localhost testing, add `http://localhost:8080` to allowed origins

**Issue:** Button appears but chat doesn't work
- **Fix:** Check Network tab when sending a message
- **Fix:** Verify `data-api-url` matches your Vercel deployment URL

## Still Not Working?

1. **Copy the exact error message** from browser console
2. **Check Network tab** - see if `widget.js` loaded (status code)
3. **Try a different browser** to rule out browser-specific issues
4. **Check if JavaScript is enabled** in your browser settings
