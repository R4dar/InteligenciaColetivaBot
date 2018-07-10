const logger = require('winston')

module.exports = function(app){
    return async function(context) {

	let promises = context.data.message.value.map(message => {
	    logger.debug('saving message of '+context.data.id)
	    if (typeof message.type === 'string'){
		return app.service('messages').create({to: context.data.id, text: message.value})
	    }
	    if (typeof message.type === 'keyboard'){
		return app.service('messages').create({to: context.data.id, keyboard: message.value})
	    }
	})
	return Promise.all(promises).then(function(results){
	    return context
	})
    }
}
