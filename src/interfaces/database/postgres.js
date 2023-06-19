import { Pool } from "pg";

const isDev =  process.env.TYPE === 'development';
const pool = new Pool({
  user: isDev ? process.env.PGUSER_TEST : process.env.PGUSER,
  host: isDev ? process.env.PGHOST_TEST : process.env.PGHOST,
  database: isDev ? process.env.PGDATABASE_TEST : process.env.PGDATABASE,
  password: isDev ? process.env.PGPASSWORD_TEST : process.env.PGPASSWORD,
  port: isDev ? process.env.PGPORT : process.env.PGPORT,
});

const posgres = {
  query: (text, params) => pool.query(text, params),
};
module.exports = { posgres };