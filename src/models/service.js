import { SERVICES_MODEL_NAME, SERVICES_TABLE_NAME } from '../fixtures/models';

export default (sequelize, DataTypes) => {
  const schemaAttributes = {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    basePrice: { type: DataTypes.INTEGER, field: 'base_price' },
    serviceTime: { type: DataTypes.STRING, field: 'service_time' },
  };
  const Service = sequelize.define(SERVICES_MODEL_NAME, schemaAttributes, { tableName: SERVICES_TABLE_NAME });
  return Service;
};
