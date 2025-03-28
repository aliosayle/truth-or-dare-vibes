-- Create database
CREATE DATABASE truth_or_dare;

-- Connect to the database
USE truth_or_dare;

-- Create user types enum
CREATE TYPE user_type AS ENUM ('admin', 'premium', 'normal');
CREATE TYPE card_type AS ENUM ('truth', 'dare');

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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_by VARCHAR(36),
  FOREIGN KEY (created_by) REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create cards table
CREATE TABLE IF NOT EXISTS cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type card_type NOT NULL,
  content TEXT NOT NULL,
  pack_id UUID NOT NULL REFERENCES packs(id) ON DELETE CASCADE,
  created_by VARCHAR(36),
  FOREIGN KEY (created_by) REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packs_updated_at
    BEFORE UPDATE ON packs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cards_updated_at
    BEFORE UPDATE ON cards
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert initial admin user (password: admin123)
INSERT INTO users (id, username, email, password, type) VALUES (
  UUID(),
  'admin',
  'admin@example.com',
  '$2b$10$ZsZYivwzsto1SHTJhRt.1uxV22E4s2o3Kl4iFYolMea8bFVERAJNq',
  'admin'
);

-- Update existing packs to be created by admin
SET @admin_id = (SELECT id FROM users WHERE email = 'admin@example.com');
UPDATE packs SET created_by = @admin_id WHERE created_by IS NULL;

-- Update existing cards to be created by admin
UPDATE cards SET created_by = @admin_id WHERE created_by IS NULL;

-- Insert initial packs
INSERT INTO packs (id, name, description, created_by) VALUES
(UUID(), 'Lebanese Culture', 'Truth or dare questions about Lebanese traditions, food, and customs', @admin_id),
(UUID(), 'Beirut Nights', 'Fun challenges inspired by Lebanese nightlife and entertainment', @admin_id),
(UUID(), 'Cedar Adventures', 'Questions and challenges about Lebanese landmarks and nature', @admin_id);

-- Insert cards for Lebanese Culture pack
SET @lebanese_culture_id = (SELECT id FROM packs WHERE name = 'Lebanese Culture');
INSERT INTO cards (id, type, content, pack_id, created_by) VALUES
(UUID(), 'truth', 'What''s your favorite Lebanese dish and why?', @lebanese_culture_id, @admin_id),
(UUID(), 'truth', 'Which Lebanese song brings back your fondest memories?', @lebanese_culture_id, @admin_id),
(UUID(), 'truth', 'What''s your favorite Lebanese saying or proverb?', @lebanese_culture_id, @admin_id),
(UUID(), 'truth', 'Which Lebanese city or region would you most like to visit?', @lebanese_culture_id, @admin_id),
(UUID(), 'dare', 'Dance dabke for 30 seconds', @lebanese_culture_id, @admin_id),
(UUID(), 'dare', 'Sing a popular Lebanese song', @lebanese_culture_id, @admin_id),
(UUID(), 'dare', 'Try to recite a Lebanese poem from memory', @lebanese_culture_id, @admin_id),
(UUID(), 'dare', 'Call someone and greet them with ''Kifak/Kifik'' and have a short conversation in Lebanese', @lebanese_culture_id, @admin_id);

-- Insert cards for Beirut Nights pack
SET @beirut_nights_id = (SELECT id FROM packs WHERE name = 'Beirut Nights');
INSERT INTO cards (id, type, content, pack_id, created_by) VALUES
(UUID(), 'truth', 'What''s the most memorable night you''ve had in Beirut?', @beirut_nights_id, @admin_id),
(UUID(), 'truth', 'Have you ever tried to impress someone with your Arabic?', @beirut_nights_id, @admin_id),
(UUID(), 'truth', 'What''s your favorite Lebanese restaurant or café?', @beirut_nights_id, @admin_id),
(UUID(), 'truth', 'What''s the most embarrassing thing you''ve done at a Lebanese wedding?', @beirut_nights_id, @admin_id),
(UUID(), 'dare', 'Take a selfie in a pose like you''re at a beach club in Jounieh', @beirut_nights_id, @admin_id),
(UUID(), 'dare', 'Try to bargain for an imaginary item in Lebanese style', @beirut_nights_id, @admin_id),
(UUID(), 'dare', 'Do your best impression of a Lebanese parent', @beirut_nights_id, @admin_id),
(UUID(), 'dare', 'Text the last Lebanese person in your contacts and tell them you miss their country', @beirut_nights_id, @admin_id);

-- Insert cards for Cedar Adventures pack
SET @cedar_adventures_id = (SELECT id FROM packs WHERE name = 'Cedar Adventures');
INSERT INTO cards (id, type, content, pack_id, created_by) VALUES
(UUID(), 'truth', 'Would you rather spend a day at Jeita Grotto or hiking in the Cedars?', @cedar_adventures_id, @admin_id),
(UUID(), 'truth', 'What''s your favorite Lebanese natural landmark?', @cedar_adventures_id, @admin_id),
(UUID(), 'truth', 'Have you ever been skiing in Lebanon? Share your experience.', @cedar_adventures_id, @admin_id),
(UUID(), 'truth', 'What''s the most beautiful place you''ve visited in Lebanon?', @cedar_adventures_id, @admin_id),
(UUID(), 'dare', 'Describe Baalbek ruins as if you''re a tour guide', @cedar_adventures_id, @admin_id),
(UUID(), 'dare', 'Draw a quick sketch of the Lebanese flag', @cedar_adventures_id, @admin_id),
(UUID(), 'dare', 'Create a short advertisement promoting tourism in Lebanon', @cedar_adventures_id, @admin_id),
(UUID(), 'dare', 'Name 5 Lebanese cities in under 10 seconds', @cedar_adventures_id, @admin_id); 