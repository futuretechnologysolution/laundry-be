// eslint-disable-next-line import/no-import-module-exports
import config from '.';

const { dbUser, dbPassword, dbName, dbHost, dbDialect, dbSchema, dbPort } = config;

module.exports = {
  host: dbHost,
  username: dbUser,
  password: dbPassword,
  database: dbName,
  port: dbPort,
  schema: dbSchema,
  dialect: dbDialect,
  timezone: '+07:00',
};
