const Joi = require('joi');



const registerUserSchema = Joi.object({
  firstName: Joi.string().min(2).required().messages({
    'string.empty': 'O primeiro nome é obrigatório.',
    'string.min': 'O primeiro nome deve ter no mínimo 2 caracteres.',
  }),

  lastName: Joi.string().min(2).required().messages({
    'string.empty': 'O apelido é obrigatório.',
    'string.min': 'O apelido deve ter no mínimo 2 caracteres.',
  }),

  localidade: Joi.string().min(2).required().messages({
    'string.empty': 'A localidade é obrigatória.',
    'string.min': 'A localidade deve ter no mínimo 2 caracteres.',
  }),

  email: Joi.string().email().required().messages({
    'string.empty': 'O email é obrigatório.',
    'string.email': 'Formato de email inválido.',
  }),

  password: Joi.string().required().messages({
    'string.empty': 'A palavra-passe é obrigatória.'
  }),

  // ✅ Campo opcional, apenas aceitamos valores 1 (user) ou 2 (admin)
  nivelAcesso: Joi.number().valid(1, 2).optional()
});



const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = { registerUserSchema, loginUserSchema };