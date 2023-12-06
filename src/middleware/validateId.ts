
import { Request, Response, NextFunction } from 'express'


 export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  if (!id) {
      return res.status(404).json({ error: 'Id is required' })
  }
  next()
  
};