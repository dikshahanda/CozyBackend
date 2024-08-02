const Joi = require('joi');

const userRegistrationSchema = Joi.object().keys({
  userName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(8)
    .required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    // .options({ language: { any: { allowOnly: 'must match password' } } })
});

module.exports = userRegistrationSchema