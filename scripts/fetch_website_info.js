import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Website to fetch information from
const WEBSITE_URL = process.env.WEBSITE_URL || "https://www.cccp.com";

async function fetchPageContent(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Chatbot/1.0)'
      }
    });
    if (!response.ok) return null;
    const html = await response.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    
    // Remove script and style elements
    const scripts = doc.querySelectorAll('script, style, nav, footer, header');
    scripts.forEach(el => el.remove());
    
    // Extract text
    return doc.body?.textContent || '';
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    return null;
  }
}

async function extractBusinessInfo() {
  console.log(`🔍 Fetching business information from ${WEBSITE_URL}...\n`);
  
  // Try common pages for business info
  const pages = [
    `${WEBSITE_URL}/contact`,
    `${WEBSITE_URL}/about`,
    `${WEBSITE_URL}/hours`,
    `${WEBSITE_URL}`,
  ];
  
  let allContent = '';
  
  for (const url of pages) {
    console.log(`  Fetching: ${url}...`);
    const content = await fetchPageContent(url);
    if (content) {
      allContent += `\n\n--- Content from ${url} ---\n${content.substring(0, 2000)}`;
    }
  }
  
  if (!allContent) {
    console.log("❌ Could not fetch content from website");
    return;
  }
  
  // Use AI to extract structured business info
  console.log("\n🤖 Extracting business information...");
  const extraction = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{
      role: "system",
      content: "Extract business information from the provided website content. Return JSON with: hours, phone, email, address, walkIns, services (array). Only include information that is clearly stated."
    }, {
      role: "user",
      content: `Extract business information from this website content:\n\n${allContent}`
    }]
  });
  
  try {
    const info = JSON.parse(extraction.choices[0].message.content);
    console.log("✅ Extracted information:", info);
    
    // Generate embedding
    const content = `Business Information:
Hours: ${info.hours || 'Not specified'}
Phone: ${info.phone || 'Not specified'}
Email: ${info.email || 'Not specified'}
Address: ${info.address || 'Not specified'}
Walk-ins: ${info.walkIns || 'Not specified'}
Services: ${info.services?.join(', ') || 'Not specified'}`;
    
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: content
    });
    
    // Add to knowledge base
    const row = {
      id: "business-info-fetched",
      url: `${WEBSITE_URL}/contact`,
      title: "Business Information",
      content: content,
      embedding: embedding.data[0].embedding
    };
    
    const { error } = await supabase
      .from("knowledge_base")
      .upsert(row, { onConflict: "id" });
    
    if (error) {
      console.error("❌ Error adding to knowledge base:", error.message);
    } else {
      console.log("\n✅ Business information added to knowledge base!");
      console.log("🔄 Restart your server to use it.");
    }
  } catch (error) {
    console.error("❌ Error parsing extracted info:", error.message);
  }
}

extractBusinessInfo().catch(console.error);
