import Sequelize from 'sequelize';
import config from '../../config';
import { ADDITIONAL_FIELDS, BLOCKED_TOKENS_TABLE_NAME } from '../../fixtures/models';

const { dbSchema } = config;

export const schemaAttributes = {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  token: { type: Sequelize.STRING, unique: true },
  ...ADDITIONAL_FIELDS,
};

export default {
  up: queryInterface => queryInterface.createTable(BLOCKED_TOKENS_TABLE_NAME, schemaAttributes, { schema: dbSchema }),
  down: queryInterface => queryInterface.dropTable({ tableName: BLOCKED_TOKENS_TABLE_NAME, schema: dbSchema }),
};
