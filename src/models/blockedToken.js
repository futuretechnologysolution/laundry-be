import { BLOCKED_TOKENS_MODEL_NAME, BLOCKED_TOKENS_TABLE_NAME } from '../fixtures/models';

export default (sequelize, DataTypes) => {
  const schemaAttributes = {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    token: { type: DataTypes.STRING, unique: true },
  };

  const BlockedToken = sequelize.define(BLOCKED_TOKENS_MODEL_NAME, schemaAttributes, {
    tableName: BLOCKED_TOKENS_TABLE_NAME,
  });

  return BlockedToken;
};
