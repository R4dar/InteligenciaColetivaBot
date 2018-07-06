const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');

const oauth2 = require('@feathersjs/authentication-oauth2');
const Auth0Strategy = require('passport-auth0');

const TelegramBot = require('node-telegram-bot-api');
const logger = require('winston');

module.exports = function (app) {
    const config = app.get('authentication');

    // Set up authentication with the secret
    app.configure(Object.assign(authentication(config), {
	docs: app.get('swagger/authentication')
    }));
    app.configure(jwt());
    app.configure(oauth2(Object.assign({
	name: 'auth0',
	Strategy: Auth0Strategy
    }, config.auth0)));

    // configure telegram
    app.configure(function(){
	const R4DAR = new TelegramBot(config.telegram.token, {polling: true});
	R4DAR.onText(/\/start/, function (msg, match){
	    let id = msg.chat.id
	    logger.info('Sending message to telegram user ' + id)
	    
	    R4DAR.sendMessage(id,`Olá ${msg.from.first_name}`)
	    R4DAR.sendMessage(id, "O que você quer fazer?", {
		"reply_markup": {
		    "keyboard": [["/ajuda"], ["/registrar"], ["/login"]]
		}
	    })
	})
	R4DAR.onText(/\/ajuda/, function (msg, match){
	    let id = msg.chat.id
	    logger.info('Sending message to telegram user ' + id)
	    R4DAR.sendMessage(id,"Ok, que tipo de ajuda você quer?", {
		"reply_markup": {
		    "keyboard": [["como registrar?"], ["como realizar o login?"]]
		}
	    })
	})
	R4DAR.onText(/\/local/, function (msg, match){
	    let id = msg.chat.id
	    logger.info('Sending message to telegram user ' + id)
	    bot.sendLocation(msg.chat.id, 44.97108, -104.27719);
	})
    })
    
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
