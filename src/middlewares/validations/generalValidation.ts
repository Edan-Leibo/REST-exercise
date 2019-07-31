import { InputValidationError } from './../../models/errors/inputValidationError';
import { Request, Response, NextFunction } from 'express';

export function validateId(req: Request, res: Response, next: NextFunction) {
    if (req.params.id.length !== 36) {
        next(new InputValidationError('id does not contain 36 characters', 400));
        return;
    }
    next();
}
