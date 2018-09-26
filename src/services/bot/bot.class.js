/* eslint-disable no-unused-vars */
const logger = require('winston');
const Telegraf = require('telegraf');
const TelegrafManager = require('./bot.manager.js');

class Service {

  constructor (options) {
    this.manager = new TelegrafManager(options);
  }

  setup(app) {
    this.app = app;
    let token = this.app.get('authentication').telegram.token;
    this.telegraf = new Telegraf(token);
    this.manager.build(this.app, this.telegraf);
  }

  // POST /bot will send a message with the bot
  async create (data) {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        logger.debug(data);
        try{
          // send message if a text
          let fn = this.telegraf.telegram.sendMessage;
          if( data.message.type === 'Message' ) fn(data.id, data.message.value);
          if( data.message.type === 'Photo' ) fn(data.id, {caption: data.message.value.caption, photo: data.message.value.photo });
          resolve('message sent to '+data.id);
        } catch(e) {
          reject(e);
        }
      }, 1000);
    });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
