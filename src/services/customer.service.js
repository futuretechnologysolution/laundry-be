import _ from 'lodash';
import { Op } from 'sequelize';

const service = customerRepository => ({
  async customers(query) {
    const { search } = query;
    try {
      const request = _.assign(query, {
        where: {
          ...(search
            ? {
                [Op.or]: [
                  { name: { [Op.iLike]: `%${search}%` } },
                  { phone: { [Op.iLike]: `%${search}%` } },
                  { email: { [Op.iLike]: `%${search}%` } },
                ],
              }
            : null),
        },
        search: null,
        order: [['name', 'asc']],
        distinc: true,
      });
      const result = await customerRepository.findAndCountAll(request);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async customerById(id) {
    try {
      const result = await customerRepository.findOne({ where: { id } });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async storeCustomer(customerDto, user) {
    try {
      const result = await customerRepository.create({ ...customerDto }, user);
      return result;
    } catch (error) {
      throw new Error(error.messag);
    }
  },
  async updateCustomer(id, customerDto, user) {
    try {
      const customer = await customerRepository.findOne({ where: { id } });
      await customer.update({ ...customerDto }, user);
      return customer;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async deleteCustomer(id, user) {
    try {
      const customer = await customerRepository.findOne({ where: { id } });
      await customer.destroy({ user });

      return customer;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async findCustomer(search) {
    try {
      const customer = await customerRepository.findOne({
        where: { [Op.or]: [{ phone: { [Op.iLike]: `%${search}%` } }, { name: { [Op.iLike]: `%${search}%` } }] },
      });
      return customer;
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export default service;
