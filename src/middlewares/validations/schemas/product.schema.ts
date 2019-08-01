import joi from 'joi';

const NAME_MIN_LENGTH = 3;

export const productSchema = joi.object().keys({
    name: joi.string().min(NAME_MIN_LENGTH),
    categoryId: joi.string(),
    itemsInStock: joi.number(),
});
