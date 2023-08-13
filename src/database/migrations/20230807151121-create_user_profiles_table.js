import Sequelize from 'sequelize';
import { ADDITIONAL_FIELDS, USERS_TABLE_REFERENCE, USER_PROFILES_TABLE_NAME } from '../../fixtures/models';

import config from '../../config';

const { dbSchema } = config;
export const schemaAttributes = {
  userId: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    references: USERS_TABLE_REFERENCE,
    field: 'user_id',
  },
  firstName: { type: Sequelize.STRING, field: 'first_name' },
  lastName: { type: Sequelize.STRING, field: 'last_name' },
  ...ADDITIONAL_FIELDS,
};
export default {
  up: queryInterface => queryInterface.createTable(USER_PROFILES_TABLE_NAME, schemaAttributes, { schema: dbSchema }),
  down: queryInterface => queryInterface.dropTable({ tableName: USER_PROFILES_TABLE_NAME, schema: dbSchema }),
};
