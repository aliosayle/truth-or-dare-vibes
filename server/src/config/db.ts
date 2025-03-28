import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from root server directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

console.log('DB CONFIG LOADING from src/config/db.ts');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

export const pool = mysql.createPool({
  host: '127.0.0.1', // Force IPv4 rather than IPv6 localhost
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'goldfish',
  database: process.env.DB_NAME || 'truth_or_dare',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('Database pool created in src/config/db.ts with HARDCODED host: 127.0.0.1');

export default pool; 