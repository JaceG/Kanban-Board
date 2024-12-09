import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { authenticateToken } from '../middleware/auth';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token

  // Extract the username and password from the request body
  const username = req.body.username;
  const password = req.body.password;

  // Find the user in the database by username
  const user = await User.findOne({ where: { username } });

  // If the user does not exist, respond with a 401 status and a message indicating invalid credentials
  if (user === null) {
    return res.status(401).json({ message: 'Invalid credentials' });
  } else {
    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If the password does not match, respond with a 401 status and a message indicating invalid credentials
    if (!isMatch) {
      return res.status(401.json({ message: 'Invalid credentials' });
    }

    // If the password matches, generate a JWT token with the username and user ID as payload
    const token = jwt.sign(
      {
        username,
        userId: user.id.toString()
      },
      process.env.JWT_SECRET_KEY || '', // Use the secret key from environment variables
      { expiresIn: '1h' } // Set the token to expire in 1 hour
    );

    // Respond with a 200 status and the generated token
    return res.status(200.json({ token });
  }
};

const router = Router();

// POST /login Route to login a user
router.post('/login', login);

export default router;
