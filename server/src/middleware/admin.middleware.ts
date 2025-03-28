import { Request, Response, NextFunction } from 'express';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Check if user exists on the request (should be set by authenticateToken middleware)
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  // Check if user has admin type
  if (req.user.type !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  
  // User is authenticated and is an admin, proceed
  next();
}; 