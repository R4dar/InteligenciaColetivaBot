const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');

const oauth2 = require('@feathersjs/authentication-oauth2');
const Auth0Strategy = require('passport-auth0');
const logger = require('winston');

module.exports = function (app) {
    const config = app.get('authentication');
    const host = app.get('host');
    const port = app.get('port');

    // Set up authentication with the secret
    app.configure(Object.assign(authentication(config), {
	docs: app.get('swagger/authentication')
    }));
    app.configure(jwt());
    app.configure(oauth2(Object.assign({
	name: 'auth0',
	Strategy: Auth0Strategy
    }, config.auth0)));
    
    // const bot = app.get('feathers-telegram-bot/'+config.telegram.username)
    // bot.setWebHook('https://'+host+':'+port+ '/bot');
    
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
