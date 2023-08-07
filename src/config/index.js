import Express from './express';

require('dotenv').config();

export const express = Express({
  bodyParserExtended: process.env.BODY_PARSER_EXTENDED ?? true,
  bodyParserLimit: `${process.env.BODY_PARSER_LIMIT_IN_MB ?? '50'}mb`,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.ACCESS_TOKEN_KEY,
  jwtSchema: process.env.JWT_SCHEMA ?? 'bearer',
});
export default {
  host: process.env.SERVICE_HOST,
  port: process.env.SERVICE_PORT,
  env: process.env.NODE_ENV,
  enableFileLogging: process.env.ENABLE_FILE_LOGGING,
  // Database
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT, 10),
  dbUser: process.env.DB_USER,
  dbName: process.env.DB_DATABASE,
  dbPassword: process.env.DB_PASSWORD,
  dbDialect: process.env.DB_DIALECT,
  dbSchema: process.env.DB_SCHEMA,
  // JWT
  jwtSecret: process.env.ACCESS_TOKEN_KEY,
  jwtSecretExpiration: `${process.env.ACCESS_TOKEN_AGE}m`,
  jwtRefreshSecret: process.env.REFRESH_TOKEN_KEY,
  jwtRefreshSecretExpiration: `${process.env.REFRESH_TOKEN_AGE}d`,
};
