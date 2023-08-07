export const LOG_ROOT_DIR = './logs';
export const LOG_DEFAULT_FILENAME = 'access.log';
export const LOG_ERROR_FILENAME = 'error.log';
export const LOG_MAX_SIZE = '500m';
export const LOG_MAX_FILES_DEFAULT_EXPIRE = '1';
export const LOG_MAX_FILES_ERROR_EXPIRE = '1';
export const LOG_LEVEL_ERROR = 'error';
export const LOG_LEVEL_INFO = 'info';
export const LOG_LEVEL_WARN = 'warn';
export const LOG_LEVEL_DEBUG = 'debug';
export const LOG_FORMAT = info => {
  const status = info.status ? info.status : '';
  const name = info.name ? ` ${info.name} :` : '';

  const details = info.details ? `\n[DETAILS] ${JSON.stringify(info.details, null, 2)}` : '';
  const stack = info.stack ? `\n[STACK] ${info.stack}` : ' ';

  return `${moment(info.timestamp)} [${info.level}] ${status}${name} ${info.message}${details}${stack}`;
};
