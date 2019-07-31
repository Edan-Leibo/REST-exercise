import joi from 'joi';
const ID_LENGTH = 36;

export const idSchema = joi.string().length(ID_LENGTH);
