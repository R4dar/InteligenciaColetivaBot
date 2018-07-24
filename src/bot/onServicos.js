const axios = require('axios')

let servicos = {commands:[]}
axios({
    url: 'https://logincidadao.rs.gov.br/api/v1/statistics.json',
    method: 'get'
}).then(function(res){
    res.data.users_by_service.map(function(item){
	servicos.commands.push([item.name])
    })
})
  
axios({
    url: 'https://id.org.br/api/v1/statistics.json',
    method: 'get'
}).then(function(res){
    res.data.users_by_service.map(function(item){
	servicos.commands.push([item.name])
    })
})

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
				    "keyboard": servicos.commands
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
