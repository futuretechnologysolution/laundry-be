import httpStatus from 'http-status';
import { v4 as uuidv4 } from 'uuid';
import logger from '../../libs/logger';
import { customJson } from '../../libs/utils';

const Controller = services => {
  const { customerService } = services;

  const getCustomers = async (req, res, next) => {
    try {
      const { rows, count } = await customerService.customers(req.query);
      res.page(rows, count);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
  const getCustomer = async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await customerService.customerById(id);
      res
        .status(result ? httpStatus.OK : httpStatus.NOT_FOUND)
        .json(customJson(result ? 'Success' : 'NotFound', result));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
  const storeCustomer = async (req, res, next) => {
    const { body, user } = req;
    try {
      body.id = uuidv4();
      const result = await customerService.storeCustomer(body, user);
      res.json(customJson(httpStatus.CREATED, 'Success', result));
    } catch (error) {
      logger.error(error.message);
      next(error);
    }
  };
  const updateCustomer = async (req, res, next) => {
    const { body, params, user } = req;
    const { id } = params;
    try {
      const result = await customerService.updateCustomer(id, body, user);
      res.json(customJson(httpStatus.OK, 'Success', result));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
  const removeCustomer = async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;
    try {
      const result = await customerService.deleteCustomer(id, user);
      res.json(customJson(httpStatus.OK, 'Success', result));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  return {
    getCustomers,
    getCustomer,
    storeCustomer,
    updateCustomer,
    removeCustomer,
  };
};

export default Controller;
