#!/bin/bash
# Script to build knowledge base from client website

echo "📋 Knowledge Base Builder"
echo ""
read -p "Enter client website URL (e.g., https://clientcompany.com): " CLIENT_URL

if [ -z "$CLIENT_URL" ]; then
  echo "❌ No URL provided. Exiting."
  exit 1
fi

echo ""
echo "🔍 Testing website accessibility..."
if curl -s -o /dev/null -w "%{http_code}" "$CLIENT_URL" | grep -q "200"; then
  echo "✅ Website is accessible"
else
  echo "⚠️  Warning: Website might not be accessible"
fi

echo ""
echo "🚀 Building knowledge base with embeddings..."
echo "   URL: $CLIENT_URL"
echo ""

SITE_BASE_URL="$CLIENT_URL" npm run build-kb:supabase:embed

echo ""
echo "✅ Done! Check Supabase dashboard to see the results."
