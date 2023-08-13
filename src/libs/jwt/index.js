import jwt from 'jsonwebtoken';

import config from '../../config';

const {
  jwtSecret,
  jwtRefreshSecret,
  jwtSpecialTokenSecret,
  jwtSecretExpiration,
  jwtRefreshSecretExpiration,
  jwtSpecialTokenExpiration,
} = config;

const generateToken = ({ id, username: name, root }) =>
  jwt.sign({ id, name, root }, jwtSecret, { expiresIn: jwtSecretExpiration });

const generateRefreshToken = ({ id, username: name, root }) =>
  jwt.sign({ id, name, root }, jwtRefreshSecret, { expiresIn: jwtRefreshSecretExpiration });

const generateSpecialToken = ({ id, username: name, root }, infinite = false) =>
  jwt.sign({ id, name, root }, jwtSpecialTokenSecret, { expiresIn: infinite ? '1y' : jwtSpecialTokenExpiration });

const verifyRefreshToken = token => {
  try {
    return jwt.verify(token, jwtSpecialTokenSecret);
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
