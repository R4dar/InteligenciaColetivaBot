module.exports = async function(app, msg, match){
    let res = await app.service('users').find({telegramId: msg.chat.id})
    if (res.total > 0 ) {
	return {
	    messages: [
		{type: 'keyboard', value: [
		    "Olá "+res.data[0].first_name+", o que você quer fazer?", 
		    {
			"reply_markup": {
			    "keyboard": [
				["/servicos"],
				["/FAQ"]
			    ]
			}
		    }
		]}
	    ]
	}
    } else {
	return {
	    messages: [
		{type: 'string', value: "Olá "+msg.from.first_name+", acesse "+app.get('authentication').jwt.audience+" e cadastre-se!"}
	    ]
	}
    }
}
