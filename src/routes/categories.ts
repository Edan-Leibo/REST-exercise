import { Router } from 'express';
import { validateId } from '../middlewares/validations';
import * as categoriesController from '../controllers/categories.controller';
import { wrapAsyncAndSend } from '../utils/wrappers';

const router = Router();

router.get('/', categoriesController.getAll);

router.get('/:id/products',
    validateId,
    wrapAsyncAndSend(categoriesController.getAllProductsByCategoryId),
);

router.get('/:id',
    validateId,
    wrapAsyncAndSend(categoriesController.getById),
);

router.post('/',
    categoriesController.add,
);

router.put('/:id',
    validateId,
    wrapAsyncAndSend(categoriesController.update),
);

router.delete('/:id',
    validateId,
    categoriesController.remove,
);

export { router };
