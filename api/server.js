import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const ALLOWED = (process.env.ALLOWED_ORIGINS || "").split(",").map(s=>s.trim()).filter(Boolean);
const USE_VECTORS = process.env.KNOWLEDGE_WITH_EMBEDDINGS === "1";

app.use(bodyParser.json());
app.use((req,res,next)=>{
  const origin = req.headers.origin || "";
  // Allow requests without Origin (same-origin or server-to-server)
  if (!origin) return next();
  if (!ALLOWED.length || ALLOWED.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    if (req.method === "OPTIONS") return res.sendStatus(200);
    return next();
  }
  return res.status(403).json({ error: "Origin not allowed" });
});
app.use("/widget", express.static(path.join(__dirname, "..", "widget")));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- Initialize Supabase (if credentials provided)
let supabase = null;
const USE_SUPABASE = !!(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY));
if (USE_SUPABASE) {
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  supabase = createClient(process.env.SUPABASE_URL, supabaseKey);
  console.log("[KB] Supabase connected. Knowledge base will be loaded from database.");
} else {
  console.warn("[KB] Supabase not configured. Falling back to local file.");
}

// --- Load knowledge base (fallback to local file if Supabase not available)
const KB_PATH = path.resolve(__dirname, "..", "docs", "knowledge.jsonl");
let KB_ROWS = [];
let KB_LOADED = false;

async function loadKnowledgeBase() {
  if (USE_SUPABASE && supabase) {
    try {
      const { data, error } = await supabase.from("knowledge_base").select("*");
      if (error) {
        console.error("[KB] Supabase query error:", error.message);
        console.warn("[KB] Falling back to local file...");
      } else if (data && data.length > 0) {
        KB_ROWS = data;
        KB_LOADED = true;
        console.log(`[KB] Loaded ${KB_ROWS.length} chunks from Supabase`);
        return;
      } else {
        console.warn("[KB] Supabase table is empty. Falling back to local file...");
      }
    } catch (e) {
      console.error("[KB] Supabase connection error:", e.message);
      console.warn("[KB] Falling back to local file...");
    }
  }
  
  // Fallback to local file
  try {
    if (fs.existsSync(KB_PATH)) {
      KB_ROWS = fs.readFileSync(KB_PATH, "utf8").split("\n").filter(Boolean).map(JSON.parse);
      KB_LOADED = true;
      console.log(`[KB] Loaded ${KB_ROWS.length} chunks from docs/knowledge.jsonl`);
    } else {
      console.warn("[KB] No knowledge.jsonl found. Continuing without KB.");
    }
  } catch (e) {
    console.error("[KB] Failed to load knowledge:", e.message);
  }
}

// Load knowledge base on startup (will be called before server starts)

// --- Retrieval helpers
function scoreKeyword(q, text){
  const qTerms = q.toLowerCase().split(/\W+/).filter(Boolean);
  const t = text.toLowerCase();
  let score = 0;
  for (const term of qTerms) score += Math.min((t.split(term).length - 1), 5);
  return score;
}
async function retrieveKeyword(q, k=6){
  if (USE_SUPABASE && supabase) {
    try {
      // Fetch all rows and do keyword matching (simple approach)
      // For better performance with large datasets, consider using Supabase full-text search
      const { data, error } = await supabase
        .from("knowledge_base")
        .select("*")
        .limit(1000); // Increased limit to search more content
      
      if (error) {
        console.warn("[KB] Supabase query error:", error.message);
        // Fallback to in-memory search
      } else if (data && data.length > 0) {
        const arr = data.map(r => ({
          r, s: scoreKeyword(q, (r.title || "") + " " + r.content.slice(0,1500))
        }));
        arr.sort((a,b)=>b.s-a.s);
        return arr.filter(x=>x.s>0).slice(0,k).map(x=>x.r);
      }
    } catch (e) {
      console.warn("[KB] Supabase search failed:", e.message);
    }
  }
  
  // Fallback to in-memory search
  if (!KB_ROWS.length) return [];
  const arr = KB_ROWS.map(r => ({
    r, s: scoreKeyword(q, (r.title || "") + " " + r.content.slice(0,1500))
  }));
  arr.sort((a,b)=>b.s-a.s);
  return arr.filter(x=>x.s>0).slice(0,k).map(x=>x.r);
}
function cosine(a,b){
  let dot=0,na=0,nb=0;
  for (let i=0;i<a.length;i++){ dot+=a[i]*b[i]; na+=a[i]*a[i]; nb+=b[i]*b[i]; }
  return dot / (Math.sqrt(na)*Math.sqrt(nb)+1e-9);
}
async function retrieveVector(q, k=6){
  if (USE_SUPABASE && supabase && USE_VECTORS) {
    try {
      // Generate query embedding
      const e = await openai.embeddings.create({ model: "text-embedding-3-small", input: q });
      const qv = e.data[0].embedding;
      
      // Use Supabase vector similarity search
      const { data, error } = await supabase.rpc("match_documents", {
        query_embedding: qv,
        match_threshold: 0.5,
        match_count: k
      });
      
      if (error) {
        // If RPC doesn't exist, fall back to manual search
        const { data: allData } = await supabase
          .from("knowledge_base")
          .select("*")
          .not("embedding", "is", null)
          .limit(100);
        
        if (allData && allData.length > 0) {
          const scored = allData.map(r => ({
            r,
            s: cosine(qv, r.embedding)
          }));
          scored.sort((a, b) => b.s - a.s);
          return scored.slice(0, k).map(x => x.r);
        }
      } else if (data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn("[KB] Supabase vector search failed:", e.message);
    }
  }
  
  // Fallback to in-memory search
  if (!KB_ROWS.length) return [];
  const vecRows = KB_ROWS.filter(r=>Array.isArray(r.embedding));
  if (!vecRows.length) return [];
  const e = await openai.embeddings.create({ model: "text-embedding-3-small", input: q });
  const qv = e.data[0].embedding;
  const scored = vecRows.map(r=>({ r, s: cosine(qv, r.embedding) }));
  scored.sort((a,b)=>b.s-a.s);
  return scored.slice(0,k).map(x=>x.r);
}
function dedupById(list){
  const seen = new Set();
  const out = [];
  for (const r of list) { if (!seen.has(r.id)) { seen.add(r.id); out.push(r);} }
  return out;
}
function estimateConfidence(passages){
  if (!passages.length) return 0.3;
  
  // Improved confidence: considers both passage count and content quality
  const passageCount = Math.min(passages.length, 3);
  const avgLength = passages.slice(0, 3).reduce((sum, p) => sum + (p.content?.length || 0), 0) / passageCount;
  const lengthScore = Math.min(avgLength / 600, 1);
  
  // Higher confidence if we have multiple relevant passages
  const countScore = Math.min(passageCount / 3, 1);
  
  // Combined score: more passages + longer content = higher confidence
  return Math.max(0.3, Math.min(0.95, 0.4 + 0.3 * lengthScore + 0.25 * countScore));
}

// --- Conversation Memory Helpers
async function getConversationHistory(sessionId, limit = 20) {
  if (!USE_SUPABASE || !supabase) {
    return []; // No memory if Supabase not configured
  }
  
  try {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .limit(limit);
    
    if (error) {
      console.warn("[MEMORY] Failed to retrieve conversation history:", error.message);
      return [];
    }
    
    return data || [];
  } catch (e) {
    console.warn("[MEMORY] Error retrieving conversation history:", e.message);
    return [];
  }
}

async function saveMessage(sessionId, role, message, metadata = null) {
  if (!USE_SUPABASE || !supabase) {
    return; // Skip saving if Supabase not configured
  }
  
  try {
    const { error } = await supabase
      .from("conversations")
      .insert({
        session_id: sessionId,
        role: role,
        message: message,
        metadata: metadata
      });
    
    if (error) {
      console.warn("[MEMORY] Failed to save message:", error.message);
    }
  } catch (e) {
    console.warn("[MEMORY] Error saving message:", e.message);
  }
}

// --- Rate limit (very simple)
const buckets = new Map();
function rateLimit(key, limit=20, windowMs=5*60*1000){
  const now=Date.now();
  const b = buckets.get(key) || { tokens: limit, reset: now+windowMs };
  if (now > b.reset) { b.tokens = limit; b.reset = now+windowMs; }
  if (b.tokens <= 0) return false;
  b.tokens -= 1; buckets.set(key,b); return true;
}

// --- Routes
app.post("/api/chat", async (req,res)=>{
  try {
    const ip = req.headers["x-forwarded-for"]?.toString().split(",")[0] || req.socket.remoteAddress || "ip";
    if (!rateLimit(ip)) return res.status(429).json({ reply: "Too many requests, please wait a moment." });

    const { message, sessionId } = req.body || {};
    const sid = sessionId || uuidv4();
    if (!message || typeof message !== "string" || message.length > 4000) {
      return res.status(400).json({ reply: "Please send a shorter message." });
    }

    // Retrieve conversation history for context
    const history = await getConversationHistory(sid, 20);

    // Check if this is a business info question that might need real-time lookup
    const needsBusinessInfo = message.toLowerCase().match(/\b(hours?|open|closed|walk.?in|stop.?in|visit|location|address|phone|contact|today|now|when|where|located)\b/);
    
    let kw = await retrieveKeyword(message, 6);
    let vec = USE_VECTORS ? await retrieveVector(message, 6) : [];
    let passages = dedupById([...(vec||[]), ...kw]).slice(0,6);
    let confidence = estimateConfidence(passages);
    
    // Real-time website fetching for business info questions (like checking hours)
    // Always try to fetch if it's a business info question, even if we have some results
    if (needsBusinessInfo) {
      try {
        console.log("[FETCH] Fetching business info from website in real-time...");
        const websiteUrl = process.env.WEBSITE_URL || "https://www.cccp.com";
        const contactPages = [`${websiteUrl}/contact`, `${websiteUrl}/about`, `${websiteUrl}`, `${websiteUrl}/location`];
        
        for (const contactUrl of contactPages) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            const response = await fetch(contactUrl, {
              headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Chatbot/1.0)' },
              signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
              const html = await response.text();
              const dom = new JSDOM(html);
              const bodyText = dom.window.document.body?.textContent || "";
              
              // Extract business hours (look for patterns like "Monday-Friday 9am-6pm")
              const hoursPatterns = [
                /(?:hours?|open|closed)[\s:]*([^.!?]{50,300})/gi,
                /(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun)[\s\S]{0,200}(?:am|pm|\d{1,2}:\d{2})/gi,
                /\d{1,2}(?::\d{2})?\s*(?:am|pm)\s*[-–]\s*\d{1,2}(?::\d{2})?\s*(?:am|pm)/gi
              ];
              
              let hoursText = '';
              for (const pattern of hoursPatterns) {
                const matches = bodyText.match(pattern);
                if (matches && matches.length > 0) {
                  hoursText = matches.slice(0, 3).join(' ').substring(0, 300);
                  break;
                }
              }
              
              // Extract phone number
              const phonePattern = /(?:phone|call|tel)[\s:]*[^\d]*((?:\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{10}))/gi;
              const phoneMatch = bodyText.match(phonePattern);
              const phone = phoneMatch ? phoneMatch[0].substring(0, 50) : '';
              
              // Extract address - improved patterns with better matching
              const addressPatterns = [
                // Full address with street, city, state, zip
                /(\d+\s+[\w\s,]+(?:street|st|avenue|ave|road|rd|drive|dr|boulevard|blvd|way|lane|ln|court|ct|plaza|pl)[\s\w,]+(?:,\s*[A-Z][a-z]+)?(?:,\s*[A-Z]{2})?(?:\s+\d{5})?)/gi,
                // "Address:" or "Location:" followed by address
                /(?:address|location|located at|find us at)[\s:]*([^\n\.]{15,200})/gi,
                // Street number followed by street name and city
                /(\d+\s+[A-Za-z0-9\s,]+(?:,\s*[A-Z][a-z]+){1,2}(?:,\s*[A-Z]{2})?(?:\s+\d{5})?)/g,
                // Look for common address formats
                /([A-Z][a-z]+\s+(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Boulevard|Blvd|Way|Lane|Ln|Court|Ct)[\s,]+[A-Z][a-z]+(?:,\s*[A-Z]{2})?)/g
              ];
              
              let address = '';
              for (const pattern of addressPatterns) {
                const matches = bodyText.match(pattern);
                if (matches) {
                  // Find the longest match (most likely to be complete address)
                  const bestMatch = matches.reduce((a, b) => a.length > b.length ? a : b);
                  const cleaned = bestMatch.replace(/(?:address|location|located at|find us at)[\s:]*/gi, '').trim();
                  if (cleaned.length > 15 && cleaned.length < 200) {
                    address = cleaned.substring(0, 150);
                    break;
                  }
                }
              }
              
              // Also try to find address in structured format (like in contact sections)
              if (!address) {
                const contactSection = bodyText.match(/(?:contact|location|address|visit us)[\s\S]{0,500}/i);
                if (contactSection) {
                  const addrInSection = contactSection[0].match(/\d+\s+[\w\s,]+(?:street|st|avenue|ave|road|rd)[\s\w,]+/i);
                  if (addrInSection && addrInSection[0].length > 10) {
                    address = addrInSection[0].trim().substring(0, 150);
                  }
                }
              }
              
              // Build content
              let fetchedContent = '';
              if (hoursText) fetchedContent += `Business Hours: ${hoursText}\n`;
              if (phone) fetchedContent += `Phone: ${phone}\n`;
              if (address) fetchedContent += `Address: ${address}\n`;
              
              // Also look for "walk-in" or "appointment" info
              const walkInMatch = bodyText.match(/(?:walk[- ]?in|walk[- ]?ins|drop[- ]?in|stop[- ]?by)[\s\w]{0,100}/gi);
              if (walkInMatch) {
                fetchedContent += `Walk-ins: ${walkInMatch[0].substring(0, 100)}\n`;
              }
              
              if (fetchedContent.trim()) {
                const tempPassage = {
                  id: `fetched-${Date.now()}`,
                  url: contactUrl,
                  title: "Current Business Information (Live)",
                  content: fetchedContent.trim()
                };
                // Put fetched content FIRST so it's prioritized
                passages = [tempPassage, ...passages].slice(0, 6);
                confidence = Math.max(confidence, 0.8);
                console.log("[FETCH] ✅ Fetched business info from website:", fetchedContent.substring(0, 100));
                break; // Found info, stop searching
              }
            }
          } catch (pageError) {
            continue; // Try next page
          }
        }
      } catch (e) {
        console.log("[FETCH] Could not fetch from website:", e.message);
      }
    }
    
    // Always log search results for debugging
    console.log(`[SEARCH] Query: "${message}"`);
    console.log(`[SEARCH] Embeddings enabled: ${USE_VECTORS}`);
    console.log(`[SEARCH] Keyword results: ${kw.length}, Vector results: ${vec.length}`);
    console.log(`[SEARCH] Total passages: ${passages.length}, Confidence: ${confidence.toFixed(2)}`);
    if (passages.length > 0) {
      console.log(`[SEARCH] Top passage: "${passages[0].title}" (${passages[0].content.slice(0, 100)}...)`);
    } else {
      console.log(`[SEARCH] ⚠️  No passages found! This is why confidence is low.`);
    }

    // Build context from knowledge base (if available)
    const context = passages.length > 0 
      ? passages.map((p,i)=>`[${i+1}] ${p.title} — ${p.url}\n• ${p.content.slice(0,600)}`).join("\n\n")
      : "";

    // Direct, helpful system prompt: Answer questions, no fluff
    const system = `You are a helpful customer service assistant. Answer questions directly and concisely.

CRITICAL RULES:
1. If Context has the information (address, hours, phone), PROVIDE IT DIRECTLY. Just state the facts - no extra phrases!
2. If Context doesn't have the answer, USE YOUR GENERAL KNOWLEDGE to provide helpful information. NEVER mention "context", "not provided", "check the website", or "contact us" - just answer helpfully!
3. BE PROACTIVE: Answer questions directly. Don't just say "contact us" - actually help!
4. For return policies: Provide general helpful info (typical return windows like 14-30 days, conditions like original packaging, etc.) even if Context doesn't have specifics. NEVER say "check the website" or "not provided in context"!
5. For location: If Context has address, say "We're located at [address]." - that's it!
6. For hours: If Context has hours, say "We're open [hours]." - be direct!
7. MAXIMUM 60 words. Be brief and direct. No unnecessary closing phrases or fluff.
8. BANNED PHRASES: "not provided in context", "check the website", "contact us for", "not available in context" - NEVER use these!

TONE: Helpful, direct, friendly. Just answer the question using your knowledge - no deflections, no mentions of context, no "check the website".`;

    // Only trigger handoff if we truly can't help - be more lenient to allow general knowledge answers
    // Only handoff if confidence is very low AND no context AND it's a business-specific question
    const isBusinessSpecific = message.toLowerCase().match(/\b(your|you|we|our|company|business|store|location|hours|contact|phone|email|address)\b/);
    if (confidence < 0.25 && passages.length === 0 && isBusinessSpecific) {
      await saveMessage(sid, "user", message);
      return res.json({
        reply: "I might not have the exact info yet. Could I get your name and email so a teammate can follow up?",
        confidence,
        handoffSuggested: true,
        sessionId: sid
      });
    }
    const chat = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      max_tokens: 150,
      messages: (() => {
        const msgs = [{ role: "system", content: system }];
        const recentHistory = history.slice(-10);
        for (const h of recentHistory) {
          msgs.push({ role: h.role, content: h.message });
        }
        // Include context only if we have it
        const userMessage = context 
          ? `Context:\n${context}\n\nUser: ${message}`
          : `User: ${message}`;
        msgs.push({ role: "user", content: userMessage });
        return msgs;
      })()
    });
    const reply = chat.choices[0]?.message?.content?.trim() || "Sorry, I'm not sure yet.";

    // Save both user message and assistant reply to conversation history
    await saveMessage(sid, "user", message);
    await saveMessage(sid, "assistant", reply, {
      confidence,
      sources: passages.map((p,i)=>({ i:i+1, title:p.title, url:p.url }))
    });
    res.json({
      reply,
      confidence,
      handoffSuggested: false,
      sources: passages.map((p,i)=>({ i:i+1, title:p.title, url:p.url })),
      sessionId: sid
    });
  } catch (e) {
    console.error("CHAT ERROR", e);
    res.status(500).json({ reply: "Oops—something went wrong. Can I get your name and email so we can follow up?" });
  }
});

app.post("/api/lead", async (req,res)=>{
  const { name, email, message } = req.body || {};
  if (!name || !email) return res.status(400).json({ ok:false, error:"Missing name or email" });
  console.log(`[LEAD] ${new Date().toISOString()} name="${name}" email="${email}" msg="${(message||"").slice(0,200)}"`);
  // TODO: replace with SMTP or CRM webhook
  res.json({ ok:true });
});

app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// Start server after loading knowledge base
(async () => {
  await loadKnowledgeBase();
  app.listen(PORT, ()=> console.log(`Chat API running on http://localhost:${PORT}`));
})();
