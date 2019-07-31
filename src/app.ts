import express from 'express';
import cors from 'cors';
import { router as productsRouter } from './routes/products';
import { router as categoriesRouter } from './routes/categories';
import { InputValidationErrorHandler, xhrErrorHandler, errorHandler } from './middlewares/error';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

app.use(InputValidationErrorHandler);
app.use(xhrErrorHandler);
app.use(errorHandler);

export { app };
