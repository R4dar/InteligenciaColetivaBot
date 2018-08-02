/* eslint-disable no-unused-vars */
const logger = require('winston')
const TelegramBot = require('node-telegram-bot-api')
const path = require('path')
const fs = require('fs')

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
		    let data = await this.options[item][jtem](this.app, msg, match)
		    data.messages.map(async (message) => {
			await this.create({
			    id: msg.chat.id,
			    message: message
			})
		    })
		})
	    })
	})

	// share location
	this.telegram_bot.once("location", async (msg, match) => {
	    let res = await this.app.service('users').find({telegramId: msg.chat.id})
	    await this.app.service('users').patch(res.data[0]._id, {
		lat: msg.location.latitude,
		lon: msg.location.longitude
	    })
	    
	    await this.create({
		id: msg.chat.id,
		message: {
		    type: 'string',
		    value: 'Localização salva'
		}
	    })
	})
    }

    // POST /bot will send a message with the bot
    async create (data) {
	return new Promise((resolve, reject) => {
	    setTimeout(()=> {
		try{
		    // send message
		    this.telegram_bot.sendMessage(data.id, ...data.message.value)
		    resolve(data)
		} catch(e) {
		    reject(e)
		}
	    }, 1000)
	})
    }	

    // GET /bot will only render a .json template file located in commands
    async get (data) {
	return new Promise((resolve, reject) => {
	    setTimeout(()=> {
		let p = path.join(__dirname, 'commands', data.name+'.json')
		fs.readFile(p, 'utf8', function(err, content) {
		    if (err) reject(err)
		    content = content.toString()
		    Object.keys(data.data).map(item => {
			content = content.replace('{{ '+item+' }}', data.data[item])
		    })
		    content = JSON.parse(content)
		    resolve(content)
		})
	    }, 1000)
	})
    }	
}

module.exports = function (options) {
    return new Service(options)
};

module.exports.Service = Service;
