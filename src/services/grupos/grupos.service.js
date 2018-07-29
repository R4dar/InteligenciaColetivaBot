// Initializes the `grupos` service on path `/grupos`
const createService = require('feathers-mongoose');
const createModel = require('../../models/grupos.model');
const hooks = require('./grupos.hooks');
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

    let docs =  app.get('swagger/grupos')
    // Initialize our service with any options it requires
    app.use('/grupos', Object.assign(createService(options), {
	docs: docs
    }));

    // Get our initialized service so that we can register hooks
    const service = app.service('grupos');

    service.hooks(hooks);
    if(process.env.NODE_ENV === 'development'){
	logger.debug('Dropping grupos service')
	drop(service, function(item){
	    return true
	}).then(function(res){
	    logger.debug('Grupos service dropped')
	}).catch(function(err){
	    logger.debug(err)
	})
    } 
};
