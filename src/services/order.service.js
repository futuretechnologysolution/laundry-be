import _ from 'lodash';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../models';

const service = (customerRepository, serviceRepository, orderRepository) => ({
  async orders(query) {
    const { search } = query;
    try {
      const request = _.assign(query, {
        include: [
          {
            association: 'customer',
            attributes: { exclude: ['createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'deletedAt', 'deletedBy'] },
            required: true,
          },
          {
            association: 'service',
            attributes: { exclude: ['createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'deletedAt', 'deletedBy'] },
            required: true,
          },
        ],
        where: {
          ...(search
            ? {
                [Op.or]: [
                  { '$customer.name': { [Op.iLike]: `%${search}%` } },
                  { '$customer.phone': { [Op.iLike]: `%${search}%` } },
                ],
              }
            : null),
        },
        search: null,
        order: [['id', 'asc']],
        distinc: true,
      });
      const result = await orderRepository.findAndCountAll(request);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async orderById(id) {
    try {
      const order = await orderRepository.findOne({
        include: [
          {
            association: 'customer',
            attributes: { exclude: ['createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'deletedAt', 'deletedBy'] },
            required: true,
          },
          {
            association: 'service',
            attributes: { exclude: ['createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'deletedAt', 'deletedBy'] },
            required: true,
          },
        ],
        where: { id },
      });

      return order;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async storeOrder(orderDto, user) {
    try {
      const result = await sequelize.transaction(async transaction => {
        let tempCustomer;
        const { customer } = orderDto;
        const data = { ...orderDto };

        if (!customer.id) {
          customer.id = uuidv4();
          tempCustomer = await customerRepository.create({ ...customer }, { user, transaction });
        }
        const serviceObj = await serviceRepository.findOne({ where: { id: orderDto.serviceId } }, { transaction });

        if (!serviceObj) throw new Error('Service not found');
        data.id = uuidv4();
        data.totalPrice = orderDto.totalWeight * serviceObj.basePrice;

        const temp = await orderRepository.create(
          { ...data, customerId: customer.id ?? tempCustomer.id },
          { user, transaction },
        );
        return temp;
      });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async updateOrder(id, orderDto, user) {
    try {
      const order = await orderRepository.findOne({ where: { id } });
      await order.update({ ...orderDto }, user);

      return order;
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export default service;
