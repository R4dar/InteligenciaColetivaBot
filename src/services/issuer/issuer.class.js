/* eslint-disable no-unused-vars */
const { Issuer } = require('openid-client');

class Service {
    constructor (options) {
	this.options = options || {};
    }

    async setup (app) {
	this.app = app
	this.openid = this.app.get('authentication').openid
	this.issuer = await Issuer.discover(this.openid.issuer)
	this.client = new this.issuer.Client({
	    client_id: this.openid.clientID,
	    client_secret: this.openid.clientSecret
	})
    }

    async create (data, params) {
	return Issuer.discover('https://id.org.br').then(function(idorg){
	    let client = new idorg.Client({
		clientId: '10_15tdota1dbesko4g8wcggckokscwc4o0owgg00oc4wg8s4s4ow',
		clientSecret: '61astpx93d44wc484c8sgo8oss0g0o0cswgs0wgg8wocok0c00'
	    })
	    let res = client.authorizationUrl({redirect_url: 'https://r4dar.localtunnel.me/', scope: 'openid email'})
	    return rest
	})
    }
}

module.exports = function (options) {
    return new Service(options);
};

module.exports.Service = Service;
