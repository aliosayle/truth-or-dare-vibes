#!/bin/bash

SERVER_URL="http://127.0.0.1:3001"

echo "Testing API routes..."

# Testing auth endpoints
echo -e "\n=== Testing Auth Routes ==="
echo "1. Login with test user"
curl -s -X POST "${SERVER_URL}/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}' | jq

echo -e "\n2. Login with admin user"
curl -s -X POST "${SERVER_URL}/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}' | jq

# Store the token (assuming it works)
TOKEN=$(curl -s -X POST "${SERVER_URL}/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}' | jq -r '.token')

if [ "$TOKEN" != "null" ] && [ "$TOKEN" != "" ]; then
  echo -e "\nAuth token received: ${TOKEN:0:20}... (truncated)"

  echo -e "\n=== Testing Protected Routes ==="
  echo "1. Get current user"
  curl -s -X GET "${SERVER_URL}/api/auth/me" \
    -H "Authorization: Bearer $TOKEN" | jq

  echo -e "\n2. Get all packs"
  curl -s -X GET "${SERVER_URL}/api/packs" \
    -H "Authorization: Bearer $TOKEN" | jq
else
  echo -e "\nNo auth token received, skipping protected routes"
fi

echo -e "\n=== Testing Public Routes ==="
echo "1. Get all packs (without auth)"
curl -s -X GET "${SERVER_URL}/api/packs" | jq

echo -e "\nAPI testing complete!" 