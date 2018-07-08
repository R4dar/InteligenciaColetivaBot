const users = require('./users/users.service.js');
const bot = require('./bot/bot.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(users);
    app.configure(bot);
}
