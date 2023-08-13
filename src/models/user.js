import bcrypt from 'bcrypt';
import {
  USERS_HAS_ONE_USER_PROFILE,
  USERS_HAS_ONE_USER_ROLE,
  USERS_MODEL_NAME,
  USERS_TABLE_NAME,
  USER_PROFILES_MODEL_NAME,
  USER_ROLES_MODEL_NAME,
} from '../fixtures/models';

export default (sequelize, DataTypes) => {
  const schemaAttributes = {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    username: { allowNull: false, unique: true, type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    root: { type: DataTypes.BOOLEAN, defaultValue: false },
  };

  const defaultScope = { attributes: { exclude: ['password'] } };
  const User = sequelize.define(USERS_MODEL_NAME, schemaAttributes, { tableName: USERS_TABLE_NAME, defaultScope });
  User.prototype.validatePassword = async password => bcrypt.compare(password, this.password);

  User.associate = models => {
    User.hasOne(models[USER_PROFILES_MODEL_NAME], USERS_HAS_ONE_USER_PROFILE);
    User.hasOne(models[USER_ROLES_MODEL_NAME], USERS_HAS_ONE_USER_ROLE);
  };

  return User;
};
