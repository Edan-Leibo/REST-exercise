import { Request, Response, NextFunction, Router } from 'express';
import { Category } from '../models';
import { productsState, categoriesState } from '../store';
import uuidv1 from 'uuid/v1';
import { validateId } from '../middlewares/validations';

const router = Router();

router.get('/', (req, res) => {
    res.send(categoriesState);
});

router.get('/:id/products',
    validateId,
    findCategoryIndex,
    (req, res) => {
        const ans = productsState.filter(o => o.categoryId === req.params.id);
        res.send(ans);
    });

router.get('/:id',
    validateId,
    findCategoryIndex,
    (req, res) => {
        const { matchingIndex } = res.locals;
        res.send(categoriesState[matchingIndex]);
    });

router.post('/',
    (req, res) => {
        const category: Category = req.body;
        category.id = uuidv1();
        categoriesState.push(category);
        res.status(201).send(category);
    });

router.put('/:id',
    validateId,
    findCategoryIndex,
    (req, res) => {
        const { matchingIndex } = res.locals;
        const category: Category = req.body;
        category.id = req.params.id;
        categoriesState[matchingIndex] = category;
        res.send(category);
    },
);

router.delete('/:id',
    validateId,
    findCategoryIndex,
    (req, res) => {
        const { matchingIndex } = res.locals;
        categoriesState.splice(matchingIndex, 1);
        res.sendStatus(204);
    },
);

function findCategoryIndex(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const matchingIndex = categoriesState.findIndex(o => o.id === id);

    if (matchingIndex < 0) {
        res.sendStatus(404);
        return;
    }

    res.locals.matchingIndex = matchingIndex;
    next();
}

export { router };
