import httpStatus from 'http-status';
import _ from 'lodash';
import { flatMapAsync } from '../libs/utils';
import { User as userRepository } from '../models';

const hasPermission = (menus, method) => {
  let query;

  switch (method) {
    case 'GET':
      query = { allowRead: true };
      break;
    case 'POST':
      query = { allowCreate: true };
      break;
    case 'PUT':
    case 'PATCH':
      query = { allowUpdate: true };
      break;
    case 'DELETE':
      query = { allowDelete: true };
      break;
    default:
      return false;
  }

  return _.some(menus, query);
};

export const authorize = menu => async (req, res, next) => {
  const { method } = req.method;
  const user = await userRepository.findByPk(req.user.id);
  const groups = await user.getGroups({ joinTableAttributes: [] });
  const menus = await flatMapAsync(groups, g =>
    g.getMenus({
      where: { code: menu },
      joinTableAttributes: ['allowCreate', 'allowRead', 'allowUpdate', 'allowDelete'],
      attributes: ['code', 'name'],
      nest: true,
      raw: true,
    }),
  );

  if (hasPermission(menus, method)) {
    next();
  } else {
    res.status(httpStatus.FORBIDDEN).send();
  }
};
