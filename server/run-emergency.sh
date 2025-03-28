#!/bin/bash

echo "Starting Emergency Server..."

# Check if port 3005 is already in use
if netstat -tuln | grep ":3005" > /dev/null; then
  echo "Port 3005 is already in use. Killing process..."
  # Find and kill process on port 3005
  lsof -ti:3005 | xargs kill -9 || true
fi

# Open port in firewall if needed
echo "Ensuring port 3005 is open..."
if command -v ufw > /dev/null; then
  # Ubuntu/Debian
  sudo ufw allow 3005/tcp || echo "Failed to open port with ufw, might need manual configuration"
elif command -v firewall-cmd > /dev/null; then
  # CentOS/RHEL
  sudo firewall-cmd --add-port=3005/tcp --permanent || echo "Failed to open port with firewall-cmd"
  sudo firewall-cmd --reload || echo "Failed to reload firewall"
else
  echo "No firewall detected, port should be open"
fi

# Install required packages if not already installed
echo "Checking dependencies..."
if ! npm list express mysql2 jsonwebtoken bcrypt | grep -q "empty"; then
  echo "Installing required packages..."
  npm install express mysql2 jsonwebtoken bcrypt
fi

# Run emergency server
echo "Starting emergency server on port 3005..."
node emergency-server.js &

# Wait for server to start
sleep 2

# Verify server is running
if curl -s http://127.0.0.1:3005/ > /dev/null; then
  echo "
  ================================================
  |                                              |
  |  🚀 EMERGENCY SERVER STARTED SUCCESSFULLY 🚀 |
  |                                              |
  |  Go to: http://161.97.177.233:3005           |
  |                                              |
  |  Update your frontend to use:                |
  |  http://161.97.177.233:3005/api              |
  |                                              |
  ================================================
  "
else
  echo "Server failed to start properly. Check logs for errors."
fi 