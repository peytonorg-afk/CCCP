import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Business information - UPDATE THESE WITH YOUR ACTUAL INFO
const businessInfo = [
  {
    id: "business-hours-location",
    url: "https://www.cccp.com/contact",
    title: "Business Hours and Location",
    content: `Camera Corner Connecting Point is open for walk-ins and appointments.

Hours:
- Monday-Friday: 9:00 AM - 6:00 PM
- Saturday: 10:00 AM - 4:00 PM (or by appointment)
- Sunday: Closed

Location: 529 North Monroe Avenue, Green Bay, WI 54301
Phone: (920) 432-8899

Walk-ins: Yes, walk-ins are welcome during business hours. However, calling ahead is recommended to ensure availability and reduce wait time.

Appointments: Appointments are recommended for complex repairs or consultations. You can call to schedule.

Same-day service: Available for most repairs when you come in during business hours.`
  },
  {
    id: "contact-information",
    url: "https://www.cccp.com/contact",
    title: "Contact Information",
    content: `Contact Camera Corner Connecting Point:

Phone: (920) 432-8899
Email: [UPDATE WITH ACTUAL EMAIL]
Address: 529 North Monroe Avenue, Green Bay, WI 54301

Hours:
- Monday-Friday: 9:00 AM - 6:00 PM
- Saturday: 10:00 AM - 4:00 PM
- Sunday: Closed

You can visit us during business hours, call us, or email us. Walk-ins are welcome, but calling ahead is recommended.`
  }
];

async function generateEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text
    });
    return response.data[0].embedding;
  } catch (error) {
    console.warn(`Failed to generate embedding: ${error.message}`);
    return null;
  }
}

async function addBusinessInfo() {
  console.log("🚀 Adding business information to Supabase...\n");
  console.log("⚠️  IMPORTANT: Update the script with your actual hours, phone, email, and address!\n");

  const generateEmbeddings = process.env.KNOWLEDGE_WITH_EMBEDDINGS === "1";
  
  if (generateEmbeddings) {
    console.log("🔍 Embeddings will be generated...");
  }

  for (const item of businessInfo) {
    try {
      let embedding = null;
      
      if (generateEmbeddings) {
        console.log(`  Generating embedding for: ${item.title}...`);
        embedding = await generateEmbedding(item.content);
      }

      const row = {
        id: item.id,
        url: item.url,
        title: item.title,
        content: item.content,
        ...(embedding && { embedding })
      };

      const { error } = await supabase
        .from("knowledge_base")
        .upsert(row, { onConflict: "id" });

      if (error) {
        console.error(`❌ Error adding ${item.id}:`, error.message);
      } else {
        console.log(`✅ Added: ${item.title}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${item.id}:`, error.message);
    }
  }

  console.log("\n✨ Done! Business information added.");
  console.log("🔄 Restart your server to load the new content.");
  console.log("\n⚠️  Remember to update the script with your actual business details!");
}

addBusinessInfo().catch(console.error);
