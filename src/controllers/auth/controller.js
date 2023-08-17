import httpStatus from 'http-status';
import logger from '../../libs/logger';
import { customJson } from '../../libs/utils';

const Controller = services => {
  const { authService } = services;

  const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const result = await authService.login(username, password);
      res.json(customJson(res.statusCode, 'Success', result));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  const logout = async (req, res, next) => {
    const { token, refreshToken } = req.body;
    try {
      await authService.logout(token, refreshToken, req.user);
      res.json(customJson(res.statusCode, 'Success', {}));
    } catch (error) {
      next(error);
    }
  };

  const refreshToken = async (req, res, next) => {
    const { token } = req.body;
    try {
      const result = await authService.refreshToken(token, req.user);
      const isMessage = 'message' in result;
      res.json(
        customJson(
          isMessage ? httpStatus.NOT_FOUND : httpStatus.OK,
          isMessage ? result.message : 'Success',
          isMessage ? {} : result,
        ),
      );
    } catch (error) {
      next(error);
    }
  };

  return {
    login,
    logout,
    refreshToken,
  };
};

export default Controller;
