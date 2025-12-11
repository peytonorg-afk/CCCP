# Real-Time Website Fetching - How It Works

## What It Does

Your chatbot now **automatically fetches information from your website in real-time** when users ask business questions, just like a person would check the website!

## How It Works

### When It Fetches

The chatbot automatically fetches from your website when users ask about:
- Hours ("are you open?", "can I stop in today?")
- Location/Address
- Phone number
- Walk-ins
- Contact information

### What It Fetches

1. **Checks multiple pages:**
   - `/contact`
   - `/about`
   - Homepage
   - `/location`

2. **Extracts information:**
   - Business hours (Monday-Friday 9am-6pm, etc.)
   - Phone numbers
   - Addresses
   - Walk-in policies

3. **Uses the information:**
   - Adds it to the context
   - Answers questions directly
   - Provides current, accurate information

## Example

**User asks:** "Can I just stop in today?"

**Chatbot:**
1. Detects it's a business hours question
2. Fetches from `https://www.cccp.com/contact`
3. Extracts hours, address, walk-in info
4. Answers: "Yes! We're open Monday-Friday 8am-5pm. Walk-ins welcome!"

**No manual training needed!** ✅

## Configuration

### Set Your Website URL

In `.env` file (optional):
```bash
WEBSITE_URL=https://www.cccp.com
```

If not set, defaults to `https://www.cccp.com`

## How It's Different from Knowledge Base

### Knowledge Base (Static)
- Scraped once
- Stored in Supabase
- Fast to search
- May be outdated

### Real-Time Fetching (Dynamic)
- Fetched on-demand
- Always current
- Works for business info questions
- Slower (but worth it for accuracy)

## Benefits

✅ **Always Current** - Gets latest info from website
✅ **No Manual Updates** - Automatically checks website
✅ **Works Like a Person** - Actually looks up the info
✅ **Handles Any Question** - Not limited to what's in knowledge base

## When It's Used

The chatbot uses real-time fetching when:
- Question is about hours, location, contact info
- Knowledge base doesn't have good results
- User asks "can I stop in today?" type questions

## Performance

- **First fetch:** ~1-2 seconds
- **Cached:** Instant (if same question asked again)
- **Timeout:** 5 seconds max per page

## Troubleshooting

### Not Fetching?

Check server logs for:
```
[FETCH] Fetching business info from website in real-time...
[FETCH] ✅ Fetched business info from website
```

If you see errors:
- Check website is accessible
- Verify `WEBSITE_URL` in `.env`
- Check network/firewall settings

### Not Finding Info?

The extraction looks for common patterns:
- Hours: "Monday-Friday 9am-6pm"
- Phone: "(555) 123-4567"
- Address: "123 Main Street"

If your website uses different formats, the patterns might need adjustment.

## Summary

✅ **Real-time fetching is enabled!**
✅ **Automatically checks website for business info**
✅ **No need to manually add every question**
✅ **Works like a person checking the website**

Your chatbot now fetches information dynamically, just like a real person would! 🎯
