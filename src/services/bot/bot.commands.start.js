const logger = require('winston')
module.exports = async function(app, msg, match){
    return app.service('bot').get({
	name: 'start', 
	data: {
	    username: msg.from.first_name
	}
    }).then(function(res){
	logger.debug(res)
	return res
    })
}
