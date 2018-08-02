const { authenticate } = require('@feathersjs/authentication').hooks;
const {
    hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
const search = require('feathers-mongodb-fuzzy-search');
const path = require('path')

module.exports = {
    before: {
	all: [
	],
	find: [ 
	    authenticate('jwt'),
	    search({
		fields: ['telegramId', 'first_name']
	    })
	],
	get: [ 
	    authenticate('jwt')
	],
	create: [
	    function(context) {
		const app = this
		context.app.service('bot').create({
		    id: context.data.telegramId,
		    message: {
			type: 'keyboard',
			value: [ 'Seu cadastro foi bem logrado.'] 
		    }
		}).then(function(){
		    return context
		})
	    }
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
	create: [],
	update: [],
	patch: [],
	remove: []
    },

    error: {
	all: [],
	find: [],
	get: [],
	create: [],
	update: [],
	patch: [],
	remove: []
    }
};
