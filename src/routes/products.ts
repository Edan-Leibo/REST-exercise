import { Request, Response, NextFunction, Router } from 'express';
import { Product } from '../models';
import { uuid } from '../utils/gen';
import { productsState } from '../store';
import { validateId, validateProductName } from '../middlewares/validations';

function loadProducts(): Promise<Product[]> {
  return Promise.resolve(productsState);
}

const router = Router();

router.get('/', (req, res) => {
  res.send(productsState);
});

router.get('/:id',
  validateId,
  findProductIndex,
  (req, res) => {
    const { matchingIndex } = res.locals;
    res.send(productsState[matchingIndex]);
  });

router.post('/',
  validateProductName,
  (req, res) => {
    const product: Product = req.body;
    product.id = uuid();
    productsState.push(product);
    res.status(201).send(product);
  });

router.put('/:id',
  validateId,
  validateProductName,
  findProductIndex,
  (req, res) => {
    const { matchingIndex } = res.locals;
    const product: Product = req.body;
    product.id = req.params.id;
    productsState[matchingIndex] = product;
    res.send(product);
  },
);

router.delete('/:id',
  validateId,
  findProductIndex,
  (req, res) => {
    const { matchingIndex } = res.locals;
    productsState.splice(matchingIndex, 1);
    res.sendStatus(204);
  },
);

async function findProductIndex(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const productArr = await loadProducts();
    const matchingIndex = productArr.findIndex(o => o.id === id);

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
