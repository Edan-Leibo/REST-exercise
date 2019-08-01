import path from 'path';
import express from 'express';
import cors from 'cors';
import { router as productsRouter } from './routes/products';
import { router as categoriesRouter } from './routes/categories';
import { InputValidationErrorHandler } from './middlewares/errors/input.error';
import { initConfig } from './utils/config';

initConfig();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

app.use(InputValidationErrorHandler);

export { app };
