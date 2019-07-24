import { Request, Response, NextFunction, Router } from 'express';
import { Product } from '../models';
import uuidv1 from 'uuid/v1';
import { productsState } from '../store';

const router = Router();

router.get('/', (req, res) => {
  res.send(productsState);
});

router.get('/:id',
  validateProductId,
  findProductIndex,
  (req, res) => {
    const { matchingIndex } = res.locals;
    res.send(productsState[matchingIndex]);
  });

router.post('/',
  validateProductName,
  (req, res) => {
    const product: Product = req.body;
    product.id = uuidv1();
    productsState.push(product);
    res.status(201).send(product);
  });

router.put('/:id',
  validateProductId,
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
  validateProductId,
  findProductIndex,
  (req, res) => {
    const { matchingIndex } = res.locals;
    productsState.splice(matchingIndex, 1);
    res.sendStatus(204);
  },
);

function findProductIndex(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const matchingIndex = productsState.findIndex(o => o.id === id);

  if (matchingIndex < 0) {
    res.sendStatus(404);
    return;
  }

  res.locals.matchingIndex = matchingIndex;
  next();
}

// validate function
function validateProductId(req: Request, res: Response, next: NextFunction) {
  if (req.params.id.length !== 36) {
    res.status(400).send('id does not contain 36 characters');
    return;
  }
  next();
}

function validateProductName(req: Request, res: Response, next: NextFunction) {
  if (req.params.name.length < 3) {
    res.status(409).send('name must have at least 3 characters');
    return;
  }
  next();
}

export { router };
