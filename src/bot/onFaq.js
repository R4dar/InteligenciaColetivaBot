module.exports = function (msg, match){
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
    
}
