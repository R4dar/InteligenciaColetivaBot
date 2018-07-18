const axios = require('axios')

module.exports = function(app) { 
    return function (msg, match){
	return app.service('users').find({
	    telegramId: msg.chat.Id
	}).then(res => {
	    if(res.total > 0) {
		return axios({
		    url: 'https://logincidadao.rs.gov.br/api/v1/statistics.json',
		    method: 'get'
		}).then(function(res){
		    let services = res.data.users_by_service
		    let commands = services.map(function(item){
			return ['/servico '+item.name]
		    })
		    return {
			messages: [
			    {type: 'keyboard', value: [
				"Selecione um dos servicos abaixo", 
				{
				    "reply_markup": {
					"keyboard": commands
				    }
				}
			    ]}
			]
		    }
		})
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
