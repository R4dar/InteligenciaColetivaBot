// Initializes the `issuer` service on path `/issuer`
const createService = require('./issuer.class.js');
const hooks = require('./issuer.hooks');
const drop = require('../../drop')
const logger = require('winston')
const m2s = require('mongoose-to-swagger');

module.exports = function (app) {
    
    const paginate = app.get('paginate');

    const options = {
	paginate
    };
    
    let docs = app.get('swagger/users')
    app.set('swagger/issuer', docs)
    docs = app.get('swagger/issuer')
    docs.definitions.issuer = m2s(app.service('users').Model)
    // Initialize our service with any options it requires
    app.use('/issuer', Object.assign(createService(options), {
	docs: docs
    }));

    // Get our initialized service so that we can register hooks
    const service = app.service('issuer');

    service.hooks(hooks);
}
