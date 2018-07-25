const { Issuer } = require('openid-client');
const logger = require('winston')
const axios = require('axios')
const issuer = require('./issuer')
let servicos = {commands:[]}
  
axios({
    url: 'https://id.org.br/api/v1/statistics.json',
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
		if(!res.data[0].openid) {
		    return issuer(openid).then(function(url){
			return {
			    messages: [
				{type: 'string', value: 'Acesse '+url+' para logar'}
			    ]
			}
		    })
		} else {
		    return {
			messages: [
			    {type: 'string', value: res.data[0].first_name+', você já procedeu com suas credenciais open id.'}
			]
		    }
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
	}).catch(function(err){
	    logger.debug(err)
	})
    }
}
