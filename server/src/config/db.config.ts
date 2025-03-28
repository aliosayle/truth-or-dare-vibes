import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'goldfish',
  database: process.env.DB_NAME || 'truth_or_dare',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test the connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

// Export the pool and test function
export { testConnection };
export default pool; 