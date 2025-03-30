-- Enhanced database script with diverse packs and Lana easter eggs
-- Use the truth_or_dare database
USE truth_or_dare;

-- First clean up existing packs and cards (except Lana's special pack)
-- Keep Lana's special pack
SET @lana_id = (SELECT id FROM users WHERE email = 'lana@lebanese-vibes.com');
SET @lana_pack_id = (SELECT id FROM packs WHERE name = 'Lana\'s Special Pack');

-- Delete other cards and packs
DELETE FROM cards WHERE packId NOT IN (SELECT id FROM packs WHERE name = 'Lana\'s Special Pack');
DELETE FROM packs WHERE name NOT IN ('Lana\'s Special Pack');

-- Create diverse new packs
INSERT INTO packs (id, name, description, created_by) VALUES
(UUID(), 'Party Starters', 'Break the ice and get the party going with these fun challenges!', @lana_id),
(UUID(), 'Deep Connections', 'Go beyond small talk with these thought-provoking questions', @lana_id),
(UUID(), 'Adventure Time', 'Push boundaries and create memories with exciting dares', @lana_id),
(UUID(), 'Foodies Delight', 'For the culinary adventurers and food lovers', @lana_id),
(UUID(), 'Digital Age', 'Social media and tech-inspired challenges for the modern world', @lana_id);

-- Store pack IDs for later use
SET @party_pack_id = (SELECT id FROM packs WHERE name = 'Party Starters');
SET @deep_pack_id = (SELECT id FROM packs WHERE name = 'Deep Connections');
SET @adventure_pack_id = (SELECT id FROM packs WHERE name = 'Adventure Time');
SET @food_pack_id = (SELECT id FROM packs WHERE name = 'Foodies Delight');
SET @digital_pack_id = (SELECT id FROM packs WHERE name = 'Digital Age');

-- Add cards to Party Starters pack (with Lebanese twist and Lana easter eggs)
INSERT INTO cards (id, type, content, packId, created_by) VALUES
(UUID(), 'truth', 'What\'s the most embarrassing song on your playlist?', @party_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s your favorite Middle Eastern song to dance to?', @party_pack_id, @lana_id),
(UUID(), 'truth', 'If you were a Lebanese street food, what would you be and why?', @party_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s your go-to karaoke song?', @party_pack_id, @lana_id),
(UUID(), 'truth', 'If Lana were here right now, what would you want to tell her?', @party_pack_id, @lana_id), -- Easter egg
(UUID(), 'dare', 'Show us your best dabke dance move', @party_pack_id, @lana_id),
(UUID(), 'dare', 'Take a selfie with an imaginary celebrity', @party_pack_id, @lana_id),
(UUID(), 'dare', 'Text the 5th person in your contacts a Lebanese greeting', @party_pack_id, @lana_id),
(UUID(), 'dare', 'Do your best impression of someone in the room', @party_pack_id, @lana_id),
(UUID(), 'dare', 'Draw "L.A.N.A" on your palm and show everyone', @party_pack_id, @lana_id); -- Easter egg

-- Add cards to Deep Connections pack
INSERT INTO cards (id, type, content, packId, created_by) VALUES
(UUID(), 'truth', 'What life experience has shaped you the most?', @deep_pack_id, @lana_id),
(UUID(), 'truth', 'What cultural tradition from your heritage do you value most?', @deep_pack_id, @lana_id),
(UUID(), 'truth', 'If you could have dinner with anyone from Lebanese history, who would it be?', @deep_pack_id, @lana_id),
(UUID(), 'truth', 'What dream are you still chasing?', @deep_pack_id, @lana_id),
(UUID(), 'truth', 'Name someone whose name starts with L who changed your life', @deep_pack_id, @lana_id), -- Easter egg
(UUID(), 'truth', 'What\'s a secret skill you have that not many people know about?', @deep_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s your favorite memory from a trip you\'ve taken?', @deep_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s something you wish people understood about you?', @deep_pack_id, @lana_id),
(UUID(), 'truth', 'What foreign language would you love to master and why?', @deep_pack_id, @lana_id),
(UUID(), 'truth', 'Four-letter names often have the most beautiful meaning. What\'s your favorite?', @deep_pack_id, @lana_id); -- Easter egg

-- Add cards to Adventure Time pack
INSERT INTO cards (id, type, content, packId, created_by) VALUES
(UUID(), 'dare', 'Call a restaurant and ask if they deliver to the Cedar mountains of Lebanon', @adventure_pack_id, @lana_id),
(UUID(), 'dare', 'Go outside and howl at the moon for 10 seconds', @adventure_pack_id, @lana_id),
(UUID(), 'dare', 'Speak with a Lebanese accent for the next 3 rounds', @adventure_pack_id, @lana_id),
(UUID(), 'dare', 'Message someone you haven\'t talked to in months', @adventure_pack_id, @lana_id),
(UUID(), 'dare', 'Write a haiku about someone named Lana', @adventure_pack_id, @lana_id), -- Easter egg
(UUID(), 'dare', 'Try to sell a random object to the group like you\'re in a Lebanese market', @adventure_pack_id, @lana_id),
(UUID(), 'dare', 'Call someone on speaker and tell them you miss them', @adventure_pack_id, @lana_id),
(UUID(), 'dare', 'Do your best celebrity impression', @adventure_pack_id, @lana_id),
(UUID(), 'dare', 'Show the last 5 photos in your camera roll', @adventure_pack_id, @lana_id),
(UUID(), 'dare', 'Take a selfie with everyone and caption it "With my favorite L-A-N-A fans"', @adventure_pack_id, @lana_id); -- Easter egg

-- Add cards to Foodies Delight pack
INSERT INTO cards (id, type, content, packId, created_by) VALUES
(UUID(), 'truth', 'What\'s the strangest food you\'ve ever eaten?', @food_pack_id, @lana_id),
(UUID(), 'truth', 'Do you think hummus should have olive oil on top? Defend your answer!', @food_pack_id, @lana_id),
(UUID(), 'truth', 'What food reminds you of your childhood?', @food_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s one food you refuse to try?', @food_pack_id, @lana_id),
(UUID(), 'truth', 'If your taste in food spelled a four-letter name, what would it be?', @food_pack_id, @lana_id), -- Easter egg
(UUID(), 'dare', 'Mix three condiments from the kitchen and take a small taste', @food_pack_id, @lana_id),
(UUID(), 'dare', 'Blindfolded, try to identify a food item chosen by the group', @food_pack_id, @lana_id),
(UUID(), 'dare', 'Eat something with your hands behind your back', @food_pack_id, @lana_id),
(UUID(), 'dare', 'Try to describe the perfect shawarma without using the words "meat" or "bread"', @food_pack_id, @lana_id),
(UUID(), 'dare', 'Come up with a recipe and name it "Lana\'s Special"', @food_pack_id, @lana_id); -- Easter egg

-- Add cards to Digital Age pack
INSERT INTO cards (id, type, content, packId, created_by) VALUES
(UUID(), 'truth', 'What\'s your most embarrassing online purchase?', @digital_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s the longest you\'ve gone without checking your phone?', @digital_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s a social media trend you secretly enjoy?', @digital_pack_id, @lana_id),
(UUID(), 'truth', 'If your internet search history was made public, what would be most embarrassing?', @digital_pack_id, @lana_id),
(UUID(), 'truth', 'If you could follow only one person on social media whose name starts with L, who would it be?', @digital_pack_id, @lana_id), -- Easter egg
(UUID(), 'dare', 'Let someone send a message from your social media account', @digital_pack_id, @lana_id),
(UUID(), 'dare', 'Make up a TikTok dance on the spot and perform it', @digital_pack_id, @lana_id),
(UUID(), 'dare', 'Send the 7th person in your contact list a voice message singing a Lebanese song', @digital_pack_id, @lana_id),
(UUID(), 'dare', 'Take a selfie with an exaggerated filter and make it your profile picture for 10 minutes', @digital_pack_id, @lana_id),
(UUID(), 'dare', 'Create a four-panel comic strip about someone named Lana', @digital_pack_id, @lana_id); -- Easter egg

-- Update Lana's Special Pack with more interesting cards
INSERT INTO cards (id, type, content, packId, created_by) VALUES
(UUID(), 'truth', 'What\'s your dream travel destination?', @lana_pack_id, @lana_id),
(UUID(), 'truth', 'What\'s the most daring thing you\'ve done this year?', @lana_pack_id, @lana_id),
(UUID(), 'truth', 'If your life had a theme song, what would it be?', @lana_pack_id, @lana_id),
(UUID(), 'truth', 'If you were stranded on an island with one person in this room, who would you pick?', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Show us your hidden talent', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Swap clothes with someone in the room for the next round', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Let someone go through your phone for 30 seconds', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Do your best runway walk across the room', @lana_pack_id, @lana_id);

-- Add some super-secret Lana easter egg cards (rare special cards that only appear sometimes)
INSERT INTO cards (id, type, content, packId, created_by) VALUES
(UUID(), 'truth', 'If Lana were a superhero, what would her superpower be?', @lana_pack_id, @lana_id),
(UUID(), 'truth', 'Connect the four letters L-A-N-A to four qualities you admire in a person', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Write a short poem where each line starts with one letter from the name "LANA"', @lana_pack_id, @lana_id),
(UUID(), 'dare', 'Draw a star on your hand - it represents the brightest star named Lana', @lana_pack_id, @lana_id);

-- Print success message
SELECT 'Enhanced database with diverse packs and Lana easter eggs created successfully!' AS message; 