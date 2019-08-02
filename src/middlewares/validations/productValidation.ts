import joi from 'joi';
import { InputValidationError } from '../../models';
import { Request, Response, NextFunction } from 'express';
import { productSchema } from './schemas';

export function validateProduct(req: Request, res: Response, next: NextFunction) {
    const { error } = joi.validate(req.body, productSchema);
    if (error) {
        next(new InputValidationError('name must have at least 3 characters', 409));
        return;
    }
    next();
}
