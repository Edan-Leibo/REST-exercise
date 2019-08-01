import { Request, Response } from 'express';
import { Product } from '../models';
import productsService from '../services/products.service';

export function getAll(req: Request, res: Response): void {
    const products = productsService.getAll();
    res.send(products);
}

export async function getById(req: Request, res: Response) {
    const id = req.params.id;
    const product = await productsService.getById(id);
    if (!product) {
        res.sendStatus(404);
        return;
    }
    return product;
}

export function add(req: Request, res: Response): void {
    const product = req.body as Product;
    const added = productsService.add(product);
    res.status(201).send(added);
}

export async function update(req: Request, res: Response) {
    const id = req.params.id;
    const product = req.body as Product;
    product.id = id;

    const updated = await productsService.update(product);
    if (!updated) {
        res.sendStatus(404);
        return;
    }
    return updated;
}

export function remove(req: Request, res: Response): void {
    const id = req.params.id;
    const removed = productsService.remove(id);
    if (!removed) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
}
