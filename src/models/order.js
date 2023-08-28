import {
  CUSTOMERS_MODEL_NAME,
  CUSTOMERS_TABLE_REFERENCE,
  FOREIGN_KEY_CONSTRAINT,
  ORDERS_MODEL_NAME,
  ORDERS_TABLE_NAME,
  ORDER_BELONGS_TO_CUSTOMER,
  ORDER_BELONGS_TO_SERVICE,
  SERVICES_MODEL_NAME,
  SERVICES_TABLE_REFERENCE,
} from '../fixtures/models';

export default (sequelize, DataTypes) => {
  const schemaAttributes = {
    id: { type: DataTypes.UUID, primaryKey: true },
    customerId: FOREIGN_KEY_CONSTRAINT({
      type: DataTypes.UUID,
      field: 'customer_id',
      references: CUSTOMERS_TABLE_REFERENCE,
    }),
    serviceId: FOREIGN_KEY_CONSTRAINT({
      type: DataTypes.INTEGER,
      field: 'service_id',
      references: SERVICES_TABLE_REFERENCE,
    }),
    totalWeight: { type: DataTypes.DECIMAL, field: 'total_weight' },
    totalPrice: { type: DataTypes.INTEGER, field: 'total_price' },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'unpaid' },
  };

  const Order = sequelize.define(ORDERS_MODEL_NAME, schemaAttributes, { tableName: ORDERS_TABLE_NAME });

  Order.associate = models => {
    Order.belongsTo(models[CUSTOMERS_MODEL_NAME], ORDER_BELONGS_TO_CUSTOMER);
    Order.belongsTo(models[SERVICES_MODEL_NAME], ORDER_BELONGS_TO_SERVICE);
  };
  return Order;
};
