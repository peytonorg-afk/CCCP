# How to Add/Remove Widget on localhost:8080

## File Location
`standalone-test/index.html`

## To ADD the Widget

**Open `standalone-test/index.html` and add this code BEFORE `</body>`:**

```html
<script 
  defer 
  src="https://cameracorner.vercel.app/widget/widget.js" 
  data-api-url="https://cameracorner.vercel.app"
  data-privacy-url="https://www.cccp.com/privacy-policy">
</script>
```

**Full location in file:**
- Scroll to the bottom
- Find `</body>`
- Add the script tag **right before** `</body>`
- Save the file
- Refresh `http://localhost:8080` in your browser

## To REMOVE the Widget

**Simply delete or comment out the script tag:**

**Option 1: Delete it completely**
- Find the `<script>` tag with `widget.js`
- Delete the entire script block
- Save and refresh

**Option 2: Comment it out (to keep for later)**
```html
<!--
<script 
  defer 
  src="https://cameracorner.vercel.app/widget/widget.js" 
  data-api-url="https://cameracorner.vercel.app"
  data-privacy-url="https://www.cccp.com/privacy-policy">
</script>
-->
```

## Quick Copy/Paste

**To ADD widget - Copy this:**
```html
<script 
  defer 
  src="https://cameracorner.vercel.app/widget/widget.js" 
  data-api-url="https://cameracorner.vercel.app"
  data-privacy-url="https://www.cccp.com/privacy-policy">
</script>
```

**Paste it right before `</body>` in `standalone-test/index.html`**

## Visual Guide

**File structure should look like this:**

```html
  <footer>
    <p>&copy; 2024 Test Website - Independent Server</p>
  </footer>

  <!-- ADD WIDGET SCRIPT HERE (before </body>) -->
  <script 
    defer 
    src="https://cameracorner.vercel.app/widget/widget.js" 
    data-api-url="https://cameracorner.vercel.app"
    data-privacy-url="https://www.cccp.com/privacy-policy">
  </script>
</body>
</html>
```

## After Adding/Removing

1. **Save the file** (`Cmd+S` or `Ctrl+S`)
2. **Refresh browser** (`Cmd+R` or `F5`)
3. **Widget appears/disappears** immediately

## Test It

- **With widget:** Chat button appears in bottom right
- **Without widget:** No chat button, just your website content

---

**That's it! Just add/remove the script tag to toggle the widget.**
