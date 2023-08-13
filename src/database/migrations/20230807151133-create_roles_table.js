import Sequelize from 'sequelize';
import config from '../../config';
import { ADDITIONAL_FIELDS, ROLES_TABLE_NAME } from '../../fixtures/models';

const { dbSchema } = config;

export const schemaAttributes = {
  id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
  name: { type: Sequelize.STRING },
  code: { type: Sequelize.STRING },
  ...ADDITIONAL_FIELDS,
};

export default {
  up: queryInterface => queryInterface.createTable(ROLES_TABLE_NAME, schemaAttributes, { schema: dbSchema }),
  down: queryInterface => queryInterface.dropTable({ tableName: ROLES_TABLE_NAME, schema: dbSchema }),
};
