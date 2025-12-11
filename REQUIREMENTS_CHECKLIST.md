# Chatbot Requirements Checklist

Everything you need to run the chatbot - complete checklist.

## Required to Run

### 1. Node.js & npm
```bash
# Check if installed
node --version  # Should be v18+ or v20+
npm --version   # Should be 6+
```

**If not installed:**
- Download from: https://nodejs.org/
- Or: `brew install node` (Mac)

### 2. Environment Variables (.env file)

Create `.env` file in project root with:

```bash
# Required
OPENAI_API_KEY=sk-...                    # Get from https://platform.openai.com/api-keys
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...         # Get from Supabase Dashboard → Settings → API

# Optional but Recommended
KNOWLEDGE_WITH_EMBEDDINGS=1              # Enable smart search (recommended)
PORT=3001                                # Server port (default: 3000)
ALLOWED_ORIGINS=https://client1.com,https://client2.com  # CORS domains

# Optional - For Real-Time Fetching
WEBSITE_URL=https://www.cccp.com        # Your website URL for real-time lookups
```

### 3. Supabase Setup

**Required:**
- ✅ Supabase account (free tier works)
- ✅ Project created
- ✅ `knowledge_base` table created (run `docs/supabase_schema.sql`)
- ✅ `conversations` table created (run `docs/supabase_conversation_memory.sql`)
- ✅ pgvector extension enabled (for embeddings)

**How to set up:**
1. Go to https://supabase.com
2. Create account/project
3. Run SQL from `docs/supabase_schema.sql`
4. Run SQL from `docs/supabase_conversation_memory.sql`
5. Enable pgvector extension (Database → Extensions → vector)

### 4. Dependencies

**Install:**
```bash
npm install
```

**Required packages (auto-installed):**
- express
- openai
- @supabase/supabase-js
- dotenv
- uuid
- body-parser
- node-fetch
- jsdom

### 5. Knowledge Base Content

**Options:**
- ✅ Scrape website: `SITE_BASE_URL=https://www.cccp.com npm run build-kb:supabase:embed`
- ✅ Manual entry via Supabase Dashboard
- ✅ Use scripts to add content

**Minimum:** At least some content in `knowledge_base` table

## Optional but Recommended

### Embeddings
- Set `KNOWLEDGE_WITH_EMBEDDINGS=1` in `.env`
- Rebuild knowledge base with embeddings
- Makes search much smarter

### Real-Time Fetching
- Already implemented in your code!
- Fetches business info from website in real-time
- No additional setup needed

## Quick Start Checklist

### Initial Setup
- [ ] Node.js installed
- [ ] npm installed
- [ ] `.env` file created with required variables
- [ ] Supabase account created
- [ ] Supabase tables created (knowledge_base, conversations)
- [ ] pgvector extension enabled
- [ ] Dependencies installed (`npm install`)

### Knowledge Base
- [ ] Knowledge base populated (scraped or manual)
- [ ] Embeddings enabled (if using)
- [ ] Content verified in Supabase

### Testing
- [ ] Server starts: `npm run dev`
- [ ] See: `[KB] Loaded X chunks from Supabase`
- [ ] Can access: `http://localhost:3001`
- [ ] Chatbot widget appears
- [ ] Can send messages and get responses

## Running the Chatbot

### Development
```bash
npm run dev
```
- Runs on http://localhost:3001 (or PORT from .env)
- Auto-restarts on file changes

### Production
```bash
npm start
```
- Runs on PORT from .env (default: 3000)
- No auto-restart

### With PM2 (Recommended for Production)
```bash
npm install -g pm2
pm2 start api/server.js --name chatbot
pm2 save
pm2 startup
```

## Deployment Requirements

### For Vercel/Netlify
- [ ] Push code to GitHub
- [ ] Set environment variables in platform
- [ ] Deploy

**Required env vars:**
- OPENAI_API_KEY
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- KNOWLEDGE_WITH_EMBEDDINGS (optional)
- ALLOWED_ORIGINS (optional)

### For Your Own Server
- [ ] Node.js installed on server
- [ ] Environment variables set
- [ ] Port opened in firewall
- [ ] Process manager (PM2) set up
- [ ] Domain pointing to server (optional)

## What Breaks If Missing

### Missing OPENAI_API_KEY
- ❌ Chatbot won't respond
- ❌ Error: "OpenAI API key required"

### Missing Supabase Credentials
- ⚠️ Falls back to local file
- ⚠️ No conversation memory
- ⚠️ Knowledge base might not load

### Missing Knowledge Base
- ⚠️ Chatbot uses only general knowledge
- ⚠️ Can't answer business-specific questions
- ⚠️ Lower confidence scores

### Missing Dependencies
- ❌ Server won't start
- ❌ Error: "Cannot find module"

## Maintenance Requirements

### Regular Updates
- [ ] Keep knowledge base updated
- [ ] Update business hours if they change
- [ ] Add new services/products
- [ ] Monitor API usage/costs

### Monitoring
- [ ] Check server logs regularly
- [ ] Monitor OpenAI API costs
- [ ] Check Supabase usage
- [ ] Test chatbot responses

## Cost Estimates

### OpenAI API
- GPT-4o-mini: ~$0.15 per 1M input tokens
- GPT-4o: ~$2.50 per 1M input tokens
- Embeddings: ~$0.02 per 1M tokens

**Typical usage:** $5-50/month depending on traffic

### Supabase
- Free tier: 500MB database, 2GB bandwidth
- Usually enough for small-medium chatbots

**Typical cost:** $0/month (free tier) or $25/month (Pro)

## Troubleshooting

### Server won't start
- Check: Node.js installed?
- Check: Dependencies installed? (`npm install`)
- Check: Port available? (not in use)
- Check: `.env` file exists?

### Chatbot not responding
- Check: OPENAI_API_KEY set?
- Check: Server logs for errors
- Check: Network connectivity

### Knowledge base not loading
- Check: Supabase credentials correct?
- Check: Tables exist in Supabase?
- Check: Content in knowledge_base table?
- Check: Server logs for `[KB]` messages

### Real-time fetching not working
- Check: WEBSITE_URL set in .env?
- Check: Website is accessible?
- Check: Server logs for `[FETCH]` messages

## Summary

**Minimum to Run:**
1. ✅ Node.js + npm
2. ✅ .env with OPENAI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
3. ✅ Supabase tables created
4. ✅ Knowledge base has content
5. ✅ Dependencies installed

**That's it!** Everything else is optional.

Run `npm run dev` and you're good to go! 🚀
