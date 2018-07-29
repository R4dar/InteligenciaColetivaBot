const { Issuer } = require('openid-client');
const logger = require('winston')

module.exports = function (app) {
    return function(msg, match) {
	return app.service('users').find({
	    telegramId: msg.chat.id
	}).then(function(res) {
	    return {
		messages: [
		    {type: 'keyboard', value: [
			"Ok, o que você gostaria de fazer?", 
			{
			    "reply_markup": {
				"keyboard": [
				    ["/start"],
				    ["/serviços"]
				]
			    }
			}
		    ]}
		]
	    }
	}).catch(function(err){
	    logger.debug(err)
	})
    }
}
