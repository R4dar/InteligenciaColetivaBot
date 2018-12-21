const createService = require('./authentication.class.js');
const hooks = require('./authentication.hooks');
const swagger = require('./swagger');

module.exports = function (app) {
  const options = app.get('authentication');
  swagger(app, 'authentication', { create: {}, get: {}, remove: {} });
  let docs =  app.get('swagger/authentication');
  app.use('/authentication', Object.assign(createService(options), { docs: docs }));

  // Get our initialized service so that we can register hooks
  const service = app.service('authentication');
  service.hooks(hooks);
};
