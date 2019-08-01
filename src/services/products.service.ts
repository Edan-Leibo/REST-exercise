import { uuid } from '../utils/gen';
import { Product } from '../models';
import { productsState } from '../store';

function getAll(): Product[] {
    return productsState;
}

function getAllByCategoryId(categoryId: string): Product[] {
    return productsState.filter(p => p.categoryId === categoryId);
}

async function getById(id: string): Promise<Product | undefined> {
    return Promise.resolve(productsState.find(p => p.id === id));
}

function add(product: Product): Product {
    product.id = uuid();
    productsState.push(product);
    return product;
}

async function update(product: Product): Promise<Product | undefined> {
    const existing = await getById(product.id);
    if (!existing) return;

    Object.assign(existing, product);
    return existing;
}

function remove(id: string): Product | undefined {
    const existingIndex = productsState.findIndex(o => o.id === id);
    if (existingIndex < 0) return;

    const removed = productsState.splice(existingIndex, 1);
    return removed[0];
}

export default {
    getAll,
    getAllByCategoryId,
    getById,
    add,
    update,
    remove,
};
