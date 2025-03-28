#!/bin/bash
# Fix authentication issues

echo "Diagnosing auth controller paths..."

# Check where the source code actually is
if [ -d "src/controllers" ]; then
  CONTROLLERS_DIR="src/controllers"
elif [ -d "controllers" ]; then
  CONTROLLERS_DIR="controllers"
else
  echo "Error: Cannot find controllers directory"
  exit 1
fi

echo "Controllers found in: $CONTROLLERS_DIR"

# Create a patched version of the auth controller
# This adds extensive debugging and fixes potential issues
cat > "${CONTROLLERS_DIR}/auth.controller.ts.new" << 'EOF'
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';

export const register = async (req: Request, res: Response) => {
  try {
    console.log('\n[REGISTER] Request Body:', JSON.stringify(req.body));
    const { username, email, password, type = 'normal' } = req.body;

    if (!username || !email || !password) {
      console.log('[REGISTER] Missing required fields');
      return res.status(400).json({ message: 'Username, email and password are required' });
    }

    // Check if user already exists
    console.log(`[REGISTER] Checking if user exists: ${email}`);
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if ((existingUsers as any[]).length > 0) {
      console.log('[REGISTER] User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    console.log('[REGISTER] Hashing password');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate UUID
    console.log('[REGISTER] Generating UUID');
    const [uuidResult] = await pool.query('SELECT UUID() as uuid');
    const userId = (uuidResult as any[])[0].uuid;
    console.log(`[REGISTER] Generated UUID: ${userId}`);

    // Create user
    console.log('[REGISTER] Creating user in database');
    await pool.query(
      'INSERT INTO users (id, username, email, password, type) VALUES (?, ?, ?, ?, ?)',
      [userId, username, email, hashedPassword, type]
    );

    // Get the newly created user
    console.log('[REGISTER] Fetching created user');
    const [newUser] = await pool.query(
      'SELECT id, username, email, type FROM users WHERE id = ?',
      [userId]
    );

    const user = (newUser as any[])[0];
    console.log(`[REGISTER] User created: ${user.username} (${user.email})`);

    // Generate JWT token
    console.log('[REGISTER] Generating JWT token');
    const token = jwt.sign(
      { userId: user.id, type: user.type },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token
    });
  } catch (error) {
    console.error('[REGISTER] Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log('\n[LOGIN] Request Headers:', JSON.stringify(req.headers));
    console.log('[LOGIN] Request Body:', JSON.stringify(req.body));
    
    // Extract email and password with fallbacks to empty string
    let email = '';
    let password = '';
    
    if (typeof req.body === 'string') {
      try {
        // Try to parse JSON string
        console.log('[LOGIN] Body is string, attempting to parse as JSON');
        const parsedBody = JSON.parse(req.body);
        email = parsedBody.email || '';
        password = parsedBody.password || '';
      } catch (e) {
        console.log('[LOGIN] Failed to parse body as JSON:', e);
      }
    } else if (req.body && typeof req.body === 'object') {
      email = req.body.email || '';
      password = req.body.password || '';
    }
    
    console.log(`[LOGIN] Extracted credentials - Email: ${email}, Password: ${password ? '[REDACTED]' : 'missing'}`);

    if (!email || !password) {
      console.log('[LOGIN] Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    console.log(`[LOGIN] Searching for user: ${email}`);
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    console.log(`[LOGIN] DB query complete, found ${(users as any[]).length} users`);

    if ((users as any[]).length === 0) {
      console.log('[LOGIN] No user found with this email');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = (users as any[])[0];
    console.log(`[LOGIN] User found: ${user.username} (${user.id})`);

    // Check password
    console.log('[LOGIN] Verifying password');
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(`[LOGIN] Password validation result: ${isValidPassword}`);
    
    if (!isValidPassword) {
      console.log('[LOGIN] Invalid password');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    console.log('[LOGIN] Generating JWT token');
    const token = jwt.sign(
      { userId: user.id, type: user.type },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    console.log('[LOGIN] Token generated');

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    console.log('[LOGIN] Login successful, sending response');
    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('[LOGIN] Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    console.log('\n[GET_USER] Request Headers:', JSON.stringify(req.headers));
    
    // User ID is set by auth middleware
    const userId = req.user?.id;
    console.log(`[GET_USER] User ID from middleware: ${userId}`);

    if (!userId) {
      console.log('[GET_USER] No user ID in request');
      return res.status(401).json({ message: 'Authentication required' });
    }

    console.log(`[GET_USER] Fetching user with ID: ${userId}`);
    const [users] = await pool.query(
      'SELECT id, username, email, type FROM users WHERE id = ?',
      [userId]
    );

    if ((users as any[]).length === 0) {
      console.log('[GET_USER] User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('[GET_USER] User found, sending response');
    res.json((users as any[])[0]);
  } catch (error) {
    console.error('[GET_USER] Error:', error);
    res.status(500).json({ message: 'Server error while fetching user' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    console.log('\n[GET_ALL_USERS] Fetching all users');
    const [users] = await pool.query(
      'SELECT id, username, email, type FROM users'
    );

    console.log(`[GET_ALL_USERS] Found ${(users as any[]).length} users`);
    res.json(users);
  } catch (error) {
    console.error('[GET_ALL_USERS] Error:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    console.log(`\n[UPDATE_USER] Updating user: ${id}, new type: ${type}`);

    const [result] = await pool.query(
      'UPDATE users SET type = ? WHERE id = ?',
      [type, id]
    );

    if ((result as any).affectedRows === 0) {
      console.log('[UPDATE_USER] User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('[UPDATE_USER] User updated, fetching updated data');
    const [users] = await pool.query(
      'SELECT id, username, email, type FROM users WHERE id = ?',
      [id]
    );

    console.log('[UPDATE_USER] Sending response');
    res.json((users as any[])[0]);
  } catch (error) {
    console.error('[UPDATE_USER] Error:', error);
    res.status(500).json({ message: 'Server error while updating user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`\n[DELETE_USER] Deleting user: ${id}`);

    const [result] = await pool.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    );

    if ((result as any).affectedRows === 0) {
      console.log('[DELETE_USER] User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('[DELETE_USER] User deleted successfully');
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('[DELETE_USER] Error:', error);
    res.status(500).json({ message: 'Server error while deleting user' });
  }
};
EOF

# Backup original auth controller
mv "${CONTROLLERS_DIR}/auth.controller.ts" "${CONTROLLERS_DIR}/auth.controller.ts.bak"

# Apply the patched version
mv "${CONTROLLERS_DIR}/auth.controller.ts.new" "${CONTROLLERS_DIR}/auth.controller.ts"

echo "Fixed auth controller with enhanced debugging"
echo "Original controller backed up as ${CONTROLLERS_DIR}/auth.controller.ts.bak"
echo ""
echo "Please restart the server with: npm run dev" 