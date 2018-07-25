const logger = require('winston')
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

module.exports = function (app) {
    return function(msg, match) {
	return app.service('users').find({
	    telegramId: msg.chat.id
	}).then(function(res) {
	    const openid = app.get('authentication').openid
	    if(res.total > 0) {
		return login(openid, msg, res)
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
	}).catch(function(err){
	    logger.debug(err)
	})
    }
}
