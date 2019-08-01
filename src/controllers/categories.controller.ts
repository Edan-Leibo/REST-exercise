import { Request, Response } from 'express';
import { Category } from '../models';
import categoriesService from '../services/categories.service';
import productsService from '../services/products.service';

export function getAll(req: Request, res: Response): void {
    const categories = categoriesService.getAll();
    res.send(categories);
}

export async function getById(req: Request, res: Response) {
    const id = req.params.id;
    const category = await categoriesService.getById(id);
    if (!category) {
        res.sendStatus(404);
        return;
    }
    return category;
}

export async function getAllProductsByCategoryId(req: Request, res: Response) {
    const id = req.params.id;
    const category = await categoriesService.getById(id);
    if (!category) {
        res.sendStatus(404);
        return;
    }
    const allProductsById = productsService.getAllByCategoryId(category.id);
    return allProductsById;
}

export function add(req: Request, res: Response): void {
    const category = req.body as Category;
    const added = categoriesService.add(category);
    res.status(201).send(added);
}

export async function update(req: Request, res: Response) {
    const id = req.params.id;
    const category = req.body as Category;
    category.id = id;
    const updated = await categoriesService.update(category);
    if (!updated) {
        res.sendStatus(404);
        return;
    }
    return updated;
}

export function remove(req: Request, res: Response): void {
    const id = req.params.id;
    const removed = categoriesService.remove(id);
    if (!removed) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
}
