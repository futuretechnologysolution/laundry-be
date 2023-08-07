import { Router } from 'express';
import glob from 'glob';

const router = Router();

glob.sync(`${__dirname}/../../controllers/**/route.js`).forEach(async routeFile => {
  const routeModule = await import(routeFile);
  router.use(routeModule.default);
});

export default router;
