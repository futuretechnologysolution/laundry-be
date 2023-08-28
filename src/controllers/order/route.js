import { Router } from 'express';
import { validate } from 'express-validation';
import { Order as orderRepository, Customer as customerRepository, Service as serviceRepository } from '../../models';
import OrderService from '../../services/order.service';
import Controller from './controller';
import { auth, paginate, verifyBlockedToken } from '../../middleware';
import validation from './validation';

const basePath = '/orders';
const orderService = OrderService(customerRepository, serviceRepository, orderRepository);
const setPath = path => `${basePath}/${path}`;
const controller = Controller({ orderService });
const routes = Router();

routes.route(basePath).get(verifyBlockedToken, auth.jwt, paginate, controller.getOrders);
routes.route(setPath(':id')).get(verifyBlockedToken, auth.jwt, controller.getOrder);
routes.route(basePath).post(verifyBlockedToken, auth.jwt, validate(validation.store), controller.storeOrder);
routes.route(setPath(':id')).put(verifyBlockedToken, auth.jwt, validate(validation.update), controller.updateOrder);

export default routes;
