import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string; // Adjust this based on your actual payload structure
}

interface JwtPayload {
  username: string; // Adjust this based on your actual payload structure
}

// Extend the Request interface to include the `user` property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Adjust the type based on your payload structure
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get the token part after "Bearer"

  if (!token) {
    res.sendStatus(401); // Unauthorized if no token is provided
    return; // Explicitly return to ensure all code paths return a value
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET as string, (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err) {
      res.sendStatus(403); // Forbidden if token is invalid
      return; // Explicitly return to ensure all code paths return a value
    }

    // If valid, attach the user data to the request object
    if (decoded) {
      req.user = decoded as JwtPayload; // Explicitly cast `decoded` to `JwtPayload`
      next(); // Call the next middleware or route handler
      return; // Explicitly return to ensure all code paths return a value
    } else {
      res.sendStatus(403); // Forbidden if decoded is undefined
      return; // Explicitly return to ensure all code paths return a value
    }
  });
};