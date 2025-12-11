import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// MacBook models and information
const macbookContent = [
  {
    id: "macbook-models-overview",
    url: "https://yoursite.com/macbook-models",
    title: "MacBook Models - Complete Guide",
    content: `Apple offers several MacBook models, each designed for different needs:

**MacBook Air:**
- Lightweight and portable (2.7-3.0 lbs)
- M2 or M3 chip options
- 13-inch and 15-inch display sizes
- Best for: Students, everyday use, light work, portability
- Starting price: $999-$1,299

**MacBook Pro 13-inch:**
- Compact professional option
- M2 chip
- Touch Bar (on some models)
- Best for: Professionals who need portability
- Starting price: $1,299

**MacBook Pro 14-inch:**
- Powerful performance
- M3, M3 Pro, or M3 Max chips
- Liquid Retina XDR display
- Best for: Creative professionals, developers, video editing
- Starting price: $1,599

**MacBook Pro 16-inch:**
- Maximum performance and screen size
- M3, M3 Pro, or M3 Max chips
- Largest display (16.2 inches)
- Best for: Power users, video production, heavy workloads
- Starting price: $2,499

**Which to Choose:**
- **Students/Basic Use:** MacBook Air 13-inch
- **Portable Professional:** MacBook Pro 14-inch
- **Maximum Power:** MacBook Pro 16-inch
- **Budget-Conscious:** MacBook Air M2
- **Creative Work:** MacBook Pro 14-inch or 16-inch with M3 Pro/Max`
  },
  {
    id: "macbook-air-vs-pro",
    url: "https://yoursite.com/macbook-comparison",
    title: "MacBook Air vs MacBook Pro - Which is Right for You?",
    content: `**MacBook Air vs MacBook Pro - Key Differences:**

**MacBook Air:**
- Lighter and thinner (more portable)
- Fanless design (silent operation)
- Lower starting price ($999)
- Good for: Web browsing, email, documents, light photo editing, students
- Battery: Up to 18 hours
- Display: 13.6" or 15.3" Liquid Retina

**MacBook Pro:**
- More powerful processors (M3 Pro/Max options)
- Active cooling (better sustained performance)
- Higher starting price ($1,599)
- Good for: Video editing, programming, 3D rendering, professional creative work
- Battery: Up to 22 hours
- Display: 14.2" or 16.2" Liquid Retina XDR (brighter, better color)

**Choose Air if:**
- You prioritize portability
- You do light to moderate work
- Budget is a concern
- You want the lightest option

**Choose Pro if:**
- You need maximum performance
- You do video editing, coding, or heavy creative work
- You want the best display
- You need sustained high performance`
  },
  {
    id: "macbook-specs-guide",
    url: "https://yoursite.com/macbook-specs",
    title: "MacBook Specifications Guide",
    content: `**MacBook Specifications Explained:**

**Processors:**
- **M2:** Fast, efficient, great for most users
- **M3:** Latest generation, 15-20% faster than M2
- **M3 Pro:** For professionals, more CPU/GPU cores
- **M3 Max:** Maximum performance, for heavy workloads

**Memory (RAM):**
- **8GB:** Basic use, web browsing, documents
- **16GB:** Recommended for most users, multitasking
- **24GB/32GB:** For professionals, video editing, development
- **64GB+:** Only on Pro models, extreme workloads

**Storage:**
- **256GB:** Minimum, basic use only
- **512GB:** Recommended for most users
- **1TB:** For professionals, large files
- **2TB+:** For video editors, large projects

**Display Sizes:**
- **13-inch:** Most portable, MacBook Air
- **14-inch:** Best balance, MacBook Pro
- **15-inch:** Large Air option
- **16-inch:** Maximum screen size, Pro only

**Our Recommendation:**
- **Most Users:** MacBook Air 13" M3, 16GB RAM, 512GB storage
- **Professionals:** MacBook Pro 14" M3 Pro, 18GB RAM, 1TB storage
- **Power Users:** MacBook Pro 16" M3 Max, 36GB+ RAM, 2TB+ storage`
  },
  {
    id: "macbook-buying-guide",
    url: "https://yoursite.com/macbook-buying-guide",
    title: "MacBook Buying Guide - How to Choose",
    content: `**MacBook Buying Guide - Find the Right Model for You:**

**Step 1: Determine Your Use Case**

**Light Use (Web, Email, Documents):**
- MacBook Air 13" M2 or M3
- 8GB RAM, 256GB storage
- Perfect for students and everyday use

**Moderate Use (Photo Editing, Light Video, Multitasking):**
- MacBook Air 15" M3
- 16GB RAM, 512GB storage
- Good balance of power and portability

**Professional Use (Video Editing, Development, Design):**
- MacBook Pro 14" M3 Pro
- 18GB+ RAM, 1TB+ storage
- Best for creative professionals

**Heavy Workloads (4K Video, 3D Rendering, Large Projects):**
- MacBook Pro 16" M3 Max
- 36GB+ RAM, 2TB+ storage
- Maximum performance

**Step 2: Consider Your Budget**
- Under $1,500: MacBook Air M2
- $1,500-$2,500: MacBook Air M3 or MacBook Pro 14" M3
- $2,500+: MacBook Pro 14" or 16" M3 Pro/Max

**Step 3: Think About Portability**
- Need maximum portability? → MacBook Air
- Will stay mostly on desk? → MacBook Pro 16"
- Best balance? → MacBook Pro 14"

**We can help you choose the perfect MacBook for your needs! Contact us for personalized recommendations.`
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

async function addMacBookContent() {
  console.log("🚀 Adding MacBook models information to Supabase...\n");

  const generateEmbeddings = process.env.KNOWLEDGE_WITH_EMBEDDINGS === "1";
  
  if (generateEmbeddings) {
    console.log("🔍 Embeddings will be generated...");
  } else {
    console.log("⚠️  Embeddings disabled. Set KNOWLEDGE_WITH_EMBEDDINGS=1 to enable.");
  }

  for (const item of macbookContent) {
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

  console.log("\n✨ Done! MacBook models information added to knowledge base.");
  console.log("🔄 Restart your server to load the new content.");
}

addMacBookContent().catch(console.error);
