/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);
const admins = app.get('authentication').telegram.admins

const boot = async function(obj={}){
    // Reset all data if you are in development mode
    if (obj.condition) {
	logger.debug('dropping users unless they are admin')
	let results = await app.service('users').find({})
	if(results.total === 0) {
	    logger.debug('No users found. Creating new ones')
	    await obj.middlewares.onNotHaveUsers()
	}
	if(results.total > 0) {
	    logger.debug('Found '+results.total+' users')
	    await results.data.map(obj.middlewares.onHaveUsers)
	}
	
	let onAdmin = obj.middlewares.onAdmin
	for (let e in obj.admins) {
	    setTimeout(function (){
		onAdmin(admins[e], {
		    type: 'keyboard', value: [
			"\u{1F4BB} "+obj.message
		    ]
		})
	    }, 1000)
	}
    }
}

process.on('unhandledRejection', (err) => {
    let stack = err.stack.split("\n")
    for(let i in stack){
	logger.error(stack[i])
    }
});

server.on('listening', () => {
    let host = app.get('host')
    let port = app.get('port')
    let admins = app.get('authentication').telegram.admins
    boot({
	condition: process.env.NODE_ENV === 'development', 
	message: `Feathers application started on http:\/\/${host}:${port}`, 
	admins: admins,
	middlewares: {
	    onNotHaveUsers: async function(){
		await Promise.all(admins.map(id => { 
		    return app.service('users').create({telegramId: id, isAdmin: true})
		}))
		logger.debug('admins added')
		
	    },
	    onHaveUsers: async function(user){
		if(!user.isAdmin){
		    logger.debug('deleting '+user._id)
		    await app.service('users').remove({telegramId: results.data[i].telegramId})
		}
	    },
	    onAdmin: async function (userId, message) {
		let res = await app.service('users').find({telegramId: userId})
		return app.service('bot').create({
		    id: res.data[0].telegramId,
		    message: message
		})
	    }
	}
    })
})

