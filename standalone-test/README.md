# Independent Test Server

This is a completely separate localhost server to test the chatbot widget independently.

## How to Run

### Option 1: Python (Easiest)
```bash
cd standalone-test
python3 -m http.server 8080
```

Then visit: `http://localhost:8080`

### Option 2: Node.js
```bash
cd standalone-test
npx http-server -p 8080
```

Then visit: `http://localhost:8080`

### Option 3: PHP
```bash
cd standalone-test
php -S localhost:8080
```

Then visit: `http://localhost:8080`

## What This Does

- Creates a completely independent localhost server (port 8080)
- Serves `index.html` with the widget embedded
- Lets you test how the widget overlays on a real website
- No connection to your main widget project

## Customize

Edit `index.html` to:
- Change the content/styling
- Test different layouts
- See how the widget looks on different page designs
- Add/remove the widget script to test

## Widget Script

The widget script is already embedded in `index.html`. You can:
- Remove it to test without widget
- Modify the attributes (data-button-text, data-header-text)
- Change the API URL if needed

## Important: CORS

Make sure `ALLOWED_ORIGINS` in Vercel includes:
```
http://localhost:8080
```

Or set it to `*` for testing.

## Stop the Server

Press `Ctrl+C` in the terminal where the server is running.
