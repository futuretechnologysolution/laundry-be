import { Router } from 'express';
import { validate } from 'express-validation';
import Controller from './controller';
import AuthService from '../../services/authService';
import { User as userRepository } from '../../models';
import validation from './validation';

const basePath = '/auth';
const setPath = path => `${basePath}/${path}`;
const routes = Router();

const controller = Controller({ authService: AuthService(userRepository) });
routes.route(setPath('login')).post(validate(validation.login), controller.login);

export default routes;
