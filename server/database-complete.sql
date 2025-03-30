-- Complete Database Setup Script for Truth or Dare App
-- This script combines database.sql, database-lana.sql, and database-enhanced.sql
-- into a single file for easy database creation

-- Create database
DROP DATABASE IF EXISTS truth_or_dare;
CREATE DATABASE truth_or_dare;

-- Connect to the database
USE truth_or_dare;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  type ENUM('admin', 'premium', 'normal') NOT NULL DEFAULT 'normal',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create packs table
CREATE TABLE IF NOT EXISTS packs (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_by VARCHAR(36),
  FOREIGN KEY (created_by) REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create cards table
CREATE TABLE IF NOT EXISTS cards (
  id VARCHAR(36) PRIMARY KEY,
  type ENUM('truth', 'dare') NOT NULL,
  content TEXT NOT NULL,
  packId VARCHAR(36) NOT NULL,
  FOREIGN KEY (packId) REFERENCES packs(id) ON DELETE CASCADE,
  created_by VARCHAR(36),
  FOREIGN KEY (created_by) REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================
-- Insert Users
-- =====================================

-- Insert initial admin user (password: admin123)
INSERT INTO users (id, username, email, password, type) VALUES (
  UUID(),
  'admin',
  'admin@example.com',
  '$2b$10$ZsZYivwzsto1SHTJhRt.1uxV22E4s2o3Kl4iFYolMea8bFVERAJNq',
  'admin'
);

-- Insert Lana admin user (password: LanaLebanese123)
INSERT INTO users (id, username, email, password, type) VALUES (
  UUID(),
  'Lana',
  'lana@lebanese-vibes.com',
  '$2b$10$CVN32U1Jd/fxKFRkkIIzc.Z.e9cnxUJT//nGjoahkkH4e5fXeHSmy',
  'admin'
);

-- Set user IDs for later use
SET @admin_id = (SELECT id FROM users WHERE email = 'admin@example.com');
SET @lana_id = (SELECT id FROM users WHERE email = 'lana@lebanese-vibes.com');

-- =====================================
-- Create Packs
-- =====================================

-- Create diverse packs
INSERT INTO packs (id, name, description, created_by) VALUES
-- Lana's special pack
(UUID(), 'Lana\'s Special Pack', 'A special collection of truth or dare questions personally curated by Lana', @lana_id),

-- Modern diverse packs
(UUID(), 'Party Starters', 'Break the ice and get the party going with these fun challenges!', @lana_id),
(UUID(), 'Deep Connections', 'Go beyond small talk with these thought-provoking questions', @lana_id),
(UUID(), 'Adventure Time', 'Push boundaries and create memories with exciting dares', @lana_id),
(UUID(), 'Foodies Delight', 'For the culinary adventurers and food lovers', @lana_id),
(UUID(), 'Digital Age', 'Social media and tech-inspired challenges for the modern world', @lana_id);

-- Store pack IDs for later use
SET @lana_pack_id = (SELECT id FROM packs WHERE name = 'Lana\'s Special Pack');
SET @party_pack_id = (SELECT id FROM packs WHERE name = 'Party Starters');
SET @deep_pack_id = (SELECT id FROM packs WHERE name = 'Deep Connections');
SET @adventure_pack_id = (SELECT id FROM packs WHERE name = 'Adventure Time');
SET @food_pack_id = (SELECT id FROM packs WHERE name = 'Foodies Delight');
SET @digital_pack_id = (SELECT id FROM packs WHERE name = 'Digital Age');

-- =====================================
-- Insert Cards
-- =====================================

-- Add cards to Lana's special pack
INSERT INTO cards (id, type, content, packId, created_by) VALUES
(UUID(), 'truth', 'What\'s your favorite memory of Beirut?', @lana_pack_id, @lana_id),
(UUID(), 'truth', 'If you could live anywhere in the world, where would it be and why?', @lana_pack_id, @lana_id),
(UUID(), 'truth', 'What dish can you not live without?', @lana_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s your favorite saying and what does it mean?', @lana_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s your dream travel destination?', @lana_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s the most daring thing you\'ve done this year?', @lana_pack_id, @lana_id),
(UUID(), 'truth', 'If your life had a theme song, what would it be?', @lana_pack_id, @lana_id),
(UUID(), 'truth', 'If you were stranded on an island with one person in this room, who would you pick?', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Do your best dance for 30 seconds', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Call someone and speak in a funny accent for 30 seconds', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Play a song and sing along for 20 seconds', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Take a selfie posing like you\'re overlooking the sea', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Show us your hidden talent', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Swap clothes with someone in the room for the next round', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Let someone go through your phone for 30 seconds', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Do your best runway walk across the room', @lana_pack_id, @lana_id);

-- Add Lana easter egg cards
INSERT INTO cards (id, type, content, packId, created_by) VALUES
(UUID(), 'truth', 'If Lana were a superhero, what would her superpower be?', @lana_pack_id, @lana_id),
(UUID(), 'truth', 'Connect the four letters L-A-N-A to four qualities you admire in a person', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Write a short poem where each line starts with one letter from the name "LANA"', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Draw a star on your hand - it represents the brightest star named Lana', @lana_pack_id, @lana_id);

-- Add cards to Party Starters pack
INSERT INTO cards (id, type, content, packId, created_by) VALUES
(UUID(), 'truth', 'What\'s the most embarrassing song on your playlist?', @party_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s your favorite song to dance to?', @party_pack_id, @lana_id),
(UUID(), 'truth', 'If you were a street food, what would you be and why?', @party_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s your go-to karaoke song?', @party_pack_id, @lana_id),
(UUID(), 'truth', 'If Lana were here right now, what would you want to tell her?', @party_pack_id, @lana_id), -- Easter egg
(UUID(), 'dare', 'Show us your best dance move', @party_pack_id, @lana_id),
(UUID(), 'dare', 'Take a selfie with an imaginary celebrity', @party_pack_id, @lana_id),
(UUID(), 'dare', 'Text the 5th person in your contacts a funny greeting', @party_pack_id, @lana_id),
(UUID(), 'dare', 'Do your best impression of someone in the room', @party_pack_id, @lana_id),
(UUID(), 'dare', 'Draw "L.A.N.A" on your palm and show everyone', @party_pack_id, @lana_id); -- Easter egg

-- Add cards to Deep Connections pack
INSERT INTO cards (id, type, content, packId, created_by) VALUES
(UUID(), 'truth', 'What life experience has shaped you the most?', @deep_pack_id, @lana_id),
(UUID(), 'truth', 'What cultural tradition from your heritage do you value most?', @deep_pack_id, @lana_id),
(UUID(), 'truth', 'If you could have dinner with anyone from history, who would it be?', @deep_pack_id, @lana_id),
(UUID(), 'truth', 'What dream are you still chasing?', @deep_pack_id, @lana_id),
(UUID(), 'truth', 'Name someone whose name starts with L who changed your life', @deep_pack_id, @lana_id), -- Easter egg
(UUID(), 'truth', 'What\'s a secret skill you have that not many people know about?', @deep_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s your favorite memory from a trip you\'ve taken?', @deep_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s something you wish people understood about you?', @deep_pack_id, @lana_id),
(UUID(), 'truth', 'What foreign language would you love to master and why?', @deep_pack_id, @lana_id),
(UUID(), 'truth', 'Four-letter names often have the most beautiful meaning. What\'s your favorite?', @deep_pack_id, @lana_id); -- Easter egg

-- Add cards to Adventure Time pack
INSERT INTO cards (id, type, content, packId, created_by) VALUES
(UUID(), 'dare', 'Call a restaurant and ask if they deliver to a funny location', @adventure_pack_id, @lana_id),
(UUID(), 'dare', 'Go outside and howl at the moon for 10 seconds', @adventure_pack_id, @lana_id),
(UUID(), 'dare', 'Speak with a funny accent for the next 3 rounds', @adventure_pack_id, @lana_id),
(UUID(), 'dare', 'Message someone you haven\'t talked to in months', @adventure_pack_id, @lana_id),
(UUID(), 'dare', 'Write a haiku about someone named Lana', @adventure_pack_id, @lana_id), -- Easter egg
(UUID(), 'dare', 'Try to sell a random object to the group like you\'re at a market', @adventure_pack_id, @lana_id),
(UUID(), 'dare', 'Call someone on speaker and tell them you miss them', @adventure_pack_id, @lana_id),
(UUID(), 'dare', 'Do your best celebrity impression', @adventure_pack_id, @lana_id),
(UUID(), 'dare', 'Show the last 5 photos in your camera roll', @adventure_pack_id, @lana_id),
(UUID(), 'dare', 'Take a selfie with everyone and caption it "With my favorite L-A-N-A fans"', @adventure_pack_id, @lana_id); -- Easter egg

-- Add cards to Foodies Delight pack
INSERT INTO cards (id, type, content, packId, created_by) VALUES
(UUID(), 'truth', 'What\'s the strangest food you\'ve ever eaten?', @food_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s your favorite topping on a dish? Defend your answer!', @food_pack_id, @lana_id),
(UUID(), 'truth', 'What food reminds you of your childhood?', @food_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s one food you refuse to try?', @food_pack_id, @lana_id),
(UUID(), 'truth', 'If your taste in food spelled a four-letter name, what would it be?', @food_pack_id, @lana_id), -- Easter egg
(UUID(), 'dare', 'Mix three condiments from the kitchen and take a small taste', @food_pack_id, @lana_id),
(UUID(), 'dare', 'Blindfolded, try to identify a food item chosen by the group', @food_pack_id, @lana_id),
(UUID(), 'dare', 'Eat something with your hands behind your back', @food_pack_id, @lana_id),
(UUID(), 'dare', 'Try to describe the perfect sandwich without using the words "bread" or "meat"', @food_pack_id, @lana_id),
(UUID(), 'dare', 'Come up with a recipe and name it "Lana\'s Special"', @food_pack_id, @lana_id); -- Easter egg

-- Add cards to Digital Age pack
INSERT INTO cards (id, type, content, packId, created_by) VALUES
(UUID(), 'truth', 'What\'s your most embarrassing online purchase?', @digital_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s the longest you\'ve gone without checking your phone?', @digital_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s a social media trend you secretly enjoy?', @digital_pack_id, @lana_id),
(UUID(), 'truth', 'If your internet search history was made public, what would be most embarrassing?', @digital_pack_id, @lana_id),
(UUID(), 'truth', 'If you could follow only one person on social media whose name starts with L, who would it be?', @digital_pack_id, @lana_id), -- Easter egg
(UUID(), 'dare', 'Let someone send a message from your social media account', @digital_pack_id, @lana_id),
(UUID(), 'dare', 'Make up a dance on the spot and perform it', @digital_pack_id, @lana_id),
(UUID(), 'dare', 'Send the 7th person in your contact list a voice message singing a song', @digital_pack_id, @lana_id),
(UUID(), 'dare', 'Take a selfie with an exaggerated filter and make it your profile picture for 10 minutes', @digital_pack_id, @lana_id),
(UUID(), 'dare', 'Create a four-panel comic strip about someone named Lana', @digital_pack_id, @lana_id); -- Easter egg

-- Success message
SELECT 'Truth or Dare database created successfully with all packs and cards!' AS message; 