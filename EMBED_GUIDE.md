# How to Embed the Chatbot on Any Website

## Quick Embed (Same Domain)

If your chatbot server is on the same domain as your website:

```html
<script defer src="https://your-domain.com/widget/widget.js"></script>
```

## Embed on Different Domain

If you want to embed the chatbot on a different website:

```html
<script 
  defer 
  src="https://your-chatbot-server.com/widget/widget.js"
  data-api-url="https://your-chatbot-server.com">
</script>
```

**Important:** Make sure your server allows CORS from the embedding domain.

## Setting Up CORS

In your `.env` file, add the domains that can embed your widget:

```bash
ALLOWED_ORIGINS=https://client-website.com,https://another-site.com,https://localhost:3000
```

Or allow all origins (for testing only):

```bash
ALLOWED_ORIGINS=*
```

## Example: Embed on Your Website

1. **Start your chatbot server:**
   ```bash
   npm run dev
   # Server runs on http://localhost:3001
   ```

2. **Add to your HTML:**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <title>My Website</title>
   </head>
   <body>
     <h1>Welcome to My Website</h1>
     <p>Your content here...</p>
     
     <!-- Chatbot Widget -->
     <script 
       defer 
       src="http://localhost:3001/widget/widget.js"
       data-api-url="http://localhost:3001">
     </script>
   </body>
   </html>
   ```

3. **Open your website** - You'll see a floating "Chat" button in the bottom right!

## Production Deployment

### Option 1: Deploy to Vercel/Netlify

1. **Push your code to GitHub**
2. **Import to Vercel/Netlify**
3. **Set environment variables:**
   - `OPENAI_API_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ALLOWED_ORIGINS` (your website domains)
4. **Deploy**

5. **Embed on your website:**
   ```html
   <script 
     defer 
     src="https://your-chatbot.vercel.app/widget/widget.js"
     data-api-url="https://your-chatbot.vercel.app">
   </script>
   ```

### Option 2: Deploy to Your Own Server

1. **Set up a server** (AWS, DigitalOcean, etc.)
2. **Install Node.js**
3. **Clone your repo**
4. **Set environment variables**
5. **Run:** `npm start` (or use PM2 for production)
6. **Set up reverse proxy** (nginx) if needed

## Customization

### Change Button Text

Edit `widget/widget.js` line 217:
```javascript
btn.textContent='Chat'; // Change to 'Help', 'Support', etc.
```

### Change Colors

Edit the CSS variables in `widget/widget.js` (lines 10-22):
```javascript
:root {
  --cccp-primary: #591C27;      // Main color
  --cccp-accent: #8B2E3A;        // Accent color
  --cccp-userBubble: #8B2E3A;    // User message color
  // ... etc
}
```

### Change Header Text

Edit line 220 in `widget/widget.js`:
```javascript
<div id="bb-head">How can we help?</div> // Change this text
```

## Testing

1. **Start server:** `npm run dev`
2. **Open:** `http://localhost:3001`
3. **Click the Chat button**
4. **Test a message:** "Hello, I need help"
5. **Verify it works!**

## Troubleshooting

### Widget doesn't appear
- Check browser console for errors
- Verify the script URL is correct
- Make sure server is running

### CORS errors
- Add your domain to `ALLOWED_ORIGINS` in `.env`
- Restart server after changing `.env`

### API errors
- Check server logs
- Verify `OPENAI_API_KEY` is set
- Check Supabase credentials

## Next Steps

1. ✅ Deploy your chatbot server
2. ✅ Add the embed script to your website
3. ✅ Test on your website
4. ✅ Customize colors/text to match your brand
5. ✅ Add more content to your knowledge base

Your chatbot is now ready to use on any website! 🎉
