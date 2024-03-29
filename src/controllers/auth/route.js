import { Router } from 'express';
import { validate } from 'express-validation';
import Controller from './controller';
import AuthService from '../../services/auth.service';
import { User as userRepository, BlockedToken as blockedTokenRepository } from '../../models';
import validation from './validation';
import { verifyBlockedToken } from '../../middleware/verifyBlockedToken';
import { auth } from '../../middleware';

const basePath = '/auth';
const setPath = path => `${basePath}/${path}`;
const routes = Router();

const controller = Controller({ authService: AuthService(userRepository, blockedTokenRepository) });
routes.route(setPath('login')).post(validate(validation.login), controller.login);
routes.route(setPath('logout')).post(verifyBlockedToken, auth.jwt, controller.logout);
routes.route(setPath('refreshToken')).post(verifyBlockedToken, auth.jwt, controller.refreshToken);

export default routes;
