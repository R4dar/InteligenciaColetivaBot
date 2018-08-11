/* eslint-disable no-unused-vars */
const { Issuer } = require('openid-client');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async setup (app) {
    this.app = app;
    const openid = this.app.get('authentication').openid;
    Issuer.discover(openid.issuer).then(issuer => {
      this.client = new issuer.Client({ client_id: openid.clientID, client_secret: openid.clientSecret });
    });
  }

  async create (data, params) {
    return this.app.service('users').find({
      telegramId: data.telegramId
    }).then((res) => {
      const openid = this.app.get('authentication').openid;
      return this.client.authorizationCallback(openid.redirect_url, { scope: 'openid email', response_type: 'code', nonce: true});
    }).then(function(tokenSet){
      return tokenSet;
    });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
