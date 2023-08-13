import { Router } from 'express';
import Controller from './controller';
import { User as userRepository } from '../../models';

const basePath = '/users';
const routes = Router();
const controller = Controller({ userRepository });

routes.route(basePath).get(controller.findAll);

export default routes;
