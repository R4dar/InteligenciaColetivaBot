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
        if (!data.hash) reject(new Error('null hash'));
        const header = this.app.get('authentication').jwt.header;
        const secret = this.app.get('authentication').secret;
        jwt.verify({
          telegramId: data.telegramId,
          hash: data.hash
        }, secret, header, (err, decoded) => {
          if(err) reject(err);
          resolve(true);
        });
      }, 1000);
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
