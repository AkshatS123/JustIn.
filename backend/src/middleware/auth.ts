import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma.js';
import { AppError } from './errorHandler.js';

interface JwtPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError(401, 'You are not logged in. Please log in to get access.'));
    }

    // 1) Verify token
    const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET!) as JwtPayload;

    // 2) Check if user still exists
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.sub },
      select: { id: true, username: true, email: true }
    });

    if (!currentUser) {
      return next(new AppError(401, 'The user belonging to this token no longer exists.'));
    }

    // Grant access to protected route by attaching user to request
    req.user = currentUser;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new AppError(401, 'Invalid token. Please log in again.'));
    }
     if (err instanceof jwt.TokenExpiredError) {
      return next(new AppError(401, 'Your token has expired. Please log in again.'));
    }
    next(err);
  }
}; 