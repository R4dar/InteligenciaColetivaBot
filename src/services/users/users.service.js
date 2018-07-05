1// Initializes the `users` service on path `/users`
const createService = require('feathers-mongoose');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');

module.exports = function (app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
	Model,
	paginate
    };

    let usersEvents = createService(options)
    usersEvents.docs = {
        description: "User service"
	//overwrite things here.
	//if we want to add a mongoose style $search hook to find, we can write this:
	find: {
	    parameters: [
		{
		    description: 'Number of results to return',
		    in: 'query',
		    name: '$limit',
		    type: 'integer'
		},
		{
		    description: 'Number of results to skip',
		    in: 'query',
		    name: '$skip',
		    type: 'integer'
		},
		{
		    description: 'Property to sort results',
	            in: 'query',
		    name: '$sort',
		    type: 'string'
		},
		{
		    description: 'Property to query results',
		    in: 'query',
		    name: '$search',
		    type: 'string'
		}
	    ]
	}//,
	//if we want to add the mongoose model to the 'definitions' so it is a named model in the swagger ui:
	//definitions: {
	    // event: mongooseToJsonLibraryYouImport(Model) //import your own library, use the 'Model' object in this file.
	//    'event list': { //this library currently configures the return documentation to look for ``${tag} list`
	//	type: 'array',
	//	items: { $ref: '#/definitions/users' }
	//    }
	//}
    }
    // Initialize our service with any options it requires
    app.use('/users', usersEvents);

    // Get our initialized service so that we can register hooks
    const service = app.service('users');

    service.hooks(hooks);
};
