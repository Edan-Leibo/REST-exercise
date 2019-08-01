import { uuid } from '../utils/gen';
import { Category } from '../models';
import { categoriesState } from '../store';

function getAll(): Category[] {
    return categoriesState;
}

async function getById(id: string): Promise<Category | undefined> {
    return Promise.resolve(categoriesState.find(p => p.id === id));
}

function add(product: Category): Category {
    product.id = uuid();
    categoriesState.push(product);
    return product;
}

async function update(product: Category): Promise<Category | undefined> {
    const existing = await getById(product.id);
    if (!existing) return;

    Object.assign(existing, product);
    return existing;
}

function remove(id: string): Category | undefined {
    const existingIndex = categoriesState.findIndex(o => o.id === id);
    if (existingIndex < 0) return;

    const removed = categoriesState.splice(existingIndex, 1);
    return removed[0];
}

export default {
    getAll,
    getById,
    add,
    update,
    remove,
};
