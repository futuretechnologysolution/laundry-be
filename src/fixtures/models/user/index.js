// TABLE NAME
export const USERS_TABLE_NAME = 'users';
export const USERS_MODEL_NAME = 'User';
export * from './relations';
// REFERENCE

export const USERS_TABLE_REFERENCE = {
  model: { tableName: USERS_TABLE_NAME, schema: process.env.DB_SCHEMA },
  key: 'id',
};

// RELATIONS

export const USERS_HAS_ONE_USER_PROFILE = { foreignKey: 'userId', as: 'profile' };
export const USERS_HAS_ONE_USER_ROLE = { foreignKey: 'userId', as: 'userRole' };
