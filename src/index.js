/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

const boot = function(){
    // Reset all data if you are in development mode
    logger.debug('dropping users unless they are admin')
    return app.service('users').find({}).then(function(res){
	if(res.total === 0) {
	    logger.debug('No users found. Creating new ones')
	    return Promise.all(res.data.map(id => { 
		logger.debug('admin '+id+' added')
		return app.service('users').create({telegramId: id, isAdmin: true})
	    }))
	}
	if(res.total > 0) {
	    logger.debug('Found '+results.total+' users')
	    return Promise.all(res.data.map(user => {
		if(!user.isAdmin){
		    return app.service('users').remove({telegramId: user.telegramId})
		}
	    }))
	}
    }).then(function(results){
	return new Promise(function(resolve, reject){
	    setTimeout(function(){
		app.service('users').find({}).then(function(res){
		    Promise.all(res.data.map(user => {
			if(user.isAdmin){
			    return app.service('bot').create({
				id: user.telegramId,
				message: {
				    type: 'keyboard', value: [
					"\u{1F4BB} "+obj.message
				    ]
				}
			    })
			}
		    })).then(resolve).catch(reject)
	        })
	    }, 2000)
	})
    })
}

process.on('unhandledRejection', (err) => {
    let stack = err.stack.split("\n")
    for(let i in stack){
	logger.error(stack[i])
    }
});

server.on('listening', () => {
    boot().then(function(){
	let host = app.get('host')
	let port = app.get('port')
	logger.info(`Feathers application started on http:\/\/${host}:${port}`)
    })
})

