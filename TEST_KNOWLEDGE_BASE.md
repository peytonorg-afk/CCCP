# How to Test if Your Chatbot is Using Its Knowledge Base

## Quick Test

### Test 1: Check Server Logs

When you start your server, you should see:
```
[KB] Loaded 614 chunks from Supabase
```

**If you see this:** ✅ Knowledge base is loaded!

**If you see:** `[KB] Supabase table is empty` → Need to add content

### Test 2: Ask a Question and Check Logs

1. **Ask a question** in the chatbot
2. **Look at server console** - you should see:
```
[SEARCH] Query: "your question"
[SEARCH] Embeddings enabled: true/false
[SEARCH] Keyword results: X, Vector results: Y
[SEARCH] Total passages: X, Confidence: X.XX
[SEARCH] Top passage: "title" (content preview...)
```

**What to look for:**
- ✅ **Passages found: 3-6** = Good, finding content
- ✅ **Confidence: > 0.6** = Good, confident in answer
- ❌ **Passages found: 0** = Not finding content
- ❌ **Confidence: < 0.4** = Low confidence

### Test 3: Ask About Your Business

Ask questions that should be in your knowledge base:

**For CCCP (your business):**
- "What services do you offer?"
- "Tell me about video walls"
- "Do you do AV integration?"
- "What is a VLAN?"

**Expected:**
- Should find content from your website
- Should mention "Camera Corner Connecting Point"
- Should reference AV/IT services

### Test 4: Check Response Sources

The chatbot response includes `sources` - these show what content it found:

```json
{
  "reply": "...",
  "sources": [
    {"i": 1, "title": "Video Walls", "url": "https://www.cccp.com/..."},
    {"i": 2, "title": "AV Integration", "url": "https://www.cccp.com/..."}
  ]
}
```

**If sources exist:** ✅ Using knowledge base!

**If no sources:** ❌ Not finding content

---

## Detailed Testing

### Method 1: Check Supabase Directly

1. Go to **Supabase Dashboard**
2. **Table Editor** → **knowledge_base**
3. Check:
   - How many rows? (Should be 600+ if scraped)
   - Do rows have content?
   - Do rows have embeddings? (Check `embedding` column)

### Method 2: Test with cURL

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What services do you offer?"}'
```

**Look for:**
- `"sources": [...]` - Shows what content was found
- `"confidence": 0.XX` - Shows confidence level
- `"reply": "..."` - Should reference your business

### Method 3: Check Server Startup Logs

When server starts, look for:
```
[KB] Supabase connected. Knowledge base will be loaded from database.
[KB] Loaded 614 chunks from Supabase
```

**This confirms:**
- ✅ Supabase is connected
- ✅ Knowledge base has content
- ✅ Content is loaded into memory

### Method 4: Test Specific Content

Ask about something you KNOW is in your knowledge base:

**Example:**
If your website has a page about "Video Walls", ask:
- "Tell me about video walls"
- "What are video walls?"

**Expected:**
- Should find that content
- Should reference your website
- Should have high confidence (> 0.7)

---

## How to Verify It's Working

### ✅ Signs It's Working:

1. **Server logs show:**
   ```
   [KB] Loaded X chunks from Supabase
   ```

2. **Search logs show:**
   ```
   [SEARCH] Passages found: 3-6
   [SEARCH] Confidence: 0.6-0.9
   ```

3. **Responses include:**
   - References to your business
   - Specific information from your website
   - Sources listed in response

4. **Answers are accurate:**
   - Match your business information
   - Reference your services/products
   - Include details from your website

### ❌ Signs It's NOT Working:

1. **Server logs show:**
   ```
   [KB] Supabase table is empty
   [KB] No knowledge.jsonl found
   ```

2. **Search logs show:**
   ```
   [SEARCH] Passages found: 0
   [SEARCH] Confidence: 0.3
   ```

3. **Responses:**
   - Generic answers
   - Don't mention your business
   - Say "I don't know"
   - No sources listed

---

## Quick Test Script

Run this to test:

```bash
# Test 1: Check if knowledge base is loaded
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What services do you offer?"}' | \
  python3 -c "import sys, json; d=json.load(sys.stdin); \
  print('Sources:', len(d.get('sources', []))); \
  print('Confidence:', d.get('confidence')); \
  print('Reply:', d.get('reply', '')[:100])"
```

**Expected output:**
```
Sources: 6
Confidence: 0.95
Reply: At Camera Corner Connecting Point, we provide a range of services...
```

---

## Troubleshooting

### Problem: "No passages found"

**Check:**
1. Is knowledge base loaded? (Check server startup logs)
2. Does Supabase have content? (Check dashboard)
3. Are embeddings enabled? (Check `.env`)

**Fix:**
```bash
# Rebuild knowledge base
SITE_BASE_URL=https://www.cccp.com npm run build-kb:supabase:embed
```

### Problem: "Low confidence"

**Check:**
1. Is content relevant to the question?
2. Are embeddings enabled?
3. Is content detailed enough?

**Fix:**
- Add more relevant content
- Enable embeddings
- Make content more specific

### Problem: "Wrong information"

**Check:**
1. Is content in knowledge base accurate?
2. Is old/outdated content being used?

**Fix:**
- Update content in Supabase
- Rebuild knowledge base with fresh content

---

## Summary

**To test if it's using memory:**

1. ✅ Check server logs: `[KB] Loaded X chunks`
2. ✅ Check search logs: `[SEARCH] Passages found: X`
3. ✅ Check response: Has `sources` array
4. ✅ Ask about your business: Should find relevant content
5. ✅ Check Supabase: Should have rows with content

**If all check out:** ✅ Your chatbot IS using its knowledge base!
