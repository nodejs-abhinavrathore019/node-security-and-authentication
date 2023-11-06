import Joi from 'joi';

const signInSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
  debug: Joi.boolean().optional(),
});

export {
  signInSchema,
};
