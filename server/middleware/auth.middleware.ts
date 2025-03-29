import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';

interface JwtPayload {
  userId: string;
  type: string;
}

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        type: string;
      };
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Authentication middleware - Headers:', req.headers);
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    
    if (!token) {
      console.log('Authentication failed: No token provided');
      return res.status(401).json({ message: 'Authentication required' });
    }

    console.log('Token present, verifying...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;
    console.log('Token decoded:', { userId: decoded.userId, type: decoded.type });
    
    // Get user from database to ensure they still exist
    const [users] = await pool.query('SELECT id, type FROM users WHERE id = ?', [decoded.userId]);
    console.log('User lookup result:', users);
    const user = (users as any[])[0];

    if (!user) {
      console.log('Authentication failed: User not found in database');
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = {
      id: user.id,
      type: user.type
    };
    console.log('Authentication successful for user:', { id: user.id, type: user.type });

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ 
      message: 'Invalid token',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const authorize = (allowedTypes: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!allowedTypes.includes(req.user.type)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
}; 