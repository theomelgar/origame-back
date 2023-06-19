import Joi from 'joi';

export const createTutorialSchema = Joi.object({
  userId: Joi.number().required(),
  resultUrl: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  images: Joi.array().items(Joi.string()).required(),
  category: Joi.string().required(),
});
