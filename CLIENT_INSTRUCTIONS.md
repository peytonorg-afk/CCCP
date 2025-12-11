# Chatbot Widget - Client Installation Guide

## For Your Clients: How to Add the Chatbot

Give this to your clients - it's all they need to add your chatbot to their website!

---

## Quick Install (1 Step)

Add this **one line** to your website's HTML (before the closing `</body>` tag):

```html
<script 
  defer 
  src="YOUR-SERVER-URL/widget/widget.js" 
  data-api-url="YOUR-SERVER-URL"
  data-privacy-url="https://www.cccp.com/privacy-policy">
</script>
```

**Replace `YOUR-SERVER-URL` with your actual chatbot server URL (provided by your chatbot provider).**

---

## Full Example

Here's a complete HTML page example:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome to My Website</h1>
  <p>Your content here...</p>
  
  <!-- Add this before </body> -->
  <script 
    defer 
    src="YOUR-SERVER-URL/widget/widget.js" 
    data-api-url="YOUR-SERVER-URL"
    data-privacy-url="https://www.cccp.com/privacy-policy">
  </script>
</body>
</html>
```

---

## What Your Clients Get

✅ **Floating Chat Button** - Appears in bottom right corner  
✅ **Full Chat Interface** - Professional chat window  
✅ **Works Immediately** - No setup needed  
✅ **Mobile Responsive** - Works on phones and tablets  
✅ **No Dependencies** - Just one script tag  

---

## For Different Website Platforms

### WordPress
1. Go to **Appearance → Theme Editor**
2. Edit `footer.php`
3. Add the script tag before `</body>`
4. Save

### Shopify
1. Go to **Online Store → Themes → Actions → Edit Code**
2. Open `theme.liquid`
3. Add the script tag before `</body>`
4. Save

### Squarespace
1. Go to **Settings → Advanced → Code Injection**
2. Add the script tag to **Footer**
3. Save

### Wix
1. Go to **Settings → Custom Code**
2. Add the script tag to **Footer**
3. Save

### HTML Website
Just add the script tag to your HTML file before `</body>`

---

## Customization (Optional)

### Change Button Text
Add `data-button-text="Support"` to the script tag:
```html
<script 
  defer 
  src="YOUR-SERVER-URL/widget/widget.js" 
  data-api-url="YOUR-SERVER-URL"
  data-button-text="Support"
  data-privacy-url="https://www.cccp.com/privacy-policy">
</script>
```

### Change Header Text
Add `data-header-text="How can we help?"` to the script tag:
```html
<script 
  defer 
  src="YOUR-SERVER-URL/widget/widget.js" 
  data-api-url="YOUR-SERVER-URL"
  data-header-text="Need Help?"
  data-privacy-url="https://www.cccp.com/privacy-policy">
</script>
```

---

## Troubleshooting

### Chat button doesn't appear
- Check browser console for errors (F12)
- Make sure the script URL is correct
- Verify your server is running

### "CORS error" message
- Contact the chatbot provider - they need to add your domain to allowed origins

### Chat doesn't respond
- Check that the `data-api-url` matches your server domain
- Verify the server is running and accessible

---

## Support

If you need help, contact: [YOUR CONTACT INFO]

---

**That's it! Just one script tag and your chatbot is live! 🚀**
