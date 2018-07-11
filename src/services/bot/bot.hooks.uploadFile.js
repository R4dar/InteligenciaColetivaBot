const logger = require('winston')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const concat = require("concat-stream")
const FormData = require('form-data');




module.exports = function(configFile){
    return async function(context) {
	let config = require(`../../../config/${configFile}.json`)
	let token = jwt.sign({
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
	return auth(token).then(sendMessage({
	    id: context.result.telegramId,
	    message: {
		type: 'string',
		value: 'Token de autenticação salvo em https://localhost:3000/uploads/'+context.result._id
	    }
	})).catch(function(err){
	    logger.debug(err)
	})
    }
}
