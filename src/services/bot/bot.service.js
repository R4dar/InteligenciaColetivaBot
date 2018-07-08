// Initializes the `bot` service on path `/bot`
const createService = require('./bot.class.js');
const hooks = require('./bot.hooks');
const logger = require('winston')
const bot = require('../../bot')

module.exports = function (app) {
    const config = app.get('authentication')
    // Initialize our service with any options it requires
    let docs =  app.get('swagger/bot')
    const options = {
	telegram: config.telegram, 
	config: bot
    }

    const _service_ = createService(options)
    app.use('/bot', Object.assign(_service_, {
	docs: docs
    }))

    // Get our initialized service so that we can register hooks
    const service = app.service('bot');
    
    service.hooks(hooks);
};
