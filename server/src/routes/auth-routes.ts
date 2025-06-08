import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body; // Extract username and password from the request body

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' }); // User not found
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' }); // Password mismatch
    }

    // Create a JWT token
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET as string, {
      expiresIn: '1h', // Token expiration time
    });

    // Return the token to the client
    return res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error.' }); // Handle server errors
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
