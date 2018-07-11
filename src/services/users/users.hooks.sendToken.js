const logger = require('winston')
const request = require('./users.hooks.axios')

module.exports = function(configFile, context){
    let config = require(`../../../config/${configFile}.json`)
    let req =  request({
	"header": config.authentication.jwt.header,
	"aud": config.authentication.jwt.audience,
	    "subject": config.authentication.jwt.subject,
	"iss": config.authentication.jwt.issuer,
	"telegramId": context.result.telegramId,
	"_id": context.result._id
    }, config.authentication.secret, {
	"algorithm": config.authentication.jwt.algorithm,
	"expiresIn": config.authentication.jwt.expiresIn
    })
    
    return req.sendMessage({
	id: context.result.telegramId,
	message: {type: 'string', value: 'Seu token de acesso é '+req.token}
    })
}
