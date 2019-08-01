import { Request, Response, NextFunction } from 'express';

export function wrapAsyncAndSend(
    handler: (req: Request, res: Response, next?: NextFunction) => Promise<any>,
): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next?: NextFunction) => {
        handler(req, res, next)
            .then(o => {
                if (o) res.send(o);
            })
            .catch(next);
    };
}
