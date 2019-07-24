import express from 'express';
import cors from 'cors';
import { router as productsRouter } from './routes/products';
import { logErrors, xhrErrorHandler, errorHandler } from './middlewares/error';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/products', productsRouter);

app.use(logErrors);
app.use(xhrErrorHandler);
app.use(errorHandler);

export { app };
