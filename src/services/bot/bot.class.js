/* eslint-disable no-unused-vars */
const logger = require('winston')
const TelegramBot = require('node-telegram-bot-api')
const { EventEmitter } = require('events')

class Service {
    constructor (config) {
	this.telegram_bot = new TelegramBot(config.token, {polling: true})
	this.assistente_bot = config.config
	this.__init__()
    }
    
    async __init__ () {
	let promises = []
	for (let key in this.assistente_bot) {
	    for (let message in this.assistente_bot[key]){
		this.telegram_bot[key](new RegExp(message), (msg, match) => {
		    this.assistente_bot[key][message](msg, match).then((data) => {
			for(let i in data.messages) {
			    this.create({
				id: msg.chat.id,
				message: data.messages[i]
			    }).then(function(res){
				logger.debug(res)
			    })
			}
		    })
		})
	    }
	}
    }
    async create (data) {
	return new Promise((resolve, reject) => {
	    setTimeout(() => {
		logger.debug('sending message')
		logger.debug(data)
		this.telegram_bot.sendMessage(data.id, ...data.message.value)
		resolve(data)
	    }, 1000)
	})
    }			  
}

module.exports = function (options) {
    return new Service({
	username: options.telegram.username,
	token: options.telegram.token,
	config: options.config
    });
};

module.exports.Service = Service;
