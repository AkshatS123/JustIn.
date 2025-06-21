import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { AppError } from './errorHandler.js';

export const verifySupabaseWebhook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const signature = req.headers['x-supabase-signature'] as string;
    const timestamp = req.headers['x-supabase-timestamp'] as string;
    
    if (!signature || !timestamp) {
      return next(new AppError(401, 'Missing Supabase webhook signature'));
    }

    // Create the payload string
    const payload = timestamp + '.' + JSON.stringify(req.body);
    
    // Create HMAC signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.SUPABASE_JWT_SECRET!)
      .update(payload)
      .digest('hex');

    // Compare signatures
    if (signature !== expectedSignature) {
      return next(new AppError(401, 'Invalid webhook signature'));
    }

    // Check if timestamp is recent (within 5 minutes)
    const timestampMs = parseInt(timestamp) * 1000;
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;

    if (now - timestampMs > fiveMinutes) {
      return next(new AppError(401, 'Webhook timestamp too old'));
    }

    next();
  } catch (error) {
    console.error('Webhook verification error:', error);
    next(new AppError(500, 'Webhook verification failed'));
  }
}; 