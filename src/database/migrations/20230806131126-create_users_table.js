/** @type {import('sequelize-cli').Migration} */
import { Sequelize } from 'sequelize';
import config from '../../config';
import { ADDITIONAL_FIELDS, USERS_TABLE_NAME as tableName } from '../../fixtures/models';

const { dbSchema } = config;

export const schemaAttributes = {
  id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
  username: { allowNull: false, unique: true, type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING, allowNull: true },
  phone: { type: Sequelize.STRING, allowNull: true },
  root: { type: Sequelize.BOOLEAN, defaultValue: false },
  ...ADDITIONAL_FIELDS,
};

export default {
  up: queryInterface => queryInterface.createTable(tableName, schemaAttributes, { schema: dbSchema }),
  down: queryInterface => queryInterface.dropTable({ tableName, schema: dbSchema }),
};
