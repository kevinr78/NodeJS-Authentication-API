const Joi = require("joi");
/* using JOI validation */
const registerValidation = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{6,16}$/)
    .required()
    .min(6),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{6,16}$/)
    .required()
    .min(6),
});

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
