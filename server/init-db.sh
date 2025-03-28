#!/bin/bash

# Run the SQL file to create and populate the database
mysql -u root < database.sql

echo "Database initialized successfully!" 