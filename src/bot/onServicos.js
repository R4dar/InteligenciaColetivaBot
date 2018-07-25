module.exports = function(app) { 
    return function (msg, match){
	return app.service('users').find({
	    telegramId: msg.chat.Id
	}).then(res => {
	    if(res.total > 0) {
		return {
		    messages: [
			{type: 'keyboard', value: [
			    "Encaminhe um dos servicos abaixo", 
			    {
				"reply_markup": {
				    "keyboard": [
					["/serviços:id.org.br"],
					["/serviços:logincidadao.rs"]
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
	}).catch(function(err){
	    logger.error(err)
	})
    }
}
