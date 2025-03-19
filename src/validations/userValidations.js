const Joi = require('joi');

const registerUserSchema = Joi.object({
    nome: Joi.string().min(3).max(70).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])'))
        .required(),
});

const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = { registerUserSchema, loginUserSchema };