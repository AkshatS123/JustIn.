import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import api from './api/index.js';
import { AppError, errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Security and CORS Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes.'
});
app.use('/api', limiter);

// Body Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Just In API is healthy',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', api);

// 404 Handler for API routes
app.use('/api/*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, 'The requested resource was not found on this server.'));
});

// Global Error Handling Middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔗 Connected to frontend at: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`🩺 Health check available at: http://localhost:${PORT}/api/health`);
});

export default app; 