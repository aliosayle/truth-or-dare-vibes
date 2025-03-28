-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS truth_or_dare;

-- Use the database
USE truth_or_dare;

-- Create tables
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  type ENUM('admin', 'premium', 'normal') NOT NULL DEFAULT 'normal',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS packs (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_by VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS cards (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  content TEXT NOT NULL,
  type ENUM('truth', 'dare') NOT NULL,
  pack_id VARCHAR(36) NOT NULL,
  created_by VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pack_id) REFERENCES packs(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert initial admin user (password: admin123)
INSERT INTO users (id, username, email, password, type)
VALUES (UUID(), 'admin', 'admin@example.com', '$2b$10$0GyLHkMrQIJKii.ksNMcQ.V/hL3V4ZBRRoJtY.MeYg.JYY4YNOFhG', 'admin')
ON DUPLICATE KEY UPDATE username = username;

-- Insert initial packs
SET @admin_id = (SELECT id FROM users WHERE username = 'admin' LIMIT 1);

-- Pack 1: Fun with Friends
INSERT INTO packs (id, name, description, created_by)
VALUES (UUID(), 'Fun with Friends', 'Perfect for a night in with your closest friends', @admin_id)
ON DUPLICATE KEY UPDATE name = name;

SET @pack1_id = (SELECT id FROM packs WHERE name = 'Fun with Friends' LIMIT 1);

-- Pack 2: Party Game
INSERT INTO packs (id, name, description, created_by)
VALUES (UUID(), 'Party Game', 'Spice up any gathering with these exciting challenges', @admin_id)
ON DUPLICATE KEY UPDATE name = name;

SET @pack2_id = (SELECT id FROM packs WHERE name = 'Party Game' LIMIT 1);

-- Pack 3: Ice Breakers
INSERT INTO packs (id, name, description, created_by)
VALUES (UUID(), 'Ice Breakers', 'Get to know new friends with this gentle starter pack', @admin_id)
ON DUPLICATE KEY UPDATE name = name;

SET @pack3_id = (SELECT id FROM packs WHERE name = 'Ice Breakers' LIMIT 1);

-- Cards for Pack 1: Fun with Friends
INSERT INTO cards (content, type, pack_id, created_by) VALUES
('What is your biggest fear?', 'truth', @pack1_id, @admin_id),
('What was your most embarrassing moment?', 'truth', @pack1_id, @admin_id),
('Who is your secret crush?', 'truth', @pack1_id, @admin_id),
('Dance to your favorite song', 'dare', @pack1_id, @admin_id),
('Call a random contact and sing them happy birthday', 'dare', @pack1_id, @admin_id),
('Do your best impression of someone in the room', 'dare', @pack1_id, @admin_id);

-- Cards for Pack 2: Party Game
INSERT INTO cards (content, type, pack_id, created_by) VALUES
('What is the craziest thing you've ever done?', 'truth', @pack2_id, @admin_id),
('Have you ever pretended to be sick to avoid an event?', 'truth', @pack2_id, @admin_id),
('What is your most unusual talent?', 'truth', @pack2_id, @admin_id),
('Do a handstand against the wall', 'dare', @pack2_id, @admin_id),
('Exchange clothes with the person on your right', 'dare', @pack2_id, @admin_id),
('Let someone draw on your face', 'dare', @pack2_id, @admin_id);

-- Cards for Pack 3: Ice Breakers
INSERT INTO cards (content, type, pack_id, created_by) VALUES
('What is your favorite movie?', 'truth', @pack3_id, @admin_id),
('What superpower would you choose?', 'truth', @pack3_id, @admin_id),
('What is your dream vacation?', 'truth', @pack3_id, @admin_id),
('Tell a joke to the group', 'dare', @pack3_id, @admin_id),
('Give a compliment to everyone in the room', 'dare', @pack3_id, @admin_id),
('Take a silly selfie with the person to your left', 'dare', @pack3_id, @admin_id); 