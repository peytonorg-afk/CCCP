# How to Train Your Chatbot Properly

## The Problem

Your chatbot needs **good training data** in the knowledge base to answer questions accurately. Without proper training, it will give generic or incorrect responses.

## Step 1: Add Your Business Content to Knowledge Base

### Option A: Scrape Your Website (Best)

If your business has a website with information:

```bash
# Replace with YOUR actual website URL
SITE_BASE_URL=https://your-business-website.com npm run build-kb:supabase:embed
```

This will:
- Scrape all pages from your website
- Extract content
- Generate embeddings (for better search)
- Store in Supabase

**Example:**
```bash
SITE_BASE_URL=https://myrepairshop.com npm run build-kb:supabase:embed
```

### Option B: Manually Add Content (If No Website)

1. Go to **Supabase Dashboard** → **Table Editor** → **knowledge_base**
2. Click **"Insert row"**
3. Add content about your business:

**Example for a repair shop:**
```
id: services-overview
url: https://yoursite.com/services
title: Our Services
content: We offer comprehensive repair services including:
- MacBook repair: screen replacement ($200-$600), battery replacement ($100-$250), keyboard repair ($150-$400)
- iPhone repair: screen replacement, battery replacement, camera repair
- iPad repair: screen replacement, charging port repair
- Same-day service available for most repairs
- 90-day warranty on all repairs
- Free diagnostic service
- Located at 123 Main St, open Monday-Friday 9am-6pm
- Call us at (555) 123-4567 or email info@yoursite.com
```

4. Repeat for each topic:
   - Services
   - Pricing
   - Location/Hours
   - Contact info
   - Policies (warranty, returns, etc.)
   - FAQs

### Option C: Use a Script

Create a file with your content and use a script to add it (see scripts/build_knowledge_supabase.js for reference).

## Step 2: Enable Embeddings (CRITICAL)

Embeddings make the chatbot understand **meaning**, not just keywords.

**In your `.env` file:**
```bash
KNOWLEDGE_WITH_EMBEDDINGS=1
```

**Then rebuild your knowledge base:**
```bash
SITE_BASE_URL=https://your-website.com npm run build-kb:supabase:embed
```

**Why this matters:**
- Without embeddings: "my laptop screen is broken" might not find "MacBook display repair"
- With embeddings: It understands they're the same thing!

## Step 3: Add Comprehensive Content

### What to Include:

1. **Services Offered**
   - What you do
   - What you don't do
   - Pricing (if public)

2. **Business Information**
   - Location
   - Hours
   - Contact info
   - How to reach you

3. **Policies**
   - Warranty information
   - Return policy
   - Payment methods
   - Turnaround times

4. **Common Questions**
   - FAQs
   - "How long does X take?"
   - "How much does Y cost?"
   - "Do you offer warranty?"

5. **Product/Service Details**
   - Specific offerings
   - Features
   - Benefits

### Content Quality Tips:

✅ **DO:**
- Write clear, complete sentences
- Include relevant keywords people might search for
- Be specific (e.g., "MacBook Pro 13-inch screen replacement: $350")
- Include contact information
- Add pricing if applicable

❌ **DON'T:**
- Use vague descriptions
- Leave out important details
- Use jargon without explanation
- Make it too short (aim for 100-500 words per entry)

## Step 4: Test and Refine

### Test Questions:

Try asking:
- "What services do you offer?"
- "How much does [service] cost?"
- "Where are you located?"
- "What are your hours?"
- "Do you offer warranty?"

### Check Server Logs:

When you ask a question, check the server logs for:
```
[SEARCH] Query: "your question"
[SEARCH] Passages found: X
[SEARCH] Confidence: X.XX
```

**If confidence is low (< 0.5):**
- Add more relevant content to knowledge base
- Make sure content includes keywords from the question
- Enable embeddings if not already enabled

**If passages found but answer is wrong:**
- Improve the content quality
- Make content more specific
- Add more context to each entry

## Step 5: Restart Server

After adding content:
```bash
# Stop server (Ctrl+C)
npm run dev
```

You should see:
```
[KB] Loaded X chunks from Supabase
```

## Example: Training for a Repair Shop

### Good Content Example:

```
id: macbook-repair-services
title: MacBook Repair Services
content: We specialize in MacBook repair for all Apple MacBook models. Our services include:

Screen Replacement:
- MacBook Air: $250-$400
- MacBook Pro 13": $350-$500
- MacBook Pro 15": $450-$650
- Same-day service available

Battery Replacement:
- All models: $120-$200
- Includes new battery and installation
- 90-day warranty

Keyboard Repair:
- Butterfly keyboard issues: $200-$350
- Full keyboard replacement: $300-$450
- Most repairs completed same-day

We also offer:
- Logic board repair ($400-$800)
- Water damage repair ($200-$600)
- Data recovery ($200-$1000)
- Charging port repair ($100-$200)

All repairs come with a 90-day warranty. We use genuine Apple parts when available. Free diagnostic service. Located at 123 Main Street, open Monday-Friday 9am-6pm, Saturday 10am-4pm. Call (555) 123-4567 or visit our website.
```

### Bad Content Example:

```
id: services
title: Services
content: We fix computers.
```

**Why it's bad:** Too vague, no details, won't help answer specific questions.

## Troubleshooting

### Chatbot gives generic answers
- **Problem:** Knowledge base is empty or has poor content
- **Solution:** Add comprehensive content about your business

### Chatbot can't find relevant information
- **Problem:** Content doesn't match what users ask
- **Solution:** Add content with keywords users might use

### Chatbot gives wrong information
- **Problem:** Content is inaccurate or outdated
- **Solution:** Update knowledge base with correct information

### Low confidence scores
- **Problem:** Not enough relevant content
- **Solution:** Add more content, enable embeddings, improve content quality

## Quick Checklist

- [ ] Knowledge base has content about your business
- [ ] Content is comprehensive and detailed
- [ ] Embeddings are enabled (`KNOWLEDGE_WITH_EMBEDDINGS=1`)
- [ ] Knowledge base rebuilt with embeddings
- [ ] Server restarted after adding content
- [ ] Tested with real questions
- [ ] Confidence scores are good (> 0.6)
- [ ] Answers are accurate and helpful

## Summary

**Training = Good Content in Knowledge Base**

1. Add your business information to Supabase
2. Enable embeddings
3. Make content comprehensive and specific
4. Test and refine
5. Keep content updated

The better your content, the better your chatbot! 🎯
