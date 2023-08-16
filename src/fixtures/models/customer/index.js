export const CUSTOMERS_TABLE_NAME = 'customers';
export const CUSTOMERS_MODEL_NAME = 'Customer';

export const CUSTOMERS_TABLE_REFERENCE = {
  model: { tableName: CUSTOMERS_TABLE_NAME, schema: process.env.DB_SCHEMA },
  key: 'id',
};
