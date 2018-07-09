const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const OpenIdStrategy = require('passport-openid');
const logger = require('winston')

module.exports = function (app) {
    const config = app.get('authentication');

    Object.assign({
	name: 'jwt',
	Strategy: OpenIdStrategy
    }, config.openid)

    // Set up authentication with the secret
    app.configure(authentication(config));
    app.configure(jwt());
    // The `authentication` service is used to create a JWT.
    // The before `create` hook registers strategies that can be used
    // to create a new valid JWT (e.g. local or oauth2)
    app.service('authentication').hooks({
	before: {
	    create: [
		authentication.hooks.authenticate(config.strategies)
	    ],
	    remove: [
		authentication.hooks.authenticate('jwt')
	    ]
	}
    });
};
