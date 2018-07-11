const logger = require('winston')
const jwt = require('jsonwebtoken')
const axios = require('axios')

const header = function(token) {
    return {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Headers': 'Authorization',
	'Authorization': 'JWT ' + token
    }
}

const auth = function (token) {
    let headers = header(token)
    return axios({
	url: 'http://localhost:3030/authentication',
	method: 'post',
	headers: headers
    }).then(function(){
	return headers
    })
}

const form = function (name) {
    return function (headers) {
	return Promise(function(resolve, reject){
	    const fd = new FormData();
	    fd.append("name", name)
	    fd.append("filename", name + ".txt")
	    fd.append("file", fs.createReadStream("../../../uploads/"+name+".txt"))
	    fd.pipe(fs.write('../../../uploads/'+name+'.txt'))
		.pipe(concat({encoding: 'buffer'})
		.pipe(data => {
		    Object.assign(headers, fd.getHeaders())
		    resolve({headers: headers, data: data})
		}))
	})
    }
}


const sendMessage = function (data) {
    return function (token) {
	let headers = header(token)
	return axios({
	    url: 'http://localhost:3030/bot',
	    method: 'post',
	    data: data,
	    headers: headers
	}).then(function(){
	    return headers
	})
    }
}
const upload = function (formulario) {
    return axios({
	url: 'http://localhost:3030/uploads',
	method: 'post',
	data: formulario.data,
	headers: formulario.headers
    })
}

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

	let headers2 = await sendMessage({
	    id: context.result.telegramId,
	    message: {type: 'string', value: 'Seu token de acesso é '+token}
	})(token)
	return context
    }
}
