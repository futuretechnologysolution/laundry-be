import Sequelize from 'sequelize';
import config from '../../config';
import {
  ADDITIONAL_FIELDS,
  FOREIGN_KEY_CONSTRAINT,
  ROLES_TABLE_REFERENCE,
  USERS_TABLE_REFERENCE,
  USER_ROLES_TABLE_NAME,
} from '../../fixtures/models';

const { dbSchema } = config;

export const schemaAttributes = {
  userId: FOREIGN_KEY_CONSTRAINT({
    type: Sequelize.INTEGER,
    references: USERS_TABLE_REFERENCE,
    field: 'user_id',
  }),
  roleId: FOREIGN_KEY_CONSTRAINT({
    type: Sequelize.INTEGER,
    references: ROLES_TABLE_REFERENCE,
    field: 'role_id',
  }),
  ...ADDITIONAL_FIELDS,
};

export default {
  up: queryInterface => queryInterface.createTable(USER_ROLES_TABLE_NAME, schemaAttributes, { schema: dbSchema }),
  down: queryInterface => queryInterface.dropTable({ tableName: USER_ROLES_TABLE_NAME, schema: dbSchema }),
};
