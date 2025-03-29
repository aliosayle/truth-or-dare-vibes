import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';

interface JwtPayload {
  id: string;
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
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;
    
    // Get user from database to ensure they still exist
    const [users] = await pool.query('SELECT id, type FROM users WHERE id = ?', [decoded.id]);
    const user = (users as any[])[0];

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = {
      id: user.id,
      type: user.type
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (allowedTypes: string[] | string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const types = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes];
    
    if (!types.includes(req.user.type)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
}; 