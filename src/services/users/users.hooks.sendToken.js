const logger = require('winston')
const btoa = require('btoa')
const axios = require('axios')

module.exports = function(){
    return async function(context) {
	return axios({
	    url: 'http://localhost:3030/authentication',
	    method: 'post',
	    data:{
		strategy: "local",
		telegramId: context.data.id
	    }
	}).then(function(res){
	    console.log(res.data)
	    return axios({
		url: 'http://localhost:3030/bot',
		method: 'post',
		headers: {
		    'Authorization': res.data
		},
		data: {
		    id: context.data.id,
		    message: {
			type: 'file_id',
			value: btoa(res.data)
		    }
		}
	    })
	}).then(function(res){
	    console.log(res)
	})
	    
    }
}
