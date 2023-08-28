import { validate } from 'express-validation';
import { Router } from 'express';
import ServiceService from '../../services/service.service';
import { Service as serviceRepository } from '../../models';
import { auth, paginate, verifyBlockedToken } from '../../middleware';
import Controller from './controller';
import validation from './validation';

const basePath = '/services';
const serviceService = ServiceService(serviceRepository);
const setPath = path => `${basePath}/${path}`;
const controller = Controller({ serviceService });
const routes = Router();

routes.route(basePath).get(verifyBlockedToken, auth.jwt, paginate, controller.getServices);
routes.route(setPath(':id')).get(verifyBlockedToken, auth.jwt, controller.getService);
routes.route(basePath).post(verifyBlockedToken, auth.jwt, validate(validation.store), controller.storeService);
routes.route(setPath(':id')).put(verifyBlockedToken, auth.jwt, validate(validation.update), controller.updateService);
routes
  .route(setPath(':id'))
  .delete(verifyBlockedToken, auth.jwt, validate(validation.remove), controller.removeService);

export default routes;
