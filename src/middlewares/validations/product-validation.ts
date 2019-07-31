import joi from 'joi';
import { InputValidationError } from '../../models';
import { Request, Response, NextFunction } from 'express';
import { productSchema } from './validation-schemas';

export function validateProductName(req: Request, res: Response, next: NextFunction) {
    const { error } = joi.validate(req.body, productSchema);
    console.log(error);
    if (error) {
        next(new InputValidationError('name must have at least 3 characters', 409));
        return;
    }
    next();
}