// Initializes the `messages` service on path `/messages`
const createService = require('feathers-mongoose');
const createModel = require('../../models/messages.model');
const hooks = require('./messages.hooks');
const m2s = require('mongoose-to-swagger');

module.exports = function (app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
	Model,
	paginate
    };

    let docs =  app.get('swagger/messages')
    docs.definitions.users = m2s(Model)
    // Initialize our service with any options it requires
    app.use('/messages', Object.assign(createService(options), {
	docs: docs
    }));

    // Get our initialized service so that we can register hooks
    const service = app.service('messages');

    service.hooks(hooks);
};
