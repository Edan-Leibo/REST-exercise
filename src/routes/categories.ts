import { Request, Response, NextFunction, Router } from 'express';
import { Category } from '../models';
import { productsState, categoriesState } from '../store';
import { uuid } from '../utils/gen';
import { validateId } from '../middlewares/validations';

function loadCategories(): Promise<Category[]> {
    return Promise.resolve(categoriesState);
}

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
        category.id = uuid();
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

async function findCategoryIndex(req: Request, res: Response, next: NextFunction) {
    try {

        const id = req.params.id;
        const categoryArr = await loadCategories();
        const matchingIndex = categoryArr.findIndex(o => o.id === id);

        if (matchingIndex < 0) {
            res.sendStatus(404);
            return;
        }

        res.locals.matchingIndex = matchingIndex;
        next();
    } catch (err) {
        next(err);
    }
}

export { router };
