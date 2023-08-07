import { BaseError as SequelizeBaseError } from 'sequelize';
import _ from 'lodash';
import { ValidationError } from '../../libs/errors/validation';
import logger from '../../libs/logger';

const chalk = require('chalk');

export default config => {
  const { env = 'dev' } = config;

  const coloringStatusCode = code => {
    if (code >= 500) return chalk.red.bold(code);
    if (code >= 400 && code < 500) return chalk.red.bold(code);
    if (code >= 300 && code < 400) return chalk.cyan.bold(code);
    if (code >= 200 && code < 300) return chalk.green.bold(code);
    return code;
  };

  const logRequest = (req, res, next) => {
    logger.http(chalk.magentaBright('Incoming Request'), `=> ${req.method} ${req.url}`);
    next();
  };

  const logResponse = (req, res, next) => {
    res.on('finish', () => {
      logger.http(
        chalk.magentaBright('Outgoing Response'),
        `<= ${coloringStatusCode(res.statusCode)} ${req.method} ${chalk.bold(req.url)}`,
      );
    });
    next();
  };

  const logError = (err, req, res) => {
    const response = {
      code: err.status ?? 500,
      message: err.message ?? 'No message available',
    };

    if (env === 'dev') {
      response.errors = err.errors;
      response.stack = err.stack;
    }

    if (err.status === 400) {
      logger.error(new ValidationError({ ...err, name: req.url, body: _.omit(req.body, 'items'), user: req.user }));
    } else {
      const error = err;
      if (err instanceof SequelizeBaseError) error.details = err?.original?.detail ?? err?.sql;
      logger.error(error);
    }

    res.status(response.code);
    res.json(response);
  };

  return { logRequest, logResponse, logError };
};
