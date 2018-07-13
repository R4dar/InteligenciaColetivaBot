const { authenticate } = require('@feathersjs/authentication').hooks;
const {
    hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
const sendToken = require('./users.hooks.sendToken')
const sendAlreadyCreated = require('./users.hooks.sendAlreadyCreated')
const logger = require('winston')

module.exports = {
    before: {
	all: [],
	find: [ 
	    authenticate('jwt')
	],
	get: [ 
	    authenticate('jwt')
	],
	create: [
	],
	update: [ 
	    authenticate('jwt')
	],
	patch: [
	    authenticate('jwt') 
	],
	remove: [ 
	    authenticate('jwt')
	]
    },

    after: {
	all: [],
	find: [],
	get: [],
	create: [
	    async function (context){
		return sendToken(process.env.NODE_ENV, context).then(function(res){
		    logger.debug(res.data)
		    return context
		})
	    }
	],
	update: [],
	patch: [],
	remove: []
    },

    error: {
	all: [],
	find: [],
	get: [],
	create: [
	    async function (context){
		logger.debug(context.result)
		return sendAlreadyCreated(process.env.NODE_ENV, context).then(function(res){
		    logger.debug(res.data)
		    return context
		})
	    }
	],
	update: [],
	patch: [],
	remove: []
    }
};
