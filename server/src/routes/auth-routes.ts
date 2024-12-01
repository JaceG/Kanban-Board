import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token

  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ where: { username } });
if (user === null) {
  return res.status(401).json({ message: 'Invalid credentials' });
} else {

  const isMatch = await bcrypt.compare(password,user.password);

  if(!isMatch){
    return res.status(401).json({ message: 'Invalid credentials' });
   }

  const token = jwt.sign({
    username,
    userId:user.id.toString()
    },process.env.JWT_SECRET_KEY ?? '',{expiresIn: '1h'});
  
    return res.status(200).json({token}); 
}
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
