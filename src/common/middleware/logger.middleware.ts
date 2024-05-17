import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  // console.log(req.headers)
  console.log(req.headers.origin);
  next();
};