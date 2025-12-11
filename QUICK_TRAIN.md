# Quick Training Guide - Fix Stupid Responses

## The Problem

Your chatbot is giving stupid/generic responses because it doesn't have good training data about YOUR business.

## Quick Fix (5 Minutes)

### Step 1: Go to Supabase

1. Open: https://supabase.com/dashboard
2. Select your project
3. Go to **Table Editor** → **knowledge_base**

### Step 2: Add Your Business Info

Click **"Insert row"** and add this information:

#### Entry 1: Services
```
id: my-services
url: https://yoursite.com/services
title: Our Services
content: [DESCRIBE WHAT YOU ACTUALLY DO - BE SPECIFIC]
```

#### Entry 2: Contact Info
```
id: contact-info
url: https://yoursite.com/contact
title: Contact Us
content: [YOUR PHONE, EMAIL, ADDRESS, HOURS]
```

#### Entry 3: Pricing (if applicable)
```
id: pricing
url: https://yoursite.com/pricing
title: Pricing
content: [YOUR PRICES - BE SPECIFIC]
```

### Step 3: Enable Embeddings

**In your `.env` file, make sure you have:**
```bash
KNOWLEDGE_WITH_EMBEDDINGS=1
```

### Step 4: Restart Server

```bash
npm run dev
```

### Step 5: Test

Ask: "What services do you offer?"

It should now use YOUR information, not generic responses!

---

## Better Training (If You Have a Website)

If your business has a website:

```bash
SITE_BASE_URL=https://your-actual-website.com npm run build-kb:supabase:embed
```

This will scrape your entire website and train the chatbot with YOUR content.

---

## What Makes Good Training Data?

✅ **Good:**
- "We offer MacBook repair services. Screen replacement costs $250-$400 depending on model. We're located at 123 Main St and open Monday-Friday 9am-6pm. Call us at (555) 123-4567."

❌ **Bad:**
- "We fix things."
- "Contact us for more info."
- Generic descriptions

**Be SPECIFIC and DETAILED!**

---

## Still Not Working?

1. Check server logs - look for `[SEARCH]` messages
2. Verify knowledge base has content (check Supabase)
3. Make sure embeddings are enabled
4. Add MORE content - the more the better!

See `TRAIN_CHATBOT.md` for detailed instructions.
