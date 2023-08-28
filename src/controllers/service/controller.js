import httpStatus from 'http-status';
import { customJson } from '../../libs/utils';
import logger from '../../libs/logger';

const Controller = services => {
  const { serviceService } = services;
  const getServices = async (req, res, next) => {
    try {
      const { rows, count } = await serviceService.services(req.query);
      res.page(rows, count);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
  const getService = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await serviceService.serviceById(id);
      res
        .status(result ? httpStatus.OK : httpStatus.NOT_FOUND)
        .json(customJson(result ? httpStatus.OK : httpStatus.NOT_FOUND, result ? 'Success' : 'Notfound', result));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
  const storeService = async (req, res, next) => {
    try {
      const result = await serviceService.storeService(req.body, req.user);
      res.json(customJson(httpStatus.CREATED, 'Success', result));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
  const updateService = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await serviceService.updateService(id, req.body, req.user);
      res.json(customJson(httpStatus.OK, 'Success', result));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
  const removeService = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await serviceService.deleteService(id, req.user);
      res.json(customJson(httpStatus.OK, 'Success', result));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  return {
    getService,
    getServices,
    storeService,
    updateService,
    removeService,
  };
};
export default Controller;
