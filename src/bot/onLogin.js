const { Issuer } = require('openid-client');
const logger = require('winston')

const loginOpenID = async function(openid, msg){
    return Issuer.discover(openid.issuer).then(function (idIssuer) {
	logger.debug('Attempting login for'+ msg.chat.id+' in '+openid.issuer)
	return new idIssuer.Client({
	    client_id: openid.clientID,
	    client_secret: openid.clientSecret
	})
    }).then(function(idOrg){
	return id.authorizationUrl({
	    redirect_uri: openid.domain + openid.successRedirect,
	    scope: 'openid email',
	});
    }).then(function(url){
	return {
	    messages: [
		{type: 'string', value: 'Acesse '+url+' para logar'}
	    ]
	}
    })
}


const login = async function (openid, msg, res) {
    app.authenticate({
	strategy: "jwt",
	telegramId: msg.chat.id
    })
    
}
module.exports = function (app) {
    return function(msg, match) {
	return app.service('users').find({
	    telegramId: msg.chat.id
	}).then(function(res) {
	    const openid = app.get('authentication').openid
	    if(res.total > 0) {
		return login(openid, msg, res)
	    } else {
		return {
		    messages: [
			{type: 'keyboard', value: [
			    "Parece que você não está registrado no nosso sistema. Você aceita fazer parte da nossa rede?", 
			    {
				"reply_markup": {
				    "keyboard": [
					["sim, eu quero fazer parte da rede"],
					["não, eu não quero fazer parte da rede"]
				    ]
				}
		    }
			]}
		    ]
		}
	    }
	}).catch(function(err){
	    logger.debug(err)
	})
    }
}
