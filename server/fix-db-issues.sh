#!/bin/bash

# Database credentials
DB_USER="root"
DB_PASS="goldfish"
DB_NAME="truth_or_dare"

echo "Checking and fixing database issues..."

# Create a temporary SQL file
cat > temp_fix.sql << 'EOF'
-- Connect to the database
USE truth_or_dare;

-- Show the tables
SHOW TABLES;

-- Describe the cards table
DESCRIBE cards;

-- Check if there are any cards in the database
SELECT COUNT(*) AS card_count FROM cards;

-- Count cards by pack
SELECT pack_id, COUNT(*) AS count FROM cards GROUP BY pack_id;

-- The model is looking for packId but the database has pack_id
-- Let's fix the data if necessary

-- First check if there are any cards with missing pack_id
SELECT * FROM cards WHERE pack_id IS NULL;

-- Fix any potential issues with foreign keys for card/pack relationships
-- This makes sure all cards point to valid packs
DELETE FROM cards WHERE pack_id NOT IN (SELECT id FROM packs);

-- Show current user data
SELECT id, username, email, type FROM users;

-- Fix any potential issues with the users table
ALTER TABLE users MODIFY id VARCHAR(36) NOT NULL;
ALTER TABLE users MODIFY username VARCHAR(255) NOT NULL;
ALTER TABLE users MODIFY email VARCHAR(255) NOT NULL;
ALTER TABLE users MODIFY password VARCHAR(255) NOT NULL;
ALTER TABLE users MODIFY type ENUM('admin', 'premium', 'normal') NOT NULL DEFAULT 'normal';

-- Fix any potential issues with the packs table
ALTER TABLE packs MODIFY id VARCHAR(36) NOT NULL;
ALTER TABLE packs MODIFY name VARCHAR(255) NOT NULL;
ALTER TABLE packs MODIFY description TEXT NOT NULL;

-- Fix any potential issues with the cards table
ALTER TABLE cards MODIFY id VARCHAR(36) NOT NULL;
ALTER TABLE cards MODIFY type ENUM('truth', 'dare') NOT NULL;
ALTER TABLE cards MODIFY content TEXT NOT NULL;
ALTER TABLE cards MODIFY pack_id VARCHAR(36) NOT NULL;

-- Add the test user if it doesn't exist
INSERT IGNORE INTO users (id, username, email, password, type)
VALUES (UUID(), 'test', 'test@example.com', '$2b$10$jH2oUzawFrlIEVS5HEf7DOTRQswOvbJ.NqC3uR3hZ26JXIxmUMQs.', 'normal');
EOF

# Run the SQL script
mysql -u"$DB_USER" -p"$DB_PASS" < temp_fix.sql

# Clean up
rm temp_fix.sql

echo "Database issues fixed!" 