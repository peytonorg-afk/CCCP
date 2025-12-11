# Fix Stupid Chatbot Responses - Step by Step

## The Problem

Your chatbot is giving stupid/generic responses because:
1. ❌ Knowledge base has wrong content (AV services instead of your business)
2. ❌ Not enough content about YOUR business
3. ❌ Content is too vague or generic

## The Solution: Add YOUR Business Content

### Step 1: Check What's Currently in Knowledge Base

1. Go to **Supabase Dashboard** → **Table Editor** → **knowledge_base**
2. Look at what content is there
3. If it's about the wrong business (like AV services), you need to replace it

### Step 2: Add YOUR Business Information

#### Option A: Replace Everything (If Wrong Content)

**If your knowledge base has wrong content:**

1. **Clear the old content:**
   - In Supabase, select all rows and delete them
   - OR run: `DELETE FROM knowledge_base;` in SQL Editor

2. **Add YOUR business content:**
   - Click "Insert row" for each piece of information

#### Option B: Add to Existing (If Some Content is Good)

Just add new rows with your business information.

### Step 3: What Content to Add

Add these entries (be SPECIFIC):

#### 1. Services/What You Do
```
id: services
title: Our Services
content: [WRITE EXACTLY WHAT YOU DO - BE VERY SPECIFIC]

Example:
"We offer MacBook and iPhone repair services. We repair:
- MacBook screen replacement ($250-$400)
- MacBook battery replacement ($120-$200)
- iPhone screen repair ($100-$200)
- iPhone battery replacement ($80-$150)
- Same-day service available for most repairs"
```

#### 2. Contact Information
```
id: contact
title: Contact Us
content: [YOUR ACTUAL CONTACT INFO]

Example:
"We're located at 123 Main Street, City, State 12345.
Open Monday-Friday 9am-6pm, Saturday 10am-4pm.
Phone: (555) 123-4567
Email: info@yoursite.com
Website: https://yoursite.com"
```

#### 3. Pricing (If You Have It)
```
id: pricing
title: Pricing
content: [YOUR ACTUAL PRICES - BE SPECIFIC]

Example:
"MacBook screen replacement: $250-$400 depending on model
MacBook battery: $120-$200
iPhone screen: $100-$200
iPhone battery: $80-$150
Free diagnostic service available"
```

#### 4. Location/Hours
```
id: location-hours
title: Location & Hours
content: [YOUR LOCATION AND HOURS]

Example:
"Located at 123 Main Street, City, State 12345.
Open Monday-Friday 9am-6pm, Saturday 10am-4pm.
Closed Sundays. Free parking available."
```

#### 5. Policies
```
id: policies
title: Our Policies
content: [YOUR POLICIES]

Example:
"All repairs come with a 90-day warranty on parts and labor.
We accept cash, credit cards, and Apple Pay.
Turnaround time: Most repairs completed same-day.
Free diagnostic service for all devices."
```

### Step 4: Enable Embeddings

**In `.env` file:**
```bash
KNOWLEDGE_WITH_EMBEDDINGS=1
```

### Step 5: Rebuild Knowledge Base (If You Have a Website)

If your business has a website with this information:

```bash
SITE_BASE_URL=https://your-actual-business-website.com npm run build-kb:supabase:embed
```

This will:
- Scrape your website
- Extract all content
- Generate embeddings
- Replace old content with YOUR content

### Step 6: Restart Server

```bash
npm run dev
```

### Step 7: Test

Ask these questions:
- "What services do you offer?"
- "What are your hours?"
- "How much does [service] cost?"
- "Where are you located?"

**The chatbot should now use YOUR information!**

---

## Why It Was Giving Stupid Responses

1. **Wrong Content:** Knowledge base had AV services content, not your business
2. **Generic Responses:** No specific information about YOUR business
3. **Using General Knowledge:** When knowledge base didn't have info, it guessed

## After Training

✅ Chatbot uses YOUR business information  
✅ Answers are specific and accurate  
✅ No more generic/stupid responses  
✅ Confidence scores improve  

---

## Quick Checklist

- [ ] Checked what's in knowledge base
- [ ] Added YOUR business services
- [ ] Added YOUR contact information
- [ ] Added YOUR pricing (if applicable)
- [ ] Added YOUR location/hours
- [ ] Enabled embeddings (`KNOWLEDGE_WITH_EMBEDDINGS=1`)
- [ ] Rebuilt knowledge base (if using website)
- [ ] Restarted server
- [ ] Tested with real questions
- [ ] Responses are now accurate!

---

## Still Not Working?

1. **Check server logs** - Look for `[SEARCH]` messages
2. **Verify content** - Make sure Supabase has YOUR content
3. **Test confidence** - Should be > 0.6 for good answers
4. **Add more content** - More detail = better answers

See `TRAIN_CHATBOT.md` for more detailed training guide.
