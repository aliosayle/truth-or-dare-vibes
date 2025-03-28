#!/bin/bash

# Truth or Dare Game Git Setup Script
# This script helps set up Git and push to GitHub

echo "Setting up Git for Truth or Dare application..."

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git not found. Please install Git before running this script."
    exit 1
fi

# Check if a Git repository is already initialized
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
fi

# Prompt for GitHub repository URL
read -p "Enter your GitHub repository URL (e.g., https://github.com/yourusername/truth-or-dare-vibes.git): " GITHUB_REPO

# Check if the input is empty
if [ -z "$GITHUB_REPO" ]; then
    echo "GitHub repository URL is required."
    exit 1
fi

# Add all files to the repository
echo "Adding files to repository..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Initial commit for Truth or Dare application"

# Add GitHub remote
echo "Adding GitHub remote..."
git remote add origin $GITHUB_REPO
if [ $? -ne 0 ]; then
    # If remote already exists, set the URL
    echo "Remote 'origin' already exists. Updating URL..."
    git remote set-url origin $GITHUB_REPO
fi

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main || git push -u origin master

echo "Git setup complete! The code has been pushed to GitHub."
echo "You can now update the GITHUB_REPO variable in deploy.sh with: $GITHUB_REPO"
echo "Then run ./deploy.sh to deploy to the remote server." 