import { Request, Response, NextFunction } from 'express';
import { InputValidationError } from '../../models';

export function InputValidationErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof InputValidationError) {
    res.status(err.statusCode).send(err.message);
    return;
  } else {
    next(err);
  }
}
