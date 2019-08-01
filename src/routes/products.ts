import { validateId, validateProductName } from '../middlewares/validations';
import * as productsController from '../controllers/products.controller';
import { Router } from 'express';
import { wrapAsyncAndSend } from '../utils/wrappers';

const router = Router();

router.get('/', productsController.getAll);

router.get('/:id',
  validateId,
  wrapAsyncAndSend(productsController.getById),
);

router.post('/',
  validateProductName,
  productsController.add,
);

router.put('/:id',
  validateId,
  validateProductName,
  wrapAsyncAndSend(productsController.update),
);

router.delete('/:id',
  validateId,
  productsController.remove,
);

export { router };
