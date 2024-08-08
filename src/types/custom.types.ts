import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken'; // or your specific payload type

// Define the JWT token payload interface
export interface JWTTokenPayload extends JwtPayload {
  id: string;
  email: string;
}

// Extend the Express Request type
export interface CustomRequest extends Request {
  user: JWTTokenPayload; // Make `user` optional if it might not always be set
}
