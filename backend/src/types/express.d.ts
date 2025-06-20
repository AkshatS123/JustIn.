// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

// Define a new interface for our custom user object
interface UserPayload {
  id: string;
  username: string;
  email: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: UserPayload;
    }
  }
} 