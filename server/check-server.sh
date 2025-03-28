#!/bin/bash

echo "Checking server status..."

# Check if server process is running
if pgrep -f "node.*index.ts" > /dev/null; then
  echo "✓ Server process is running"
else
  echo "✗ Server process is NOT running"
  echo "  Start the server with: npm run dev"
fi

# Check if the port is listening
if netstat -tuln | grep ":3001" > /dev/null; then
  echo "✓ Port 3001 is open and listening"
else
  echo "✗ Port 3001 is NOT listening"
fi

# Check if we can connect to the server
if curl -s http://127.0.0.1:3001/ -o /dev/null -w "%{http_code}\n" | grep -E "2[0-9][0-9]|3[0-9][0-9]|404" > /dev/null; then
  echo "✓ Server is responding to HTTP requests"
else
  echo "✗ Server is NOT responding to HTTP requests"
  echo "  Response code: $(curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3001/ 2>/dev/null || echo "connection failed")"
fi

# Check if the API endpoint is accessible
if curl -s http://127.0.0.1:3001/api/packs -o /dev/null -w "%{http_code}\n" | grep -E "2[0-9][0-9]|3[0-9][0-9]|404" > /dev/null; then
  echo "✓ API endpoint is accessible"
else
  echo "✗ API endpoint is NOT accessible"
  echo "  Response code: $(curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3001/api/packs 2>/dev/null || echo "connection failed")"
fi

echo ""
echo "If the server is running but not accessible, try:"
echo "1. Check express configuration in server/index.ts"
echo "2. Make sure the server is listening on all interfaces (0.0.0.0) and not just localhost"
echo "3. Check for any firewalls blocking port 3001" 