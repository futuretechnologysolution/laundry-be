import { validate } from 'express-validation';
import { Router } from 'express';
import CustomerService from '../../services/customer.service';
import { Customer as customerRepository } from '../../models';
import Controller from './controller';
import { auth, paginate, verifyBlockedToken } from '../../middleware';
import validation from './validation';

const basePath = '/customers';
const customerService = CustomerService(customerRepository);
const setPath = path => `${basePath}/${path}`;
const controller = Controller({ customerService });
const routes = Router();

routes.route(basePath).get(verifyBlockedToken, auth.jwt, paginate, controller.getCustomers);
routes.route(setPath(':id')).get(verifyBlockedToken, auth.jwt, controller.getCustomer);
routes.route(basePath).post(validate(validation.store), verifyBlockedToken, auth.jwt, controller.storeCustomer);
routes.route(setPath(':id')).put(validate(validation.update), verifyBlockedToken, auth.jwt, controller.updateCustomer);
routes
  .route(setPath(':id'))
  .delete(validate(validation.delete), verifyBlockedToken, auth.jwt, controller.removeCustomer);

export default routes;
