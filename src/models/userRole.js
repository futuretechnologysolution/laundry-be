import {
  ROLES_MODEL_NAME,
  ROLES_TABLE_REFERENCE,
  USERS_MODEL_NAME,
  USERS_TABLE_REFERENCE,
  USER_ROLES_MODEL_NAME,
  USER_ROLES_TABLE_NAME,
  USER_ROLE_BELONGS_TO_ROLE,
  USER_ROLE_BELONGS_TO_USER,
} from '../fixtures/models';

export default (sequelize, DataTypes) => {
  const schemaAttributes = {
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: USERS_TABLE_REFERENCE,
      field: 'user_id',
    },
    roleId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: ROLES_TABLE_REFERENCE,
      field: 'role_id',
    },
  };

  const UserRole = sequelize.define(USER_ROLES_MODEL_NAME, schemaAttributes, { tableName: USER_ROLES_TABLE_NAME });

  UserRole.associate = models => {
    UserRole.belongsTo(models[USERS_MODEL_NAME], USER_ROLE_BELONGS_TO_USER);
    UserRole.belongsTo(models[ROLES_MODEL_NAME], USER_ROLE_BELONGS_TO_ROLE);
  };

  return UserRole;
};
