import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log('======= DATABASE CONNECTION TEST =======');
console.log('Environment variables:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

async function testConnection() {
  console.log('Attempting to connect to database...');
  
  try {
    // Try with IPv4 address
    const pool = mysql.createPool({
      host: '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'goldfish',
      database: process.env.DB_NAME || 'truth_or_dare',
      waitForConnections: true,
      connectionLimit: 1,
      queueLimit: 0
    });
    
    console.log('Pool created with host: 127.0.0.1');
    
    // Test query
    const [rows] = await pool.query('SELECT 1 as test');
    console.log('Connection successful! Query result:', rows);
    
    // Try to get users table
    const [users] = await pool.query('SHOW TABLES LIKE "users"');
    const userTableExists = Array.isArray(users) && users.length > 0;
    console.log('Users table exists:', userTableExists);
    
    if (userTableExists) {
      const [userCount] = await pool.query('SELECT COUNT(*) as count FROM users');
      console.log('User count:', (userCount as any[])[0].count);
    }
    
    await pool.end();
    console.log('Connection pool closed');
  } catch (error) {
    console.error('Connection error:', error);
    
    // Try alternative connection with localhost
    console.log('\nTrying alternative connection with "localhost"...');
    try {
      const pool2 = mysql.createPool({
        host: 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'goldfish',
        database: process.env.DB_NAME || 'truth_or_dare',
        waitForConnections: true,
        connectionLimit: 1,
        queueLimit: 0
      });
      
      const [rows] = await pool2.query('SELECT 1 as test');
      console.log('Alternative connection successful! Query result:', rows);
      await pool2.end();
    } catch (error2) {
      console.error('Alternative connection error:', error2);
    }
  }
}

testConnection().then(() => {
  console.log('Test complete');
}).catch(err => {
  console.error('Test failed:', err);
}); 