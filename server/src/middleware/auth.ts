import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//   TODO: verify the token exists and add the user data to the request object
  const authHeader = req.get('authorization');

  if (!authHeader) {

    res.status(401).json({ message: 'No token provided' });
    return;

  }

  const token = authHeader.split(' ')[1];
  let decodedToken: JwtPayload;

  try {
    decodedToken = jwt.verify(token,'secret') as JwtPayload;
  } catch(err) {
        
    res.status(401).json({ message: 'Invalid token'});
    return;

  } 
  
  if(!decodedToken) {

    res.status(401).json({ message: 'Invalid token'});
    return;


  }
  req.body.username = decodedToken.username;
  next();
};


