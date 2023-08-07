import jwt from 'jsonwebtoken';

import config from '../../config';

const {
  jwtSecret,
  jwtRefreshTokenSecret,
  jwtSpecialTokenSecret,
  jwtExpiration,
  jwtRefreshTokenExpiration,
  jwtSpecialTokenExpiration,
} = config;

const generateToken = ({ id, username: name, root }) =>
  jwt.sign({ id, name, root }, jwtSecret, { expiresIn: jwtExpiration });

const generateRefreshToken = ({ id, username: name, root }) =>
  jwt.sign({ id, name, root }, jwtRefreshTokenSecret, { expiresIn: jwtRefreshTokenExpiration });

const generateSpecialToken = ({ id, username: name, root }, infinite = false) =>
  jwt.sign({ id, name, root }, jwtSpecialTokenSecret, { expiresIn: infinite ? '1y' : jwtSpecialTokenExpiration });

const verifyRefreshToken = token => {
  try {
    return jwt.verify(token, jwtRefreshTokenSecret);
  } catch {
    return false;
  }
};

const verifySpecialToken = token => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch {
    return false;
  }
};

export default {
  generateToken,
  generateSpecialToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifySpecialToken,
};
