import Sequelize from 'sequelize';
import config from '../../config';
import {
  ADDITIONAL_FIELDS,
  CUSTOMERS_TABLE_REFERENCE,
  FOREIGN_KEY_CONSTRAINT,
  ORDERS_TABLE_NAME,
  SERVICES_TABLE_REFERENCE,
} from '../../fixtures/models';

const { dbSchema } = config;

export const schemaAttributes = {
  id: { type: Sequelize.UUID, primaryKey: true },
  customerId: FOREIGN_KEY_CONSTRAINT({
    type: Sequelize.UUID,
    field: 'customer_id',
    references: CUSTOMERS_TABLE_REFERENCE,
  }),
  serviceId: FOREIGN_KEY_CONSTRAINT({
    type: Sequelize.INTEGER,
    field: 'service_id',
    references: SERVICES_TABLE_REFERENCE,
  }),
  totalWeight: { type: Sequelize.INTEGER, field: 'total_weight' },
  totalPrice: { type: Sequelize.INTEGER, field: 'total_price' },
  ...ADDITIONAL_FIELDS,
};

export default {
  up: queryInterface => queryInterface.createTable(ORDERS_TABLE_NAME, schemaAttributes, { schema: dbSchema }),
  down: queryInterface => queryInterface.dropTable({ tableName: ORDERS_TABLE_NAME, schema: dbSchema }),
};
