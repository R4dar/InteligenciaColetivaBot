const request = require('./users.hooks.axios')

module.exports = function(configFile, context){
    let config = require(`../../../config/${configFile}.json`)
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
    return req.sendMessage({
	id: context.result.telegramId,
	message: {type: 'string', value: 'Talvez você, requisitou o cadastro, no entanto obtivemos o seguinte erro: '+ context.result.err.message}
    })
}
