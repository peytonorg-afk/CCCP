# Run This Command to Rebuild Knowledge Base with Embeddings

## Your Website URL

Based on your existing knowledge base, your website is: **https://www.cccp.com**

## Command to Run

```bash
SITE_BASE_URL=https://www.cccp.com npm run build-kb:supabase:embed
```

## What This Will Do

1. ✅ Scrape your entire website (https://www.cccp.com)
2. ✅ Extract all content from all pages
3. ✅ Generate embeddings (for smarter search)
4. ✅ Replace existing content in Supabase
5. ✅ Make the chatbot much smarter!

## Important Notes

⚠️ **This will REPLACE all existing content** in your knowledge base
- Your current 614 rows will be cleared
- New content from your website will be added
- This is usually fine - you want fresh content with embeddings

## Before Running

Make sure you have:
- ✅ `OPENAI_API_KEY` in your `.env` file (needed for embeddings)
- ✅ `SUPABASE_URL` in your `.env` file
- ✅ `SUPABASE_SERVICE_ROLE_KEY` in your `.env` file

## After Running

1. **Restart your server:**
   ```bash
   npm run dev
   ```

2. **You should see:**
   ```
   [KB] Loaded X chunks from Supabase
   ```

3. **Test it:**
   - Ask: "What services do you offer?"
   - The chatbot should now be smarter with embeddings enabled!

## Expected Output

You'll see something like:
```
🚀 Starting knowledge base build for Supabase...
📡 Scraping: https://www.cccp.com
🔍 Embeddings: Enabled
🗑️  Cleared existing knowledge base
📋 Found 200+ URLs to process

✅ Processed https://www.cccp.com/... → 3 chunks
✅ Processed https://www.cccp.com/... → 2 chunks
...

✨ Done! Inserted X chunks into Supabase knowledge_base table
```

## Why This Helps

- **Without embeddings:** Search is keyword-based (less accurate)
- **With embeddings:** Search understands meaning (much better!)

Example:
- User asks: "my display is broken"
- Without embeddings: Might not find "screen replacement" content
- With embeddings: Understands they're the same thing! ✅

---

## Ready? Run This:

```bash
SITE_BASE_URL=https://www.cccp.com npm run build-kb:supabase:embed
```

Then restart your server and test!
