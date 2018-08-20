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
        if(!data.token && !data.secret) {
          reject(new Error('null credentials'));
        } else if (data.token && !data.secret) {
          reject(new Error('null secret'));
        } else if (!data.token && data.secret) {
          reject(new Error('null token'));
        }
        jwt.verify(data.token, data.secret, (err, decoded) => {
          logger.debug(decoded)
          if(err) reject(err);
          logger.debug(decoded);
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
    return this.app.service('users').find({telegramId:data.telegramId}).then((res) => {
      if(res.total > 0) {
        let payload = this.app.get('authentication').jwt.payload;
        payload._id = res.data[0]._id;
        let header = this.app.get('authentication').jwt.header;
        let secret = this.app.get('authentication').secret;
        return jwt.sign(payload, res.data[0].hash, header);
      } else {
        return new Error('Telegram id not found');
      }
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
