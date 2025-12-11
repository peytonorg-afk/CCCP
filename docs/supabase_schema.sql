-- Supabase Knowledge Base Schema
-- Run this SQL in your Supabase SQL Editor

-- Create the knowledge_base table
CREATE TABLE IF NOT EXISTS knowledge_base (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536), -- For text-embedding-3-small (1536 dimensions)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for keyword search on title and content
CREATE INDEX IF NOT EXISTS idx_knowledge_title_content ON knowledge_base USING gin(to_tsvector('english', title || ' ' || content));

-- Create index for URL lookups
CREATE INDEX IF NOT EXISTS idx_knowledge_url ON knowledge_base(url);

-- Create index for vector similarity search (if using pgvector extension)
-- Note: You need to enable the pgvector extension first in Supabase dashboard
CREATE INDEX IF NOT EXISTS idx_knowledge_embedding ON knowledge_base USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Enable pgvector extension (run this first if not already enabled)
-- CREATE EXTENSION IF NOT EXISTS vector;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_knowledge_base_updated_at ON knowledge_base;
CREATE TRIGGER update_knowledge_base_updated_at BEFORE UPDATE ON knowledge_base
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function for vector similarity search (optional - for better performance)
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 6
)
RETURNS TABLE (
  id text,
  url text,
  title text,
  content text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    knowledge_base.id,
    knowledge_base.url,
    knowledge_base.title,
    knowledge_base.content,
    1 - (knowledge_base.embedding <=> query_embedding) AS similarity
  FROM knowledge_base
  WHERE knowledge_base.embedding IS NOT NULL
    AND 1 - (knowledge_base.embedding <=> query_embedding) > match_threshold
  ORDER BY knowledge_base.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

