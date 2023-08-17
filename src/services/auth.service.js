import { Op } from 'sequelize';
import { compare } from 'bcrypt';
import { AuthError } from '../libs/errors/auth';
import logger from '../libs/logger';
import jwtHelper from '../libs/jwt';
import { sequelize } from '../models';

const service = (userRepository, blockedTokenRepository) => ({
  async login(username, password) {
    const user = await userRepository.findOne({
      where: { username: { [Op.iLike]: `${username}` } },
      attributes: ['id', 'username', 'password', 'root'],
      include: ['userRole'],
    });
    if (user) {
      if (!(await compare(password, user.get('password'))))
        throw new AuthError({ message: 'Wrong username and/or Password' });
    }

    logger.info('Auth', `user ${username} has successfully logged in`, {
      id: user.get('id'),
      username,
    });

    const token = jwtHelper.generateToken(user);
    const refreshToken = jwtHelper.generateRefreshToken(user);
    return { token, refreshToken };
  },

  async logout(token, refreshToken) {
    try {
      const result = await sequelize.transaction(async transaction => {
        await blockedTokenRepository.bulkCreate([{ token }, { token: refreshToken }], transaction);
        return true;
      });

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async refreshToken(oldRefreshToken) {
    try {
      const isVerified = jwtHelper.verifyRefreshToken(oldRefreshToken);
      const isBlockedRefreshToken = await blockedTokenRepository.findOne({ where: { token: oldRefreshToken } });
      if (!isVerified || isBlockedRefreshToken) return { message: 'Invalid refresh Token' };
      const user = await userRepository.findOne({ where: { username: isVerified.name } });
      const token = jwtHelper.generateToken(user);
      const refreshToken = jwtHelper.generateRefreshToken(user);
      await blockedTokenRepository.create({ token: oldRefreshToken });

      return { token, refreshToken };
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export default service;
