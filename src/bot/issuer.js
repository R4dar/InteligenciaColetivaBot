const { Issuer } = require('openid-client');
const logger = require('winston')
const app = require('../app')

module.exports = function(openid, msg){
    return Issuer.discover(openid.issuer).then(function (idIssuer) {
	return app.service('bot').create({
	    id: msg.chat.id,
	    message: {
		type: 'string',
		message: 'Encaminhado login...'
	    }
	})
    }).then(function(){
	return new idIssuer.Client({
	    client_id: openid.clientID,
	    client_secret: openid.clientSecret
	})
    }).then(function(idOrg){
	return idOrg.authorizationUrl({
	    redirect_uri: openid.domain + openid.successRedirect,
	    scope: 'openid email',
	});
    }).catch(function(err){
	app.service('bot').create({
		id: msg.chat.id,
	    message: {
		type: 'string',
		message: 'Erro '+err.statusCode + ': '+err.message
		}
	})
	logger.debug(err)
    })
}
