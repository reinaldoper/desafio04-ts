const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express'

 export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, 'token', (err: any) => {
    if (err) {
      return res.status(403).json({ message: 'Falha na autenticação do token' });
    }
    next();
  });
};


