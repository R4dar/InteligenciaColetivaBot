// Initializes the `bot` service on path `/bot`
const createService = require('./bot.class.js');
const hooks = require('./bot.hooks');
const path = require('path');

module.exports = function (app) {
  let docs =app.get('swagger/bot');
  let options = {
    root: path.join(__dirname, '..', '..', 'commands')
  };

  let __service__ = createService(options);
  app.use('/bot', Object.assign(__service__, {
    docs: docs
  }));
  // Get our initialized service so that we can register hooks
  const service = app.service('bot');
  service.hooks(hooks);
};
