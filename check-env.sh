#!/bin/bash
echo "🔍 Checking Environment Variables..."
echo ""

MISSING=0

# Check OpenAI
if grep -q "^OPENAI_API_KEY=" .env 2>/dev/null; then
  echo "✅ OPENAI_API_KEY is set"
else
  echo "❌ OPENAI_API_KEY is missing"
  MISSING=1
fi

# Check Supabase URL
if grep -q "^SUPABASE_URL=" .env 2>/dev/null; then
  URL=$(grep "^SUPABASE_URL=" .env | cut -d'=' -f2)
  echo "✅ SUPABASE_URL is set: $URL"
else
  echo "❌ SUPABASE_URL is missing"
  MISSING=1
fi

# Check Supabase Key
if grep -q "^SUPABASE_SERVICE_ROLE_KEY=" .env 2>/dev/null; then
  KEY_PREVIEW=$(grep "^SUPABASE_SERVICE_ROLE_KEY=" .env | cut -d'=' -f2 | cut -c1-20)
  echo "✅ SUPABASE_SERVICE_ROLE_KEY is set: ${KEY_PREVIEW}..."
else
  echo "❌ SUPABASE_SERVICE_ROLE_KEY is missing"
  MISSING=1
fi

echo ""
if [ $MISSING -eq 0 ]; then
  echo "✅ All environment variables are configured!"
else
  echo "❌ Some environment variables are missing. Please add them to .env"
fi
