// Initializes the `grupos` service on path `/grupos`
const createService = require('feathers-mongoose');
const createModel = require('../../models/grupos.model');
const hooks = require('./grupos.hooks');
const m2s = require('mongoose-to-swagger');
const drop = require('../../drop');
const logger = require('winston');
const swagger = require('../../swagger');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');
  const options = { Model, paginate };
  swagger(app, 'grupos', { find: {}, create: {}, get: {}, update: {}, patch: {}, remove: {} });
  let docs =  app.get('swagger/grupos');
  docs.definitions.grupos = m2s(Model);
  // Initialize our service with any options it requires
  app.use('/grupos', Object.assign(createService(options), { docs: docs }));
  // Get our initialized service so that we can register hooks
  const service = app.service('grupos');

  service.hooks(hooks);
  if(process.env.NODE_ENV === 'development'){
    logger.debug('Dropping grupos service');
    drop(service, function(){
      return true;
    }).then(function(){
      logger.debug('Grupos service dropped');
    }).catch(function(err){
      logger.debug(err);
    });
  } 
};
