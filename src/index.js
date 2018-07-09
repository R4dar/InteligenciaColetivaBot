/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (err) => {
    let stack = err.stack.split("\n")
    for(let i in stack){
	logger.error(stack[i])
    }
});

server.on('listening', () => {
    let host = app.get('host')
    let port = app.get('port')
    logger.info(`Feathers application started on http:\/\/${host}:${port}`);
    // Drop database and reset all data if you are in development mode
    if (process.env.NODE_ENV === 'development') {
	logger.debug('dropping users unless they are admin')
	app.authenticate()
	app.service('users').find({}).then(function(results){
	    if(results.total === 0) {
		return new Promise(function(resolve){     
		    logger.debug('No users found')
		    resolve()
		})
	    }
	    if(results.total > 0) {
		logger.debug('Found '+results.total+' users')
		return Promise.all(results.data.map(function(user){
		    if(!user.isAdmin){
			logger.debug('deleting '+user._id)
			return app.service('users').remove({telegramId: results.data[i].telegramId})
		    }
		    else {
			return new Promise(function(resolve){
			    logger.debug('User '+user._id+' is admin')
			    return app.service('bot').create({
				id: user.telegramId,
				message: {type: 'keyboard', value: [
					"Sistema Online!", 
					{
					    "reply_markup": {
						"keyboard": [
						    ["/start"]
						]
					    }
					}
				    ]}
			    }).then(resolve)
			})
		    }
		}))
	    }
	})
    }
});

