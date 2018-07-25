const { Issuer } = require('openid-client');

module.exports = function(openid){
    return Issuer.discover(openid.issuer).then(function (idIssuer) {
	logger.debug('Attempting login for'+ msg.chat.id+' in '+openid.issuer)
	return new idIssuer.Client({
	    client_id: openid.clientID,
	    client_secret: openid.clientSecret
	})
    }).then(function(idOrg){
	logger.debug(idOrg)
	return id.authorizationUrl({
	    redirect_uri: openid.domain + openid.successRedirect,
	    scope: 'openid email',
	});
    })
}
