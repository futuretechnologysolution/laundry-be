import httpStatus from 'http-status';
import { BlockedToken as blockedTokenRepository } from '../models';
import logger from '../libs/logger';

export const verifyBlockedToken = async (req, res, next) => {
  logger.info('VerifyBlockedToken', 'Process to check the authorization token is blocked or not');
  const authToken = req.headers.authorization;
  const token = authToken.split(' ')[1];

  const blockedToken = await blockedTokenRepository.findOne({ where: { token } });
  if (blockedToken)
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: 'Cannot use Token, Please Re-Login', statusCode: httpStatus.UNAUTHORIZED });
  next();
};
