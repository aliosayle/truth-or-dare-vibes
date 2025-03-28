import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, type = 'normal' } = req.body;

    // Check if user already exists
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if ((existingUsers as any[]).length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate UUID
    const [uuidResult] = await pool.query('SELECT UUID() as uuid');
    const userId = (uuidResult as any[])[0].uuid;

    // Create user
    await pool.query(
      'INSERT INTO users (id, username, email, password, type) VALUES (?, ?, ?, ?, ?)',
      [userId, username, email, hashedPassword, type]
    );

    // Get the newly created user
    const [newUser] = await pool.query(
      'SELECT id, username, email, type FROM users WHERE id = ?',
      [userId]
    );

    const user = (newUser as any[])[0];

    // Generate JWT token
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
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log('Login attempt with body:', JSON.stringify(req.body));
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    
    // Check what fields are received
    const { username, email, password } = req.body;
    console.log('Extracted fields:', { username, email, password: password ? '[REDACTED]' : undefined });

    // Validate required fields - try both email and username
    if ((!email && !username) || !password) {
      console.log('Missing login credentials in request body');
      return res.status(400).json({ 
        message: 'Login credentials and password are required',
        received: { 
          hasEmail: !!email, 
          hasUsername: !!username, 
          hasPassword: !!password 
        }
      });
    }

    // Find user by email or username
    console.log('Searching for user with email or username');
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email || '', username || '']
    );

    if ((users as any[]).length === 0) {
      console.log('No user found with provided credentials');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = (users as any[])[0];
    console.log('User found:', { 
      id: user.id, 
      username: user.username,
      email: user.email, 
      type: user.type,
      matchedByUsername: user.username === username,
      matchedByEmail: user.email === email
    });

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Password validation result:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('Invalid password for user:', user.email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, type: user.type },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    console.log('Login successful for user:', { id: user.id, email: user.email, username: user.username });
    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // User ID is set by auth middleware
    const userId = req.user?.id;

    const [users] = await pool.query(
      'SELECT id, username, email, type FROM users WHERE id = ?',
      [userId]
    );

    if ((users as any[]).length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json((users as any[])[0]);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error while fetching user' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const [users] = await pool.query(
      'SELECT id, username, email, type FROM users'
    );

    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    const [result] = await pool.query(
      'UPDATE users SET type = ? WHERE id = ?',
      [type, id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const [users] = await pool.query(
      'SELECT id, username, email, type FROM users WHERE id = ?',
      [id]
    );

    res.json((users as any[])[0]);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error while updating user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error while deleting user' });
  }
}; 