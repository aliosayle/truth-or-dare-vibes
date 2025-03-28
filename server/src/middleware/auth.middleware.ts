import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define what the token payload looks like
interface TokenPayload {
  id: string;
  username: string;
  email: string;
  type: string;
}

// Extend Express Request to include the user object
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

// JWT secret should come from environment variables in production
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN format
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const user = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}; 