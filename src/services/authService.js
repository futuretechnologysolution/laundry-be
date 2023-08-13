import { Op } from 'sequelize';
import { AuthError } from '../libs/errors/auth';
import logger from '../libs/logger';
import jwtHelper from '../libs/jwt';

const service = userRepository => ({
  async login(username, password) {
    const user = await userRepository.findOne({
      where: { username: { [Op.iLike]: `${username}` } },
      attributes: ['id', 'username', 'password', 'root'],
      include: ['userRole'],
    });
    if (!user && !(await user.validatePassword(password)))
      throw new AuthError({ message: 'Wrong username and/or Password' });

    logger.info('Auth', `user ${username} has successfully logged in`, {
      id: user.get('id'),
      username,
    });

    const token = await jwtHelper.generateToken(user);
    const refreshToken = await jwtHelper.generateRefreshToken(user);
    return [token, refreshToken];
  },
});

export default service;
