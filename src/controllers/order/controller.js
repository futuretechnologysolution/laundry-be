import httpStatus from 'http-status';
import logger from '../../libs/logger';
import { customJson } from '../../libs/utils';

const Controller = services => {
  const { orderService } = services;
  const getOrders = async (req, res, next) => {
    try {
      const { rows, count } = await orderService.orders(req.query);
      res.page(rows, count);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
  const getOrder = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await orderService.orderById(id);
      res
        .status(result ? httpStatus.OK : httpStatus.NOT_FOUND)
        .json(customJson(result ? httpStatus.OK : httpStatus.NOT_FOUND, result ? 'Success' : 'Not Found', result));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
  const storeOrder = async (req, res, next) => {
    try {
      const result = await orderService.storeOrder(req.body, req.user);
      res.json(
        customJson(result ? httpStatus.CREATED : httpStatus.BAD_GATEWAY, result ? 'Success' : 'Bad Gateway', result),
      );
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  const updateOrder = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await orderService.updateOrder(id, req.body, req.user);
      res.json(customJson(result ? httpStatus.OK : httpStatus.BAD_GATEWAY, result ? 'Success' : 'Bad Gateway', result));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
  return {
    getOrders,
    getOrder,
    storeOrder,
    updateOrder,
  };
};
export default Controller;
