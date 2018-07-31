// Initializes the `messages` service on path `/messages`
const createService = require('feathers-mongoose');
const createModel = require('../../models/messages.model');
const hooks = require('./messages.hooks');
const m2s = require('mongoose-to-swagger');
const drop = require('../../drop')
const swagger = require('../../swagger')
const logger = require('winston')

module.exports = function (app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
	Model,
	paginate
    };

    
    swagger(app, 'messages', {
	find: {security:['local', 'jwt']},
	create: {},
	get: {security:['local', 'jwt']},
	update: {security:['local', 'jwt']},
	patch: {security:['local', 'jwt']},
	remove: {security:['local', 'jwt']}
    })
    let docs =  app.get('swagger/messages')
    docs.definitions.users = m2s(Model)
    // Initialize our service with any options it requires
    app.use('/messages', Object.assign(createService(options), {
	docs: docs
    }));

    // Get our initialized service so that we can register hooks
    const service = app.service('messages');

    service.hooks(hooks);
    if(process.env.NODE_ENV === 'development'){
	logger.debug('Dropping users service')
	drop(service, function(item){
	    return true
	}).then(function(res){
	    logger.debug('Users service dropped')
	}).catch(function(err){
	    logger.debug(err)
	})
    }
};
