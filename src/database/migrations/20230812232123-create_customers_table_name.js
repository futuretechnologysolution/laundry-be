import Sequelize from 'sequelize';
import config from '../../config';
import { ADDITIONAL_FIELDS, CUSTOMERS_TABLE_NAME } from '../../fixtures/models';

const { dbSchema } = config;

export const schemaAttributes = {
  id: { type: Sequelize.UUID, primaryKey: true },
  name: { type: Sequelize.STRING },
  phone: { type: Sequelize.STRING },
  address: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  ...ADDITIONAL_FIELDS,
};

export default {
  up: queryInterface => queryInterface.createTable(CUSTOMERS_TABLE_NAME, schemaAttributes, { schema: dbSchema }),
  down: queryInterface => queryInterface.dropTable({ tableName: CUSTOMERS_TABLE_NAME, schema: dbSchema }),
};
