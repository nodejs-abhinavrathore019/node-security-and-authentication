import Joi from 'joi';

const createAPIKeySchema = Joi.object({
  name: Joi.string(),
  debug: Joi.boolean().optional(),
});

export {
  createAPIKeySchema,
};
