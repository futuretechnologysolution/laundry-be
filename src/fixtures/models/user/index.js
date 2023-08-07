// TABLE NAME
export const USER_TABLE_NAME = 'users';
export const USER_MODEL_NAME = 'User';

// REFERENCE

export const USER_TABLE_REFERENCE = {
  model: { tableName: USER_TABLE_NAME, schema: process.env.DB_SCHEMA },
  key: 'id',
};
