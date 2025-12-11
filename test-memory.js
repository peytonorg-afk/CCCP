#!/usr/bin/env node
/**
 * Test script to verify chatbot is using knowledge base
 */

import fetch from 'node-fetch';

const testQuestions = [
  "What services do you offer?",
  "Tell me about video walls",
  "What is a VLAN?",
  "Do you do AV integration?"
];

async function testKnowledgeBase() {
  console.log("🧪 Testing Knowledge Base Usage\n");
  console.log("=".repeat(50));
  
  for (const question of testQuestions) {
    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question })
      });
      
      const data = await response.json();
      
      console.log(`\n❓ Question: "${question}"`);
      console.log(`   ✅ Sources found: ${data.sources?.length || 0}`);
      console.log(`   ✅ Confidence: ${data.confidence?.toFixed(2) || 'N/A'}`);
      
      if (data.sources && data.sources.length > 0) {
        console.log(`   ✅ Top source: ${data.sources[0].title?.substring(0, 50)}...`);
        console.log(`   ✅ Reply: ${data.reply?.substring(0, 80)}...`);
        
        // Check if reply mentions business
        if (data.reply?.toLowerCase().includes('camera corner') || 
            data.reply?.toLowerCase().includes('cccp')) {
          console.log(`   ✅ Mentions your business - using knowledge base!`);
        }
      } else {
        console.log(`   ⚠️  No sources found - knowledge base not being used!`);
      }
      
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
    }
  }
  
  console.log("\n" + "=".repeat(50));
  console.log("\n📊 Summary:");
  console.log("✅ If you see sources and high confidence (>0.6), knowledge base IS working!");
  console.log("❌ If you see 0 sources or low confidence, check:");
  console.log("   - Is Supabase connected?");
  console.log("   - Does knowledge_base table have content?");
  console.log("   - Are embeddings enabled?");
}

testKnowledgeBase().catch(console.error);
