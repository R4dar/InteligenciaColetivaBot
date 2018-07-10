module.exports = function(app) { 
    return function (msg, match){
	return app.service('users').find({
	    telegramId: msg.chat.Id
	}).then(res => {
	    if(res.total > 0) {
		return {
		    messages: [
			{type: 'keyboard', value: [
			    "Selecione um dos comandos abaixo", 
			    {
				"reply_markup": {
				    "keyboard": [
					["/login"]
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
			    "Parece que você não está registrado no nosso sistema. Você aceita fazer parte da nossa rede?", 
			    {
				"reply_markup": {
					"keyboard": [
					    ["sim, eu quero fazer parte da rede"],
					    ["não, eu não quero fazer parte da rede"]
					]
				}
			    }
			]}
		    ]
		}
	    }
	})
    }
}
