import { Request, Response, NextFunction } from 'express';

export function validateId(req: Request, res: Response, next: NextFunction) {
    if (req.params.id.length !== 36) {
        res.status(400).send('id does not contain 36 characters');
        return;
    }
    next();
}
