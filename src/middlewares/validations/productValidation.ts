import { InputValidationError } from './../../models';
import { Request, Response, NextFunction } from 'express';

export function validateProductName(req: Request, res: Response, next: NextFunction) {
    if (req.body.name.length < 3) {
        next(new InputValidationError('name must have at least 3 characters', 409));
        return;
    }
    next();
}
