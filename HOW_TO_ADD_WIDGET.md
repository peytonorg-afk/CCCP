# How to Add the Chatbot Widget (For Clients)

## It's This Simple:

Add **ONE LINE** to your website's HTML, right before the closing `</body>` tag:

```html
<script defer src="https://cameracorner.vercel.app/widget/widget.js" data-api-url="https://cameracorner.vercel.app" data-privacy-url="https://www.cccp.com/privacy-policy"></script>
```

## Step-by-Step:

1. **Open your website's HTML file** (usually `index.html` or your main page)
2. **Find the closing `</body>` tag** (near the bottom of the file)
3. **Paste the script line above** right before `</body>`
4. **Save and refresh** your website

That's it! The chat button will appear in the bottom-right corner.

## To Remove It:

Simply **delete that one line** or **comment it out**:

```html
<!-- <script defer src="https://cameracorner.vercel.app/widget/widget.js" data-api-url="https://cameracorner.vercel.app" data-privacy-url="https://www.cccp.com/privacy-policy"></script> -->
```

## Example:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome to My Site</h1>
  <p>Content goes here...</p>
  
  <!-- Add the chatbot widget here -->
  <script defer src="https://cameracorner.vercel.app/widget/widget.js" data-api-url="https://cameracorner.vercel.app" data-privacy-url="https://www.cccp.com/privacy-policy"></script>
</body>
</html>
```

## Works On:
- Any HTML page
- WordPress (add to footer.php or use a plugin)
- Shopify (add to theme.liquid)
- Squarespace (add to Code Injection)
- Wix (add to Custom Code)
- Any website platform that allows HTML/JavaScript
