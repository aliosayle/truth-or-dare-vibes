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

// CORS configuration
const corsOptions = {
  origin: ['http://161.97.177.233:3000', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
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