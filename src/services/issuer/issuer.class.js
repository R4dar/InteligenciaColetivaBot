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
	let res = await this.app.service('users').find(data)
	if(res.total > 0) {
	    let tokenSet = await this.client.authorizationCallback({
		redirect_uri: this.openid.domain + this.openid.successRedirect,
		scope: 'openid email',
	    })
	    return tokenSet
	}
	else {
	    let error = new Error("Not allowed")
	    error.statusCode = '401'
	}
    }
}

module.exports = function (options) {
    return new Service(options);
};

module.exports.Service = Service;
