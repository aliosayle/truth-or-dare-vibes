-- Connect to the database
USE truth_or_dare;

-- Show the cards table structure to see the actual column name
DESCRIBE cards;

-- Show a sample of data from the cards table
SELECT * FROM cards LIMIT 5;

-- Fix the column name discrepancy in the model
-- Since the database has pack_id and the code expects packId, we need to update the code
-- But let's first create a query to get cards for a pack with the correct column name
SELECT * FROM cards WHERE pack_id = 'b48b4d44-0c25-11f0-9f14-0050565979e2'; 