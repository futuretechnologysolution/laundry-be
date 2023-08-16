export const ORDERS_TABLE_NAME = 'orders';
export const ORDERS_MODEL_NAME = 'Order';

// RELATIONS

export const ORDER_BELONGS_TO_CUSTOMER = { foreignKey: 'customerId', as: 'customer' };
export const ORDER_BELONGS_TO_SERVICE = { foreignKey: 'serviceId', as: 'service' };
