module.exports = function(msg, match){
    return new Promise(function(resolve){
	resolve({
	    messages: [
		{type: 'keyboard', value: [
		    "Olá "+msg.from.first_name+", o que você quer fazer?", 
		    {
			"reply_markup": {
			    "keyboard": [
				["/serviços"],
				["/FAQ"]
			    ]
			}
		    }
		]}
	    ]
	})
    })
}
