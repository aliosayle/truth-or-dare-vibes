import { pool } from '../config/db.config';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

async function createTestUser() {
  try {
    // Test user data
    const id = uuidv4();
    const username = 'testuser';
    const email = 'test@example.com';
    const password = 'password123';
    const type = 'admin';
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Check if user already exists
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );
    
    if ((existingUsers as any[]).length > 0) {
      console.log('User already exists, skipping creation');
      console.log('Test user credentials:');
      console.log('Email:', email);
      console.log('Password:', password);
      return;
    }
    
    // Create user
    await pool.query(
      'INSERT INTO users (id, username, email, password, type) VALUES (?, ?, ?, ?, ?)',
      [id, username, email, hashedPassword, type]
    );
    
    console.log('Test user created successfully!');
    console.log('Test user credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Verify user was created
    const [users] = await pool.query(
      'SELECT id, username, email, type FROM users WHERE email = ?',
      [email]
    );
    
    console.log('User in database:', (users as any[])[0]);
    
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    // Close the connection pool
    pool.end();
  }
}

// Run the function
createTestUser(); 