import joi from 'joi';
import { InputValidationError } from '../../models/errors/inputValidationError';
import { Request, Response, NextFunction } from 'express';
import { idSchema } from './schemas';

export function validateId(req: Request, res: Response, next: NextFunction) {
    const { error } = joi.validate(req.params.id, idSchema);
    if (error) {
        next(new InputValidationError('id does not contain 36 characters', 400));
        return;
    }
    next();
}
