const createService = require('feathers-mongoose');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
const m2s = require('mongoose-to-swagger');
const drop = require('../../drop');
const swagger = require('../../swagger');
const logger = require('winston');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = { Model, paginate };
  swagger(app, 'users', {
    find: {security:['local', 'jwt']},
    create: {},
    get: {security:['local', 'jwt']},
    update: {security:['local', 'jwt']},
    patch: {security:['local', 'jwt']},
    remove: {security:['local', 'jwt']}
  });
  let docs = app.get('swagger/users');
  docs.definitions.users = m2s(Model);
  // Initialize our service with any options it requires
  app.use('/users', Object.assign(createService(options), { docs: docs }));  
  // Get our initialized service so that we can register hooks
  const service = app.service('users');
  service.hooks(hooks);
  
};
