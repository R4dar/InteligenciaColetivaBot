const logger = require('winston')

module.exports = function(app, msg, match){
    return new Promise(function(resolve, reject){
	const query = {
	    _aggregate: [
		{'$match':{telegramId: msg.chat.id}}
	    ]
	}
	let res = app.service('issuer').create({query: query}).catch(reject)
	if(res.total > 0) {
	    resolve({
		messages: [
		    {type: 'keyboard', value: [
			"Encaminhe um dos servicos federados abaixo", 
			{
			    "reply_markup": {
				"keyboard": [
				    ["/servicos@id.org.br"],
				    ["/servicos@logincidadao.rs"]
				]
			    }
			}
		    ]}
		]
	    })
	} else {
	    resolve({
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
	    })
	}
    })
}
