-- Supabase Conversation Memory Schema
-- Run this SQL in your Supabase SQL Editor AFTER running supabase_schema.sql

-- Create the conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  message TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for fast session lookups
CREATE INDEX IF NOT EXISTS idx_conversations_session_id ON conversations(session_id);

-- Create index for time-based queries
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at);

-- Optional: Add a function to get recent conversation history
CREATE OR REPLACE FUNCTION get_conversation_history(
  p_session_id TEXT,
  p_limit INT DEFAULT 20
)
RETURNS TABLE (
  id BIGINT,
  session_id TEXT,
  role TEXT,
  message TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    conversations.id,
    conversations.session_id,
    conversations.role,
    conversations.message,
    conversations.metadata,
    conversations.created_at
  FROM conversations
  WHERE conversations.session_id = p_session_id
  ORDER BY conversations.created_at ASC
  LIMIT p_limit;
END;
$$;
