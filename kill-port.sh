#!/bin/bash
# Kill process on a specific port
PORT=${1:-3001}
PID=$(lsof -ti:$PORT)
if [ -z "$PID" ]; then
  echo "✅ Port $PORT is free"
else
  echo "🔍 Found process $PID on port $PORT"
  kill -9 $PID
  echo "✅ Killed process $PID"
  sleep 1
  if lsof -ti:$PORT > /dev/null 2>&1; then
    echo "⚠️  Port $PORT still in use"
  else
    echo "✅ Port $PORT is now free"
  fi
fi
