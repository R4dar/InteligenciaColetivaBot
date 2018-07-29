// Initializes the `issuer` service on path `/issuer`
const createService = require('./issuer.class.js');
const hooks = require('./issuer.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/issuer', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('issuer');

  service.hooks(hooks);
};
