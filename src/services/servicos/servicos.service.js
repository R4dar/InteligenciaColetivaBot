// Initializes the `servicos` service on path `/servicos`
const createService = require('feathers-mongoose');
const createModel = require('../../models/servicos.model');
const hooks = require('./servicos.hooks');
const logger = require('winston')
const axios = require('axios')
const drop = require('../../drop')
const m2s = require('mongoose-to-swagger');

module.exports = function (app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
	Model,
	paginate
    };

    let docs =  app.get('swagger/users')
    docs.definitions.servicos = m2s(Model)
    // Initialize our service with any options it requires
    app.use('/servicos', Object.assign(createService(options), {
	docs: docs
    }));
    
    // Get our initialized service so that we can register hooks
    const service = app.service('servicos');

    service.hooks(hooks);
    if(process.env.NODE_ENV === 'development'){
	logger.debug('Dropping and populating servicos service')
	drop(service, function(item){
	    return true
	}).then(function(res){
	    logger.debug('Users service dropped')
	    return axios({
		url: 'https://logincidadao.rs.gov.br/api/v1/statistics.json',
		method: 'get'
	    })
	}).then(function(res){
	    return Promise.all(res.data.users_by_service.map(function(item){
		service.create(item)
	    }))
	}).then(function(res){
	    return axios({
		url: 'https://id.org.br/api/v1/statistics.json',
		method: 'get'
	    })
	}).then(function(res){
	    return Promise.all(res.data.users_by_service.map(function(item){
		service.create(item)
	    }))
	}).catch(function(err){
	    logger.debug(err)
	})
    }
};
