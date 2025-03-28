#!/bin/bash

# Truth or Dare Game Setup Script
# This script sets up the application for local development

echo "Setting up Truth or Dare application..."

# Check for MySQL
if ! command -v mysql &> /dev/null; then
    echo "MySQL not found. Please install MySQL before running this script."
    exit 1
fi

# Setup MySQL database
echo "Setting up database..."
mysql -u root -p'goldfish' << EOF
CREATE DATABASE IF NOT EXISTS truth_or_dare;
USE truth_or_dare;
EOF

if [ $? -ne 0 ]; then
    echo "Error setting up MySQL database. Check your credentials."
    exit 1
fi

# Import schema and initial data
echo "Importing database schema..."
mysql -u root -p'goldfish' < server/database.sql

if [ $? -ne 0 ]; then
    echo "Error importing database schema."
    exit 1
fi

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "Installing backend dependencies..."
cd server
npm install

# Build backend
echo "Building backend..."
npm run build

# Start development servers
echo "Setup complete! To start the application:"
echo "1. Start backend: cd server && npm run dev"
echo "2. Start frontend: cd .. && npm run dev"
echo ""
echo "The application will be available at http://localhost:5173" 