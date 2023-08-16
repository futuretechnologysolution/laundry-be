import logger from '../../libs/logger';
import { customJson } from '../../libs/utils';

const Controller = repositories => {
  const { userRepository } = repositories;

  const findAll = async (req, res, next) => {
    try {
      const result = await userRepository.findAll({ include: { all: true } });
      res.json(customJson(res.status, 'Success', result));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  return {
    findAll,
  };
};

export default Controller;
