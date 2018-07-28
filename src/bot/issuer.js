const { Issuer } = require('openid-client');
const logger = require('winston')
const axios = require('axios')

module.exports = function(app, openid, msg){
    return app.service('bot').create({
	id: msg.chat.id,
	message: {
	    type: 'string',
	    message: 'Encaminhado login...'
	}
    }).then(Issuer.discover(openid.issuer)).then(function (idDotOrgIssuer) {
	return new idDotOrgIssuer.Client({
	    client_id: openid.clientID,
	    client_secret: openid.clientSecret
	})
    }).then(function(idOrg){
	return idOrg.authorizationCallback({
	    redirect_uri: openid.domain + openid.successRedirect,
	    scope: 'openid email',
	})
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
