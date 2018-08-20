/* eslint-disable no-unused-vars */
const logger = require('winston');
const jwt = require('jsonwebtoken');

class Service {

  constructor (options) {
    this.options = options;
  }
  
  setup(app) {
    this.app = app;
  }

  async create (data) {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        if (!data.token) {
          reject(new Error('null token'));
        }
        const header = this.app.get('authentication').jwt.header;
        const secret = this.app.get('authentication').secret;
        jwt.verify(data.token, secret, header, (err, decoded) => {
          if(err) reject(err);
          this.app.service('users').patch(decoded._id, {
            accessToken: data.token
          }).then(function(){
            resolve(true);
          }).catch(reject);
        });
      }, 1000);
    });
  }

  async get (data) {
    return new Promise((resolve, reject) => {
      let payload = this.app.get('authentication').jwt.payload;
      const header = this.app.get('authentication').jwt.header;
      const secret = this.app.get('authentication').secret;
      this.app.service('users').find({ 
        first_name: data.first_name,
        telegramId: data.telegramId
      }).then((res) => {
        if(res.total > 0) {
          payload._id = res.data[0]._id;
          return jwt.sign(payload, secret, header, (token) => {
            this.app.service('users').patch(res.data[0]._id, {
              accessToken: token
            }).then(function(){
              resolve(token)
            })
          });
        } else {
          reject(new Error('Telegram id not found'));
        }
      });
    });
  }

  async remove (data) {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        logger.debug(data);
        resolve();
      }, 1000);
    });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
