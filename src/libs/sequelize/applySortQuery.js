function toSequelizeOrder(order) {
  const operator = order[0];

  switch (operator) {
    case '-':
      return [...order.slice(1).split('.'), 'DESC'];
    default:
      return [...order.split('.'), 'ASC'];
  }
}

export const applySortQuery = (model, options) => {
  if (options.sort && typeof options.sort === 'string') {
    const orders = options.sort.split(',');

    // eslint-disable-next-line no-param-reassign
    options.order = orders.map(toSequelizeOrder);

    // eslint-disable-next-line no-param-reassign
    delete options.sort;
  }
};
