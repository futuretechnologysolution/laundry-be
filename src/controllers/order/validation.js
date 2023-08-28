import Joi from 'joi';

export default {
  store: {
    body: Joi.object().keys({
      serviceId: Joi.number().required(),
      customer: Joi.object().keys({
        id: Joi.string().uuid(),
        name: Joi.string().when('id', { is: '', then: Joi.required }),
        phone: Joi.string().when('id', { is: '', then: Joi.required }),
        address: Joi.string().when('id', { is: '', then: Joi.required }),
        email: Joi.string().when('id', { is: '', then: Joi.required }),
      }),
      totalWeight: Joi.number().precision(3).required(),
    }),
  },
  update: {
    params: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
    body: Joi.object().keys({
      status: Joi.string().required(),
    }),
  },
};
