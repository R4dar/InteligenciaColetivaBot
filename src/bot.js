module.exports = {
    onText: {
	'/start': function(msg, match){
	    return new Promise(function(resolve){
		resolve({
		    messages: [
			{type: 'string', value: `Olá ${msg.from.first_name}`},
			{type: 'keyboard', value: [
			    "O que você quer fazer?", 
			    {
				"reply_markup": {
				    "keyboard": [
					["/ajuda"], 
					["/registrar"], 
					["/verificar"], 
					["/login"]
				    ]
				}
			    }
			]}
		    ]
		})
	    })
	},
	'/ajuda': function (msg, match){
	    return new Promise(function(resolve){
		resolve({
		    messages: [
			{type: 'keyboard', value: [
			    "Ok, que tipo de ajuda você quer?", 
			    {
				"reply_markup": {
				    "keyboard": [
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
	'como registrar?': function (msg, match){
	    return new Promise(function(resolve){
		resolve({
		    messages: [
			{type: 'keyboard', value: [
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
	}
    }
}
