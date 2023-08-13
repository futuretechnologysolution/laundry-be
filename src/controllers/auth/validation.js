import Joi from 'joi';

export default {
  login: {
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
};
