# How to Train Your Chatbot - Complete Guide

## Quick Start (5 Minutes)

### Step 1: Add Content to Knowledge Base

**Option A: Scrape Your Website (Easiest)**

```bash
SITE_BASE_URL=https://www.cccp.com npm run build-kb:supabase:embed
```

This will:
- Scrape your entire website
- Extract all content
- Generate embeddings (for smart search)
- Store in Supabase

**Option B: Add Content Manually**

1. Go to **Supabase Dashboard** → **Table Editor** → **knowledge_base**
2. Click **"Insert row"**
3. Add your content:
   - `id`: unique name (e.g., "services-overview")
   - `url`: your website URL
   - `title`: page title
   - `content`: detailed information about your business
4. Click **Save**

### Step 2: Enable Embeddings

**In your `.env` file:**
```bash
KNOWLEDGE_WITH_EMBEDDINGS=1
```

### Step 3: Restart Server

```bash
npm run dev
```

**Done!** Your chatbot is now trained.

---

## Detailed Training Guide

### What is "Training"?

Training = Adding information to your knowledge base so the chatbot can answer questions about your business.

### Method 1: Scrape Your Website (Recommended)

**Best for:** When you have a website with good content

```bash
# With embeddings (recommended - smarter search)
SITE_BASE_URL=https://www.cccp.com npm run build-kb:supabase:embed

# Without embeddings (faster, but less accurate)
SITE_BASE_URL=https://www.cccp.com npm run build-kb:supabase
```

**What it does:**
1. Finds your sitemap (`/sitemap.xml`)
2. Scrapes all pages
3. Extracts text content
4. Chunks it into smaller pieces
5. Generates embeddings (if enabled)
6. Stores in Supabase

**Time:** 5-30 minutes depending on website size

### Method 2: Manual Entry

**Best for:** Adding specific information not on your website

1. **Go to Supabase Dashboard**
   - https://supabase.com/dashboard
   - Select your project
   - **Table Editor** → **knowledge_base**

2. **Click "Insert row"**

3. **Add Information:**
   ```
   id: services-overview
   url: https://yoursite.com/services
   title: Our Services
   content: [Detailed description of your services - be specific!]
   ```

4. **Repeat** for each topic:
   - Services
   - Products
   - Pricing
   - Contact info
   - Hours/Location
   - Policies
   - FAQs

### Method 3: Use a Script

**Best for:** Adding multiple entries programmatically

See `scripts/add_macbook_models.js` for an example.

Create your own script:
```javascript
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const content = [
  {
    id: "my-service-1",
    url: "https://yoursite.com/service1",
    title: "Service 1",
    content: "Detailed description..."
  }
];

// Add to Supabase
for (const item of content) {
  await supabase.from("knowledge_base").upsert(item);
}
```

---

## What Content to Add

### Essential Information

1. **Services/Products**
   - What you offer
   - Detailed descriptions
   - Features/benefits

2. **Contact Information**
   - Phone number
   - Email
   - Address
   - Hours of operation

3. **Pricing** (if public)
   - Service prices
   - Product prices
   - Package deals

4. **Policies**
   - Warranty information
   - Return policy
   - Payment methods
   - Terms of service

5. **FAQs**
   - Common questions
   - Detailed answers
   - Troubleshooting

### Content Quality Tips

✅ **DO:**
- Be specific and detailed
- Include keywords people might search for
- Write complete sentences
- Add examples when helpful
- Include contact information

❌ **DON'T:**
- Be vague ("We offer services")
- Use jargon without explanation
- Leave out important details
- Make it too short

**Example - Good:**
```
"We offer MacBook repair services including screen replacement ($250-$400), 
battery replacement ($120-$200), and keyboard repair ($150-$400). 
We're located at 123 Main St, open Monday-Friday 9am-6pm. 
Call (555) 123-4567 or visit our website."
```

**Example - Bad:**
```
"We fix computers. Contact us."
```

---

## Enable Embeddings (Critical!)

Embeddings make search **much smarter**.

**Without embeddings:**
- Only finds exact keyword matches
- "laptop screen broken" won't find "display repair"

**With embeddings:**
- Understands meaning
- "laptop screen broken" finds "display repair", "screen replacement", etc.

**How to enable:**
```bash
# In .env file
KNOWLEDGE_WITH_EMBEDDINGS=1

# Rebuild knowledge base
SITE_BASE_URL=https://www.cccp.com npm run build-kb:supabase:embed
```

---

## Training Workflow

### Step 1: Prepare Content

- List all topics you want the chatbot to know
- Gather information (website, documents, FAQs)
- Organize by category

### Step 2: Add to Knowledge Base

**Choose method:**
- Scrape website (easiest)
- Manual entry (most control)
- Script (for bulk)

### Step 3: Enable Embeddings

```bash
KNOWLEDGE_WITH_EMBEDDINGS=1
```

### Step 4: Rebuild (If Using Website)

```bash
SITE_BASE_URL=https://www.cccp.com npm run build-kb:supabase:embed
```

### Step 5: Restart Server

```bash
npm run dev
```

### Step 6: Test

Ask questions:
- "What services do you offer?"
- "What are your hours?"
- "How much does X cost?"

### Step 7: Refine

- Check server logs for `[SEARCH]` messages
- See what content is being found
- Add more content if needed
- Improve existing content

---

## Testing Your Training

### Check Server Logs

When you ask a question, look for:
```
[SEARCH] Query: "your question"
[SEARCH] Passages found: X
[SEARCH] Confidence: X.XX
```

**Good signs:**
- Passages found: 3-6
- Confidence: > 0.6
- Top passage is relevant

**Bad signs:**
- Passages found: 0
- Confidence: < 0.4
- Top passage is irrelevant

### Test Questions

Try these:
- "What services do you offer?"
- "What are your hours?"
- "How much does X cost?"
- "Where are you located?"
- "Do you offer warranty?"

### Verify in Supabase

1. Go to **Supabase Dashboard** → **knowledge_base**
2. Check that rows were added
3. Verify content looks good
4. Check if embeddings exist (should have values, not null)

---

## Common Training Issues

### Issue: Chatbot says "I don't know"

**Cause:** No relevant content in knowledge base

**Fix:**
- Add content about that topic
- Make content more specific
- Include keywords users might search for

### Issue: Chatbot gives wrong information

**Cause:** Content is inaccurate or outdated

**Fix:**
- Update content in Supabase
- Remove incorrect information
- Add correct information

### Issue: Low confidence scores

**Cause:** Not enough relevant content

**Fix:**
- Add more content
- Enable embeddings
- Make content more detailed

### Issue: Can't find content

**Cause:** Embeddings disabled or content doesn't match query

**Fix:**
- Enable embeddings
- Add content with matching keywords
- Rebuild knowledge base

---

## Advanced Training

### Fine-Tuning (Very Advanced)

Train the model itself on your conversations:

```bash
# Requires lots of conversation data
# Expensive ($)
# Best for domain-specific chatbots
```

### Continuous Training

Keep improving:
1. Monitor questions users ask
2. Identify gaps in knowledge base
3. Add content for missing topics
4. Update outdated information
5. Refine based on feedback

---

## Quick Reference

```bash
# Train from website (with embeddings)
SITE_BASE_URL=https://www.cccp.com npm run build-kb:supabase:embed

# Enable embeddings
# In .env: KNOWLEDGE_WITH_EMBEDDINGS=1

# Restart server
npm run dev

# Test
# Ask: "What services do you offer?"
```

---

## Summary

**Training = Adding content to knowledge base**

1. ✅ Add your business information
2. ✅ Enable embeddings
3. ✅ Rebuild knowledge base
4. ✅ Restart server
5. ✅ Test and refine

**The more content you add, the better your chatbot!**
