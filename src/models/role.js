import {
  ROLES_HAS_MANY_USER_ROLES,
  ROLES_MODEL_NAME,
  ROLES_TABLE_NAME,
  USER_ROLES_MODEL_NAME,
} from '../fixtures/models';

export default (sequelize, DataTypes) => {
  const schemaAttributes = {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    code: { type: DataTypes.STRING },
  };

  const Role = sequelize.define(ROLES_MODEL_NAME, schemaAttributes, { tableName: ROLES_TABLE_NAME });

  Role.associate = models => {
    Role.hasMany(models[USER_ROLES_MODEL_NAME], ROLES_HAS_MANY_USER_ROLES);
  };
  return Role;
};
