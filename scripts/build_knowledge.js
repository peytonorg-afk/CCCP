import "dotenv/config";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import OpenAI from "openai";

const BASE = process.env.SITE_BASE_URL || "https://example.com";
const OUT = path.resolve("docs/knowledge.jsonl");
const WITH_EMB = process.env.KNOWLEDGE_WITH_EMBEDDINGS === "1";
const openai = WITH_EMB ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

async function getSitemapUrls(){
  const candidates = [`${BASE}/sitemap.xml`, `${BASE}/sitemap_index.xml`];
  for (const u of candidates) {
    try { const r=await fetch(u); if(!r.ok) continue;
      const xml=await r.text(); const urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]).filter(x=>x.startsWith(BASE));
      if (urls.length) return urls;
    } catch {}
  }
  return [BASE, `${BASE}/pricing`, `${BASE}/faq`, `${BASE}/contact`, `${BASE}/about`];
}
function cleanText(html){
  const dom = new JSDOM(html);
  ["script","style","noscript","header","footer","nav"].forEach(sel=>{
    dom.window.document.querySelectorAll(sel).forEach(n=>n.remove());
  });
  return (dom.window.document.body?.textContent || "").replace(/\s+/g," ").trim();
}
function chunkText(text, maxTokens=450, overlap=70){
  const words = text.split(" ");
  const chunks = []; let i=0, step=maxTokens-overlap;
  while(i<words.length){
    const slice = words.slice(i, i+maxTokens);
    if (slice.join(" ").trim().length < 200) break;
    chunks.push(slice.join(" ").trim());
    i += step;
  }
  return chunks.slice(0,30);
}
async function embedBatch(texts){
  const res = await openai.embeddings.create({ model:"text-embedding-3-small", input:texts });
  return res.data.map(d=>d.embedding);
}

(async ()=>{
  const urls = await getSitemapUrls();
  fs.mkdirSync(path.dirname(OUT), { recursive:true });
  const out = fs.createWriteStream(OUT, { flags:"w" });
  let count=0;

  for (const url of urls){
    try {
      const r = await fetch(url, { redirect:"follow" }); if(!r.ok) continue;
      const html = await r.text();
      const title = (html.match(/<title>(.*?)<\/title>/i)?.[1] || url).trim();
      const text = cleanText(html);
      const chunks = chunkText(text);

      let embeddings = [];
      if (WITH_EMB && chunks.length) embeddings = await embedBatch(chunks);

      chunks.forEach((content, idx)=>{
        const row = { id: `${new URL(url).pathname || "/" }#${idx+1}`, url, title, content };
        if (WITH_EMB) row.embedding = embeddings[idx];
        out.write(JSON.stringify(row) + "\n"); count++;
      });
      console.log(`Processed ${url} → ${chunks.length} chunks`);
    } catch (e) {
      console.warn(`Skipping ${url}: ${e.message}`);
    }
  }
  out.end(); console.log(`Wrote ${count} chunks to ${OUT}`);
})();
