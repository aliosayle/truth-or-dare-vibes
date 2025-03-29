import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import packRoutes from './routes/pack.routes';
import cardRoutes from './routes/card.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3001', 10);
const host = process.env.HOST || 'localhost';

// Middleware
app.use(cors());
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
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
}); 