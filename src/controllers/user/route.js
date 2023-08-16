import { Router } from 'express';
import Controller from './controller';
import { User as userRepository } from '../../models';
import { auth, verifyBlockedToken } from '../../middleware';

const basePath = '/users';
const routes = Router();
const controller = Controller({ userRepository });

routes.route(basePath).get(verifyBlockedToken, auth.jwt, controller.findAll);

export default routes;
