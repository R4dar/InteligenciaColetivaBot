//const authentication = require('@feathersjs/authentication');
//const jwt = require('@feathersjs/authentication-jwt');
//const local = require('@feathersjs/authentication-local');
const createService = require('./authentication.class.js');
const hooks = require('./authentication.hooks');
const logger = require('winston')
const swagger = require('./swagger')

module.exports = function (app) {
    const options = app.get('authentication');

    // Set up authentication with the secret
    //app.configure(authentication(config));
    //app.configure(local());
    //app.configure(jwt());

    swagger(app, 'authentication', {
	create: {},
	get: {},
	remove: {}
    })
    let docs =  app.get('swagger/authentication')
    app.use('/authentication', Object.assign(createService(options), {
	docs: docs
    }))

    // Get our initialized service so that we can register hooks
    const service = app.service('authentication');
    service.hooks(hooks);
    // The `authentication` service is used to create a JWT.
    // The before `create` hook registers strategies that can be used
    // to create a new valid JWT (e.g. local or oauth2)
    // app.service('authentication').hooks({
    //	before: {
    /*	    create: [
		authentication.hooks.authenticate(['local', 'jwt'])
	    ],
	    remove: [
		authentication.hooks.authenticate(['local', 'jwt'])
	    ]
	}
    }); */
};
