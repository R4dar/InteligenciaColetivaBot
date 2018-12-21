/* eslint-disable no-unused-vars */
const { Issuer } = require('openid-client');
const QRCode = require('qrcode');

const qrcode = function (tokenSet, fn){
  return new Promise(function(resolve, reject) {
    QRCode.toDataURL(tokenSet, function(err, url) {
      if (err) reject(err);
      resolve(url);
    });
  });
};

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async setup (app) {
    this.app = app;
  }

  async create (data, params) {
    const openid = this.app.get('authentication').openid;
    Issuer.discover(openid.issuer).then(issuer => {
      let client = new issuer.Client({ client_id: openid.clientID, client_secret: openid.clientSecret });
      return client.authorizationCallback(openid.redirect_url, {
        scope: 'openid email', 
        response_type: 'code', 
        nonce: true
      });
    }).then((tokenSet) =>{
      return qrcode(tokenSet);
    }).then((url) => {
      return this.app.service('bot').create({
        id: data.telegramId,
        message: {
          type: 'Photo',
          value: {
            caption: 'Seu token federado openid',
            photo: url
          }
        }
      });
    });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
