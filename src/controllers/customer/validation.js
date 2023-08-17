import Joi from 'joi';

export default {
  store: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().allow(''),
      address: Joi.string().allow(''),
    }),
  },
  update: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().allow(''),
      address: Joi.string().allow(''),
    }),
    params: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  },
  delete: {
    params: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  },
};
