import { CUSTOMERS_MODEL_NAME, CUSTOMERS_TABLE_NAME } from '../fixtures/models';

export default (sequelize, DataTypes) => {
  const schemaAttributes = {
    id: { type: DataTypes.UUID, primaryKey: true },
    name: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
  };

  const Customer = sequelize.define(CUSTOMERS_MODEL_NAME, schemaAttributes, { tableName: CUSTOMERS_TABLE_NAME });

  return Customer;
};
