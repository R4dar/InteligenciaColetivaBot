/* eslint-disable no-unused-vars */
const logger = require('winston')
const TelegramBot = require('node-telegram-bot-api')

class Service {

    constructor (options) {
	this.options = options
    }
    
    setup(app) {
	this.app = app
	let token = this.app.get('authentication').telegram.token
	this.telegram_bot = new TelegramBot(token, {polling: true})
	this.assistente_bot = {}
	Object.keys(this.options).map(item => {
	    Object.keys(this.options[item]).map(jtem => {
		this.telegram_bot[item](new RegExp(jtem), async (msg, match) => {
		    let data = await this.options[item][jtem](this.app)
		    data.messages.map(async (message) => {
			await this.create({
			    id: msg.chat.id,
			    message: message
			})
		    })
		})
	    })
	})
    }

    async create (data) {
	return new Promise((resolve, reject) => {
	    setTimeout(async() => {
		try{
		    // send message
		    this.telegram_bot.sendMessage(data.id, ...data.message.value)

		    // backup message
		    //let res = await this.app.service('messages').create({
		    // id: data.id,
		    // value: data.message.value
		    // })
		    resolve(data)
		} catch(e) {
		    reject(e)
		}
	    }, 1000)
	})
    }			  
}

module.exports = function (options) {
    return new Service(options)
};

module.exports.Service = Service;
