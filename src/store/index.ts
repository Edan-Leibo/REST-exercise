import { Category } from './../models/category';
import { Product } from './../models/product';
import { createHttpClient } from '../utils/http-client';

let productsState: Product[] = [];
let categoriesState: Category[] = [];

async function loadData() {
    const httpClient = createHttpClient('http://localhost:3000/public');
    productsState = await httpClient.get('products.json');
    categoriesState = await httpClient.get('categories.json');
}

export { loadData, productsState, categoriesState };
