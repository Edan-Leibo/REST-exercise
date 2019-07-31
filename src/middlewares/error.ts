import { Request, Response, NextFunction } from 'express';
import { InputValidationError } from '../models';

export function InputValidationErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof InputValidationError) {
    res.status(err.statusCode).send(err.message);
    return;
  } else {
    next(err);
  }
}

export function xhrErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500);
  res.render('error', { error: err });
}
