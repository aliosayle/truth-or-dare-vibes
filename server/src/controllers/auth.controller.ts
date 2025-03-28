import { Request, Response } from 'express';
import * as userModel from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// JWT secret should come from environment variables in production
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    const user = await userModel.getUserByUsername(username);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, type: user.type },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Don't send the password back to the client
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};

// Register
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }
    
    // Check if username already exists
    const existingUser = await userModel.getUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    
    // Check if email already exists
    const existingEmail = await userModel.getUserByEmail(email);
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user with 'normal' type
    const newUser = await userModel.createUser({
      username,
      email,
      password: hashedPassword,
      type: 'normal'
    });
    
    // Create JWT token
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, email: newUser.email, type: newUser.type },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Don't send the password back to the client
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ message: 'Error during registration' });
  }
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const user = await userModel.getUserById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Don't send the password back to the client
    const { password: _, ...userWithoutPassword } = user;
    
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    res.status(500).json({ message: 'Error retrieving user data' });
  }
};

// Logout (client-side - just for API completeness)
export const logout = (req: Request, res: Response) => {
  // JWT tokens are stateless, so there's no server-side way to invalidate them
  // Client should discard the token
  res.json({ message: 'Logged out successfully' });
}; 