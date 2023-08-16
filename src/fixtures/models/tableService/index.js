export const SERVICES_TABLE_NAME = 'services';
export const SERVICES_MODEL_NAME = 'Service';

export const SERVICES_TABLE_REFERENCE = {
  model: { tableName: SERVICES_TABLE_NAME, schema: process.env.DB_SCHEMA },
  key: 'id',
};
