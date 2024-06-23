import Joi from 'joi';

export const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    city: Joi.string().required(),
    zipCode: Joi.string().required()
});

export const updateUserSchema = Joi.object({
    email: Joi.string().email(),
    name: Joi.string(),
    age: Joi.number(),
    city: Joi.string(),
    zipCode: Joi.string()
});

export const validateIdSchema = Joi.object({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
});
