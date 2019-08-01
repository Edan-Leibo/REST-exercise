import { Router } from 'express';
import { validateId, validateProduct } from '../middlewares/validations';
import * as productsController from '../controllers/products.controller';
import { wrapAsyncAndSend } from '../utils/wrappers';

const router = Router();

router.get('/', productsController.getAll);

router.get('/:id',
  validateId,
  wrapAsyncAndSend(productsController.getById),
);

router.post('/',
  validateProduct,
  productsController.add,
);

router.put('/:id',
  validateId,
  validateProduct,
  wrapAsyncAndSend(productsController.update),
);

router.delete('/:id',
  validateId,
  productsController.remove,
);

export { router };
