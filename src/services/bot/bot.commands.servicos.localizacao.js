const logger = require('winston')

module.exports = async function(app, msg, match){
    let res = await app.service('users').find({telegramId: msg.chat.id})
    if(res.total > 0) {
	return {
	    messages: [
		{type: 'keyboard', value: [
		    "Sua localização será usada para encontrarmos grupos perto de você.", 
		    {
			"reply_markup": {
			    "keyboard": [
				[{text: "Compartilhar localização", request_location: true}]
			    ]
			}
		    }
		]}
	    ]
	}
    } else {
	return {
	    messages: [
		{type: 'keyboard', value: [
		    "Você aceita ser um adendo em nossa rede?", 
		    {
			"reply_markup": {
			    "keyboard": [
				["sim, eu quero proceder com o registro"],
				["não, eu quero malograr o registro"]
			    ]
			}
		    }
		]}
	    ]
	}
    }
}
