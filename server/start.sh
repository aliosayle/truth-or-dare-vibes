#!/bin/bash

# Truth or Dare Game Server Startup Script
# This script initializes the database and starts the server

echo "Starting Truth or Dare server..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Please install Node.js before running this script."
    exit 1
fi

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "npm not found. Please install npm before running this script."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Initialize database if needed
echo "Checking and initializing database..."
npm run init-db

# Start server in development mode
echo "Starting server in development mode..."
npm run dev 