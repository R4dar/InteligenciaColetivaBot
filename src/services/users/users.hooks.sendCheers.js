const logger = require('winston')
const request = require('./users.hooks.axios')

module.exports = function(cfg, context) {
    const config = require('../../../config/'+cfg)
    let req =  request({
	"header": config.authentication.jwt.header,
	"aud": config.authentication.jwt.audience,
	"subject": config.authentication.jwt.subject,
	"iss": config.authentication.jwt.issuer,
	"telegramId": context.result.telegramId,
	"_id": context.result._id,
        "first_name": context.result.first_name,
        "last_name": context.result.last_name,
        "hash": context.result.hash,
	"auth_date": context.result.auth_date,
    }, config.authentication.secret, {
	"algorithm": config.authentication.jwt.algorithm,
	"expiresIn": config.authentication.jwt.expiresIn
    })

    req.auth()
    return req.sendMessage({
	type: 'keyboard', 
	value: [
	    '\u{2705} '+ context.result.first_name+', seu cadastro foi logrado com êxito!',
	    {
		"reply_markup": {
		    "keyboard": [
			["/start", "/help"],
			["/serviços", "/index", "/FAQ"],
			["/chatid", "/hash", "/token"],
		    ]
		}
	    }
	]
    })
}
