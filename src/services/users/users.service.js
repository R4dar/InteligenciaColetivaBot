1// Initializes the `users` service on path `/users`
const createService = require('feathers-mongoose');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
const m2s = require('mongoose-to-swagger');
const drop = require('../../drop')
const logger = require('winston')

module.exports = function (app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
	Model,
	paginate
    };
    let docs =  app.get('swagger/users')
    docs.definitions.users = m2s(Model)
    // Initialize our service with any options it requires
    app.use('/users', Object.assign(createService(options), {
	docs: docs
    }));
    
    // Get our initialized service so that we can register hooks
    const service = app.service('users');
    service.hooks(hooks);
    if(process.env.NODE_ENV === 'development'){
	logger.debug('Dropping users service')
	drop(service, function(item){
	    return true
	}).then(function(res){
	    logger.debug('Users service dropped')
	})
    } else if (process.env.NODE_ENV === 'test' ) {
	logger.debug('Dropping users service unless a item is adminstrator')
	drop(service, function(item){
            logger.debug('user '+item._id+(item.isAdmin ? ' isnt admin' : ' is admin'))
	    return item.isAdmin
	}).then(function(res){
	    logger.debug('Users that arent admins are dropped')
	})
    }
};
