import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import packRoutes from './routes/pack.routes';
import cardRoutes from './routes/card.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://161.97.177.233:5173'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/packs', packRoutes);
app.use('/api/cards', cardRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(Number(port), '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
}); 