const { authenticate } = require('@feathersjs/authentication').hooks;
const {
    hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const authedAxios = require('./users.hooks.axios')
const logger = require('winston')
const path = require('path')


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
	    function (context){
		let cfg = process.env.NODE_ENV === 'development' ? 'default' : process.env.NODE_ENV
		let aaxios = authedAxios(cfg, context)
		aaxios.bot({
		    id: context.result.data.telegramId,
		    message: {
			type: 'keyboard',
			value: [
			    'Seu cadastro foi bem logrado.',
			    {
				"reply_markup": {
				    "keyboard": [
					["/start"]
				    ]
				}
			    }
			]
		    }
		}).then(function(res){
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
	    function (context){
		if(context.result.message === "telegramId deve ser único"){
		    let cfg = process.env.NODE_ENV === 'development' ? 'default' : process.env.NODE_ENV
		    let aaxios = authedAxios(cfg, context)
		    aaxios.bot({
			id: context.result.data.telegramId,
			message: {
			    type: 'keyboard',
			    value: [
				'Você já procedeu com seu cadastro.',
				{
				    "reply_markup": {
					"keyboard": [
					    ["/start"]
					]
				    }
				}
			    ]
			}
		    }).then(function(res){
			return context
		    })
		}
	    }
	],
	update: [],
	patch: [],
	remove: []
    }
};
