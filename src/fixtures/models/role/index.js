export const ROLES_TABLE_NAME = 'roles';
export const ROLES_MODEL_NAME = 'Role';

export const ROLES_TABLE_REFERENCE = {
  model: { tableName: ROLES_TABLE_NAME, schema: process.env.DB_SCHEMA },
  key: 'id',
};

// RELATIONS
export const ROLES_HAS_MANY_USER_ROLES = {
  foreignKey: 'roleId',
  as: 'UserRoles',
};

export * from './relations';
