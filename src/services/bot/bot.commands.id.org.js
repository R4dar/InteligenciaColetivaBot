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

module.exports = function (app) {
    return async function(msg, match) {	
	const query = {
	    '$limit': 1,
	    telegramId: {'$in':[msg.chat.id]},
	    first_name: {'$in':[msg.from_first_name]}
	}
	let res = await app.service('users').find({ query })
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
					["sim, eu quero encaminhar as minhas credenciais do id.org"],
					["não, eu quero malograr as minhas credenciais do id.org"]
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
}
