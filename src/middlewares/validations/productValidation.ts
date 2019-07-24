import { Request, Response, NextFunction } from 'express';

export function validateProductName(req: Request, res: Response, next: NextFunction) {
    if (req.body.name.length < 3) {
        res.status(409).send('name must have at least 3 characters');
        return;
    }
    next();
}
