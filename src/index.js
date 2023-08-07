import http from 'http';
import config, { express } from './config';
import logger from './libs/logger';

const { host, port } = config;
async function init() {
  const server = http.createServer(express);

  try {
    await server.listen(port, host, () => {
      logger.info('Server', `start listening on ${host}:${port}`);
    });
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

init();
