import Sequelize from 'sequelize';
import config from '../../config';
import { ADDITIONAL_FIELDS, SERVICES_TABLE_NAME } from '../../fixtures/models';

const { dbSchema } = config;

export const schemaAttributes = {
  id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
  name: { type: Sequelize.STRING },
  basePrice: { type: Sequelize.INTEGER, field: 'base_price' },
  serviceTime: { type: Sequelize.STRING, field: 'service_time' },
  ...ADDITIONAL_FIELDS,
};

export default {
  up: queryInterface => queryInterface.createTable(SERVICES_TABLE_NAME, schemaAttributes, { schema: dbSchema }),
  down: queryInterface => queryInterface.dropTable({ tableName: SERVICES_TABLE_NAME, schema: dbSchema }),
};
