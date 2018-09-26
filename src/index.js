/* eslint-disable no-console */
// # Winston
// this is a nice logger. Can be used with databases
// ## TODO
// An AssistenteLogger, a logger that redirects logs to Telegram?
const logger = require('winston');

// # The feathers.js application
// Application will come with some customizations,
// please see [package.json(../package.json)
const app = require('./app');

// # PORT
// the port of Assistente is defined in .env file
// as a uupercased environment variable.
// as some others variables that will be replace
// the [configurations](../config/default)
const port = app.get('port');
const server = app.listen(port);

// # Unhandled promises
// Every promised rejection will be catched here
// ## TODO
// a better handler
process.on('unhandledRejection', (err) => {
  logger.error(err);
});

// Now listen server on a http server
server.on('listening', () => {
  let host = app.get('host');
  let port = app.get('port');
  logger.info(`Assistente REST api running on http://${host}:${port}`);
  // TODO
  // Do some analysis
});

