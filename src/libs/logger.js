import { addColors, createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { LOG_FORMAT } from '../fixtures/enum';

const LEVEL = Symbol.for('level');

const customFormat = format.printf(LOG_FORMAT);

const levelUpperCaseFormat = format(info => _.assignIn(info, { level: info.level.toUpperCase() }));

/**
 * Log only the messages the match `level`.
 */
function filterOnly(level) {
  // eslint-disable-next-line consistent-return
  return format(info => {
    if (info[LEVEL] === level) {
      return info;
    }
  })();
}

const customColors = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
    query: 5,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'cyan',
    debug: 'blue',
    query: 'gray',
  },
};
const logger = createLogger({
  level: 'query',
  levels: customColors.levels,
  format: format.combine(levelUpperCaseFormat(), format.timestamp(), customFormat),
  transports: [],
  exitOnError: false,
});

addColors(customColors.colors);

if (process.env.NODE_ENV !== 'dev' || process.env.ENABLE_FILE_LOGGING) {
  // COMMENTED, JUST IN CASE ONE DAY IT WILL BE USED ------------------//
  // logger.add(new transports.File({ filename: 'logs/info.log', format: filterOnly('info'), level: 'info' }));
  // logger.add(new transports.File({ filename: 'logs/error.log', format: filterOnly('error'), level: 'error' }));
  // logger.add(new transports.File({ filename: 'logs/debug.log', format: filterOnly('debug'), level: 'debug' }));
  logger.add(
    new DailyRotateFile({
      filename: 'logs/error/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      options: { format: filterOnly('error') },
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
    }),
  );
  logger.add(
    new DailyRotateFile({
      filename: 'logs/info/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      options: { format: filterOnly('info') },
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info',
    }),
  );
  logger.add(
    new DailyRotateFile({
      filename: 'logs/debug/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      options: { format: filterOnly('debug') },
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'debug',
    }),
  );
  logger.add(
    new DailyRotateFile({
      filename: 'logs/combined/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'debug',
    }),
  );
}

if (process.env.NODE_ENV !== 'prod') {
  logger.add(
    new transports.Console({
      format: format.combine(levelUpperCaseFormat(), format.timestamp(), format.colorize(), customFormat),
      stderrLevels: ['error'],
    }),
  );
}

export default {
  error: ({ name, status, message, details, stack }) => logger.error({ name, status, message, details, stack }),
  warn: (name, message, details) => logger.warn({ name, message, details }),
  info: (name, message, details) => logger.info({ name, message, details }),
  http: (name, message, details) => logger.http({ name, message, details }),
  debug: (name, message, details) => logger.debug({ name, message, details }),
  query: (name, message, details) => logger.query({ name, message, details }),
};
