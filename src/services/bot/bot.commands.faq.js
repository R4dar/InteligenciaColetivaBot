const logger = require('winston')
module.exports = async function(app, msg, match){
    return app.service('bot').get({
	name: 'FAQ', 
	data: {}
    }).then(function(res){
	logger.debug(res)
	return res
    })
}
								  

/* 
   app.service('issuer').create({scope: ['openid', 'email']}).then(function(url) {
   return app.service('bot').create({
   id: self.telegramId,
   message: {
   type: 'keyboard',
   value: ['Acesse '+url+' para vincular seu cadastro ao id.org'] 
   }
   })
   }) 
*/
