const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express'

declare global {
  namespace Express {
    interface Request {
      authenticatedUser?: any;
    }
  }
}

 export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const user = jwt.verify(token, 'token' as string);
    req.authenticatedUser = user;
    next();
  } catch (e) {
    return res.status(403).json({
      "error": 'Expired or invalid token',
     });
  } 
};


