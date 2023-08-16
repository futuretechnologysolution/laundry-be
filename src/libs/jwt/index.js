import jwt from 'jsonwebtoken';

import config from '../../config';

const { jwtSecret, jwtRefreshSecret, jwtSecretExpiration, jwtRefreshSecretExpiration } = config;

const generateToken = ({ id, username: name, root }) =>
  jwt.sign({ id, name, root }, jwtSecret, { expiresIn: jwtSecretExpiration });

const generateRefreshToken = ({ id, username: name, root }) =>
  jwt.sign({ id, name, root }, jwtRefreshSecret, { expiresIn: jwtRefreshSecretExpiration });

const verifyRefreshToken = token => {
  try {
    return jwt.verify(token, jwtRefreshSecret);
  } catch {
    return false;
  }
};

const verifyToken = token => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch {
    return false;
  }
};

export default {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyToken,
};
