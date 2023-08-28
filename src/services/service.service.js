import _ from 'lodash';
import { Op } from 'sequelize';

const service = serviceRepository => ({
  async services(query) {
    const { search } = query;
    try {
      const request = _.assign(query, {
        where: {
          ...(search ? { [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }] } : null),
        },
        search: null,
        order: [['name', 'asc']],
        distinc: true,
      });
      const result = await serviceRepository.findAndCountAll(request);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async serviceById(id) {
    try {
      const result = await serviceRepository.findOne({ where: { id } });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async storeService(serviceDto, user) {
    try {
      const result = await serviceRepository.create({ ...serviceDto }, user);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async updateService(id, serviceDto, user) {
    try {
      const serviceObj = await serviceRepository.findOne({ where: { id } });
      await serviceObj.update({ ...serviceDto }, user);
      return serviceObj;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async deleteService(id, user) {
    try {
      const serviceObj = await serviceRepository.findOne({ where: { id } });
      await serviceObj.destroy({ user });
      return serviceObj;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async findService(search) {
    try {
      const serviceObj = await serviceRepository.findOne({
        where: { [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }, { serviceTime: { [Op.iLike]: `%${search}%` } }] },
      });
      return serviceObj;
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export default service;
