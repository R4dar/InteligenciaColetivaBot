const users = require('./users/users.service.js');
const bot = require('./bot/bot.service.js');
const messages = require('./messages/messages.service.js');
const uploads = require('./uploads/uploads.service.js');
const servicos = require('./servicos/servicos.service.js');
const grupos = require('./grupos/grupos.service.js');
const issuer = require('./issuer/issuer.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(bot);
  app.configure(messages);
  app.configure(uploads);
  app.configure(servicos);
  app.configure(grupos);
  app.configure(issuer);
};
