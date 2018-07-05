1// Initializes the `users` service on path `/users`
const createService = require('feathers-mongoose');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
const m2s = require('mongoose-to-swagger');

module.exports = function (app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
	Model,
	paginate
    };

    let usersEvents = createService(options)
    usersEvents.docs =  {
        description: "User service", 
	definitions: {
	    users: m2s(Model),
            'users list': {
		$ref: '#/definitions/users'
	    }
	}
    }
    // Initialize our service with any options it requires
    app.use('/users', usersEvents);
    
    // Get our initialized service so that we can register hooks
    const service = app.service('users');
    
    service.hooks(hooks);
};
