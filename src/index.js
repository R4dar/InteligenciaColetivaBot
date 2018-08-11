/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (err) => {
  logger.error(err);
});

server.on('listening', () => {
  let host = app.get('host');
  let port = app.get('port');
  logger.info(`Feathers application started on http://${host}:${port}`);
});

