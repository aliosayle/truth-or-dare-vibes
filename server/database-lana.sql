-- Script to add Lana admin user
-- password: LanaLebanese123

-- Select the database
USE truth_or_dare;

-- First clean up any existing data that depends on our user
-- Remove any cards that belong to Lana's packs
DELETE FROM cards WHERE packId IN (SELECT id FROM packs WHERE created_by = (SELECT id FROM users WHERE email = 'lana@lebanese-vibes.com'));

-- Remove any packs created by Lana
DELETE FROM packs WHERE created_by = (SELECT id FROM users WHERE email = 'lana@lebanese-vibes.com');

-- Now we can safely delete the user
DELETE FROM users WHERE email = 'lana@lebanese-vibes.com';

-- Insert Lana admin user with pre-hashed password
INSERT INTO users (id, username, email, password, type) VALUES (
  UUID(),
  'Lana',
  'lana@lebanese-vibes.com',
  -- Using a freshly generated bcrypt hash for 'LanaLebanese123'
  '$2b$10$CVN32U1Jd/fxKFRkkIIzc.Z.e9cnxUJT//nGjoahkkH4e5fXeHSmy',
  'admin'
);

-- Add some custom packs for Lana
SET @lana_id = (SELECT id FROM users WHERE email = 'lana@lebanese-vibes.com');

-- Create Lana's special pack
INSERT INTO packs (id, name, description, created_by) VALUES (
  UUID(),
  'Lana\'s Special Pack',
  'A special collection of Lebanese-inspired truth or dare questions personally curated by Lana',
  @lana_id
);

-- Add cards to Lana's special pack
SET @lana_pack_id = (SELECT id FROM packs WHERE name = 'Lana\'s Special Pack');

-- Add some unique cards to Lana's pack
INSERT INTO cards (id, type, content, packId, created_by) VALUES
(UUID(), 'truth', 'What\'s your favorite memory of Beirut?', @lana_pack_id, @lana_id),
(UUID(), 'truth', 'If you could live anywhere in Lebanon, where would it be and why?', @lana_pack_id, @lana_id),
(UUID(), 'truth', 'What Lebanese dish can you not live without?', @lana_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s your favorite Lebanese saying and what does it mean?', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Do your best dabke dance for 30 seconds', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Call someone and speak only in Lebanese Arabic for 30 seconds', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Play a Lebanese song and sing along for 20 seconds', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Take a selfie posing like you\'re overlooking the Mediterranean from the Raouche Rocks', @lana_pack_id, @lana_id);

-- Print success message
SELECT 'Lana user and special pack created successfully!' AS message; 