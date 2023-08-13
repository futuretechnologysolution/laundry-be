import logger from '../../libs/logger';

const Controller = services => {
  const { authService } = services;

  const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const result = await authService.login(username, password);
      res.json(result);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  return {
    login,
  };
};

export default Controller;
