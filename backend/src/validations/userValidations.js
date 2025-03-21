const Joi = require('joi');

const registerUserSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])'))
      .required()
      .messages({
        'string.pattern.base': 'A palavra-passe deve conter pelo menos uma letra minúscula, uma maiúscula, um número e um símbolo especial.',
        'string.min': 'A palavra-passe deve ter no mínimo 8 caracteres.',
        'string.empty': 'A palavra-passe é obrigatória.'
      })
  });

const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = { registerUserSchema, loginUserSchema };