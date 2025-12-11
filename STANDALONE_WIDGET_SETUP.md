# Standalone Chatbot Widget - Setup Guide

## Overview

You're providing a **complete, standalone chatbot widget** that clients can add to their website with just one script tag. The widget includes:

✅ Chat button (floating in bottom right)  
✅ Full chat interface  
✅ All styling and functionality  
✅ Connects to YOUR server  

---

## What You Need to Do

### Step 1: Deploy Your Server

Deploy your chatbot server to a public URL (Vercel, Netlify, your own server, etc.)

**Example:** `https://my-chatbot.vercel.app`

### Step 2: Set Up CORS

In your `.env` file, allow clients' domains:

```bash
# Allow specific domains
ALLOWED_ORIGINS=https://client1-website.com,https://client2-website.com

# Or allow all (for testing - not recommended for production)
ALLOWED_ORIGINS=*
```

### Step 3: Give Clients the Embed Code

Give them this **one line**:

```html
<script 
  defer 
  src="https://YOUR-SERVER-DOMAIN.com/widget/widget.js" 
  data-api-url="https://YOUR-SERVER-DOMAIN.com">
</script>
```

**Replace `YOUR-SERVER-DOMAIN.com` with your actual server URL.**

---

## Client Instructions

Give clients the file: `CLIENT_INSTRUCTIONS.md`

It contains:
- Simple installation steps
- Platform-specific instructions (WordPress, Shopify, etc.)
- Troubleshooting tips

---

## Testing

### Test Locally

1. Start your server: `npm run dev`
2. Open: `http://localhost:3001`
3. You should see the chat button
4. Test a message: "I need help"

### Test on Client Website

1. Client adds the script tag to their website
2. Replace `YOUR-SERVER-DOMAIN.com` with `http://localhost:3001` (for testing)
3. Make sure CORS allows their domain
4. Test the chat

---

## Customization Options

Clients can customize the widget:

```html
<script 
  defer 
  src="https://YOUR-SERVER-DOMAIN.com/widget/widget.js" 
  data-api-url="https://YOUR-SERVER-DOMAIN.com"
  data-button-text="Support"
  data-header-text="Need Help?">
</script>
```

**Options:**
- `data-button-text` - Change button text (default: "Chat")
- `data-header-text` - Change header text (default: "How can we help?")

---

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Import to Vercel
3. Set environment variables
4. Deploy
5. Get URL: `https://your-project.vercel.app`

### Option 2: Netlify

1. Push code to GitHub
2. Import to Netlify
3. Set environment variables
4. Deploy
5. Get URL: `https://your-project.netlify.app`

### Option 3: Your Own Server

1. Set up server (AWS, DigitalOcean, etc.)
2. Install Node.js
3. Clone repo
4. Set environment variables
5. Run: `npm start` (or use PM2)
6. Point domain to server

---

## File Structure

```
widget/
├── widget.js          # The complete widget (give this to clients)
└── ...

api/
└── server.js          # Your server (host this)

CLIENT_INSTRUCTIONS.md  # Give this to clients
```

---

## What Clients Get

When clients add the script tag, they get:

1. **Floating Chat Button** - Appears automatically
2. **Chat Window** - Opens when clicked
3. **Full Functionality** - Sends messages, receives responses
4. **Lead Capture** - Shows form when needed
5. **Mobile Responsive** - Works on all devices
6. **No Setup Required** - Just works!

---

## Important Notes

1. **CORS Must Be Configured** - Add client domains to `ALLOWED_ORIGINS`
2. **Server Must Be Public** - Clients need to access your API
3. **HTTPS Recommended** - For production, use HTTPS
4. **Environment Variables** - Keep `.env` secure, don't commit it

---

## Support

If clients have issues:
1. Check browser console for errors
2. Verify script URL is correct
3. Check CORS settings
4. Verify server is running

---

## Summary

✅ Deploy your server  
✅ Set up CORS  
✅ Give clients the script tag  
✅ They add it to their website  
✅ Done! Chatbot works! 🎉
