module.exports = function (app) {
    return {
	onText: {
	    '/start': function(msg, match){
		return new Promise(function(resolve){
		    resolve({
			messages: [
			    {type: 'keyboard', value: [
				"Olá "+msg.from.first_name+", o que você quer fazer?", 
				{
				    "reply_markup": {
					"keyboard": [
					    ["/index"],
					    ["/FAQ"]
					]
				    }
				}
			    ]}
			]
		    })
		})
	    },
	    '/FAQ': function (msg, match){
		return new Promise(function(resolve){
		    resolve({
			messages: [
			    {type: 'keyboard', value: [
				"Selecione uma das perguntas mais frequentes", 
				{
				    "reply_markup": {
					"keyboard": [
					    ["o que é o index?"], 
					    ["como registrar?"], 
					    ["como realizar o login?"], 
					    ["como verificar minha conta?"]
					]
				    }
				}
			    ]}
			]
		    })
		})
		
	    },
	    '/index': function (msg, match){
		return new Promise(function(resolve){
		    app.service('users').find({
			telegramId: msg.chat.Id
		    }).then(res => {
			if(res.total > 0) {
			    resolve({
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
			    })
			} else {
			    resolve({
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
			    })
			}
		    })
		})
	    },
	    'o que é o index?': function (msg, match){
		return new Promise(function(resolve){
		    resolve({
			messages: [
			    {type: 'string', value: [
				"O index é um espaço virtual de trabalho desta sala de bate papo. Você pode se registrar, logar como um site na web. Execute o comando abaixo para ir até o index",
				{
				    "reply_markup": {
					"keyboard": [["/index"]]
				    }
				}
			    ]}
			]
		    })
		})
	    },
	    'como registrar?': function (msg, match){
		return new Promise(function(resolve){
		    resolve({
			messages: [
			    {type: 'string', value: [
				"Clique no comando abaixo para fazê-lo.",
				{
				    "reply_markup": {
					"keyboard": [["/registrar"]]
				    }
				}
			    ]}
			]
		    })
		})
	    },
	    'como realizar o login ?': function (msg, match){
		return new Promise(function(resolve){
		    resolve({
			messages: [
			    {type: 'keyboard', value: [
				"Clique no comando abaixo para fazê-lo.",
				{
				    "reply_markup": {
					"keyboard": [["/login"]]
				    }
				}
			    ]}
			]
		    })
		})
	    },
	    'como verificar minha conta ?': function (msg, match){
		return new Promise(function(resolve){
		    resolve({
			messages: [
			    {type: 'keyboard', value: [
				"Clique no comando abaixo para fazê-lo.",
				{
				    "reply_markup": {
					"keyboard": [["/verificar"]]
				    }
				}
			    ]}
			]
		    })
		})
	    },
	    '/login': function(msg, match){
		return new Promise(function(resolve){
		    app.service('users').find({
			telegramId: msg.chat.Id
		    }).then(res => {
			if(res.total > 0) {
			    if(res.data[0].isAdmin){
				resolve({
				    messages: [
					{type: 'keyboard', value: [{
					    "reply_markup": {
						"keyboard": [
						    ["/feed"]
						    ["/usuarios"],
						    ["/relatorio"]
						]
					    }
					}]}
				    ]
				})
			    }
			    else {
				resolve({
				    messages: [
					{type: 'keyboard', value: [
					    "Selecione um dos comandos abaixo", 
					    {
						"reply_markup": {
						    "keyboard": [
							["/feed"]
						    ]
						}
					    }
					]}
				    ]
				})
			    }
			} else {
			    resolve({
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
			    })
			}
		    })
		})
	    },
	}
    }
}
