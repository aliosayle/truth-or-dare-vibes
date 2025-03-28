#!/bin/bash

# Database credentials
DB_USER="root"
DB_PASS="goldfish"
DB_NAME="truth_or_dare"

echo "Creating test user..."

# Create a temporary SQL file
cat > temp_user.sql << 'EOF'
-- Connect to the database
USE truth_or_dare;

-- First, let's check what users we have
SELECT id, username, email, type FROM users;

-- Create a test user with simple credentials (password: test123)
INSERT INTO users (id, username, email, password, type) VALUES (
  UUID(),
  'test',
  'test@example.com',
  '$2b$10$jH2oUzawFrlIEVS5HEf7DOTRQswOvbJ.NqC3uR3hZ26JXIxmUMQs.',
  'normal'
);

-- Show the users again after adding the test user
SELECT id, username, email, type FROM users;
EOF

# Run the SQL script
mysql -u"$DB_USER" -p"$DB_PASS" < temp_user.sql

# Clean up
rm temp_user.sql

echo "Test user created with credentials:"
echo "Email: test@example.com"
echo "Password: test123" 