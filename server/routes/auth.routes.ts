import { Router } from 'express';
import { register, login, getCurrentUser, getAllUsers, updateUser, deleteUser } from '../controllers/auth.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', authenticate, getCurrentUser);

// Admin routes
router.get('/users', authenticate, authorize(['admin']), getAllUsers);
router.put('/users/:id', authenticate, authorize(['admin']), updateUser);
router.delete('/users/:id', authenticate, authorize(['admin']), deleteUser);

export default router; 