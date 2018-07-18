const axios = require('axios')
const logger = require('winston')
const jwt = require('jsonwebtoken')

class JWTAxios {

    constructor (cfg, context) {
	let config = require(`../../../config/${cfg}.json`)
	this.url = config.authentication.jwt.audience
	this.token = jwt.sign({
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
    }

    headers () {
	return {
	    'Content-Type': 'application/json',
	    'Access-Control-Allow-Headers': 'Authorization',
	    'Authorization': 'JWT ' + this.token
	}
    }

    post (url, headers, obj) {
	return axios({
	    url: this.url+url,
	    method: 'post',
	    headers: headers
	})
    }
}

class AuthedAxios extends JWTAxios {

    constructor(cfg, context) {
	super(cfg, context)
    }
    
    bot (data) {
	return this.post('/bot', this.headers(), data)
    }
}

module.exports = function(cfg, context){
    return new AuthedAxios(cfg, context)
}
