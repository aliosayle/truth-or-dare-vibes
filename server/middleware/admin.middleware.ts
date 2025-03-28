import { Request, Response, NextFunction } from 'express';

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.type !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}; 