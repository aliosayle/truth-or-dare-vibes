import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

// Database connection parameters
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'goldfish',
};

// Function to initialize the database
export async function initializeDatabase(): Promise<boolean> {
  console.log('Checking database...');
  
  try {
    // Create a connection without specifying a database
    const initialConnection = await mysql.createConnection(dbConfig);
    
    try {
      // Check if the database exists
      const [rows] = await initialConnection.execute(
        'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?',
        ['truth_or_dare']
      );
      
      const dbExists = Array.isArray(rows) && rows.length > 0;
      
      if (!dbExists) {
        console.log('Database does not exist. Creating...');
        
        // Create the database
        await initialConnection.execute('CREATE DATABASE IF NOT EXISTS truth_or_dare');
        console.log('Database created successfully.');
        
        // Read the SQL file with the schema and data
        const sqlPath = path.join(__dirname, '..', 'database.sql');
        const sqlContent = await readFile(sqlPath, 'utf8');
        
        // Connect to the newly created database
        await initialConnection.execute('USE truth_or_dare');
        
        // Split the SQL content by semicolons to execute each statement separately
        const statements = sqlContent.split(';').filter(stmt => stmt.trim().length > 0);
        
        for (const statement of statements) {
          await initialConnection.execute(statement);
        }
        
        console.log('Database schema and initial data imported successfully.');
      } else {
        console.log('Database already exists.');
      }
      
      await initialConnection.end();
      return true;
    } catch (error) {
      console.error('Error checking/creating database:', error);
      await initialConnection.end();
      return false;
    }
  } catch (error) {
    console.error('Error connecting to MySQL server:', error);
    return false;
  }
}

// Run the initialization if this file is executed directly
if (require.main === module) {
  initializeDatabase()
    .then(success => {
      if (success) {
        console.log('Database initialization completed successfully.');
      } else {
        console.error('Database initialization failed.');
        process.exit(1);
      }
    })
    .catch(err => {
      console.error('Unexpected error during database initialization:', err);
      process.exit(1);
    });
} 