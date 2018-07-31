const logger = require('winston')
const axios = require('axios')

let servicos = {commands:[]}

axios({
    url: 'https://id.org.br/api/v1/statistics.json',
    method: 'get'
}).then(function(res){
    res.data.users_by_service.map(function(item){
	servicos.commands.push([item.name])
    })
})

module.exports = async function (app, msg, match) {	
    let res = await app.service('users').find({ telegramId: msg.chat.id })
    if(res.total > 0) {
	if(res.data[0].openid) {
	    return {
		messages: [
		    {type: 'keyboard', value: [
			'Selecione um dos serviços disponíveis.',
			{
			    'reply_markup': {
				'keyboard': servicos.commands
			    }
			}
		    ]}
		]
	    }
	} else {
	    return {
		messages: [
		    {type: 'keyboard', value: [
			res.data[0].first_name+', você ainda não procedeu com suas credenciais open id, gostaria de fazê-lo?',
			{
			    "reply_markup": {
				"keyboard": [
				    ["/servicos@id.org:proceder"],
				    ["/servicos@id.org:malograr"]
				]
			    }
			}
		    ]}
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
}
