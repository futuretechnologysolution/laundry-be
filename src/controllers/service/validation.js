import Joi from 'joi';

export default {
  store: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      basePrice: Joi.number().required(),
      serviceTime: Joi.string().required(),
    }),
  },
  update: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      basePrice: Joi.number().required(),
      serviceTime: Joi.string().required(),
    }),
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
  },
  remove: {
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
  },
};
