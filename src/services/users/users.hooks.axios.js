const axios = require('axios')
const jwt = require('jsonwebtoken')

class Request {

    constructor (token, secret, opt) { 
	this.token = jwt.sign(token, secret, opt)
    }

    headers () {
	return {
	    'Content-Type': 'application/json',
	    'Access-Control-Allow-Headers': 'Authorization',
	    'Authorization': 'JWT ' + this.token
	}
    }

    auth () {
	let headers = this.headers()
	return axios({
	    url: 'http://localhost:3030/authentication',
	    method: 'post',
	    headers: headers
	}).then(function(){
	    return headers
	})
    }

    form (name) {
	let headers = this.headers()
	return Promise(function(resolve, reject){
	    const fd = new FormData();
	    fd.append("name", name)
	    fd.append("filename", name + ".txt")
	    fd.append("file", fs.createReadStream("../../../uploads/"+name+".txt"))
	    fd.pipe(fs.write('../../../uploads/'+name+'.txt')).pipe(concat({encoding: 'buffer'}).pipe(data => {
		Object.assign(headers, fd.getHeaders())
		resolve({headers: headers, data: data})
	    }))
	})
    }
    
    sendMessage (data) {
	let headers = this.headers()
	return axios({
	    url: 'http://localhost:3030/bot',
	    method: 'post',
	    data: data,
	    headers: headers
	}).then(function(){
	    return headers
	})
    }

    upload (formulario) {
	return axios({
	    url: 'http://localhost:3030/uploads',
	    method: 'post',
	    data: formulario.data,
	    headers: formulario.headers
	})
    }
}

module.exports = function(token, secret, opt){
    return new Request(token, secret, opt)
}
