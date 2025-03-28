#!/bin/bash

# Simple script to run the Truth or Dare server

# Change to the server directory if script is run from elsewhere
cd "$(dirname "$0")"

# Initialize the database
echo "Initializing database..."
npm run init-db

# Start the server
echo "Starting server..."
npm run dev 