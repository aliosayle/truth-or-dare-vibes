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

// Configure CORS with detailed logging
const corsOptions = {
  origin: function(origin: any, callback: any) {
    console.log('CORS Request from origin:', origin);
    callback(null, true); // allow all origins for debugging
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, { 
    body: req.method !== 'GET' ? req.body : undefined,
    headers: req.headers.origin
  });
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/packs', packRoutes);
app.use('/api/cards', cardRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
}); 