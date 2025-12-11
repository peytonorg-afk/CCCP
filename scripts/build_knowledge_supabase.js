import "dotenv/config";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const BASE = process.env.SITE_BASE_URL || "https://example.com";
const WITH_EMB = process.env.KNOWLEDGE_WITH_EMBEDDINGS === "1";
const openai = WITH_EMB ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

// Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials!");
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function getSitemapUrls() {
  const candidates = [`${BASE}/sitemap.xml`, `${BASE}/sitemap_index.xml`];
  for (const u of candidates) {
    try {
      const r = await fetch(u);
      if (!r.ok) continue;
      const xml = await r.text();
      const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]).filter(x => x.startsWith(BASE));
      
      // Filter out sitemap XML files (WordPress sitemaps)
      const pageUrls = urls.filter(url => 
        !url.includes('/sitemap') && 
        !url.endsWith('.xml') &&
        !url.includes('wp-sitemap')
      );
      
      if (pageUrls.length) return pageUrls;
      
      // If we got sitemap XML files, try to parse them recursively
      const sitemapFiles = urls.filter(url => url.includes('sitemap') && url.endsWith('.xml'));
      if (sitemapFiles.length > 0) {
        const allUrls = new Set();
        for (const sitemapFile of sitemapFiles.slice(0, 10)) { // Limit to avoid too many requests
          try {
            const sitemapRes = await fetch(sitemapFile);
            if (sitemapRes.ok) {
              const sitemapXml = await sitemapRes.text();
              const pageUrls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1])
                .filter(x => x.startsWith(BASE) && !x.endsWith('.xml') && !x.includes('/sitemap'));
              pageUrls.forEach(url => allUrls.add(url));
            }
          } catch {}
        }
        if (allUrls.size > 0) return Array.from(allUrls);
      }
    } catch {}
  }
  return [BASE, `${BASE}/pricing`, `${BASE}/faq`, `${BASE}/contact`, `${BASE}/about`];
}

function cleanText(html) {
  const dom = new JSDOM(html);
  ["script", "style", "noscript", "header", "footer", "nav"].forEach(sel => {
    dom.window.document.querySelectorAll(sel).forEach(n => n.remove());
  });
  return (dom.window.document.body?.textContent || "").replace(/\s+/g, " ").trim();
}

function chunkText(text, maxTokens = 450, overlap = 70) {
  const words = text.split(" ");
  const chunks = [];
  let i = 0,
    step = maxTokens - overlap;
  while (i < words.length) {
    const slice = words.slice(i, i + maxTokens);
    if (slice.join(" ").trim().length < 200) break;
    chunks.push(slice.join(" ").trim());
    i += step;
  }
  return chunks.slice(0, 30);
}

async function embedBatch(texts) {
  const res = await openai.embeddings.create({ model: "text-embedding-3-small", input: texts });
  return res.data.map(d => d.embedding);
}

(async () => {
  console.log("🚀 Starting knowledge base build for Supabase...");
  console.log(`📡 Scraping: ${BASE}`);
  console.log(`🔍 Embeddings: ${WITH_EMB ? "Enabled" : "Disabled"}`);

  // Clear existing data (optional - comment out if you want to keep old data)
  const { error: deleteError } = await supabase.from("knowledge_base").delete().neq("id", "");
  if (deleteError) {
    console.warn("⚠️  Could not clear existing data:", deleteError.message);
  } else {
    console.log("🗑️  Cleared existing knowledge base");
  }

  const urls = await getSitemapUrls();
  console.log(`📋 Found ${urls.length} URLs to process\n`);

  let totalChunks = 0;

  for (const url of urls) {
    try {
      const r = await fetch(url, { redirect: "follow" });
      if (!r.ok) {
        console.warn(`⚠️  Skipping ${url}: HTTP ${r.status}`);
        continue;
      }
      const html = await r.text();
      const title = (html.match(/<title>(.*?)<\/title>/i)?.[1] || url).trim();
      const text = cleanText(html);
      const chunks = chunkText(text);

      if (chunks.length === 0) {
        console.warn(`⚠️  No content extracted from ${url}`);
        continue;
      }

      let embeddings = [];
      if (WITH_EMB && chunks.length) {
        console.log(`  🔄 Generating embeddings for ${chunks.length} chunks...`);
        embeddings = await embedBatch(chunks);
      }

      // Insert chunks into Supabase
      const rows = chunks.map((content, idx) => {
        const row = {
          id: `${new URL(url).pathname || "/"}#${idx + 1}`,
          url,
          title,
          content,
        };
        if (WITH_EMB && embeddings[idx]) {
          row.embedding = embeddings[idx];
        }
        return row;
      });

      const { error } = await supabase.from("knowledge_base").upsert(rows, {
        onConflict: "id",
      });

      if (error) {
        console.error(`❌ Error inserting ${url}:`, error.message);
      } else {
        console.log(`✅ Processed ${url} → ${chunks.length} chunks`);
        totalChunks += chunks.length;
      }
    } catch (e) {
      console.warn(`⚠️  Skipping ${url}: ${e.message}`);
    }
  }

  console.log(`\n✨ Done! Inserted ${totalChunks} chunks into Supabase knowledge_base table`);
  console.log(`🔗 View in Supabase dashboard: ${supabaseUrl.replace("/rest/v1", "")}/project/_/editor`);
})();


