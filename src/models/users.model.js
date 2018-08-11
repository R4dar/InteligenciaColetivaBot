// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const logger = require('winston');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  let table = {
    telegramId: { type: String, required: true },
    isAdmin: { type: Boolean },
    auth_date: {type: Number, required: true},
    hash: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    accessToken: { type: String},
    openid: { type: String },
    lat: { type: String },
    lon: { type: String }
  };
  let users = new mongooseClient.Schema(table, { timestamps: true });
  let Users = mongooseClient.model('users', users);
  Users.admins = app.get('authentication').telegram.admins;
  users.pre('save', function(next) {
    let self = this;
    Users.find({telegramId: self.telegramId}).then(function(users){
      if(users.length > 0) {
        self.invalidate('telegramId', 'telegramId deve ser único');
        next(new Error('telegramId deve ser único'));
      } else {
        for (let i in Users.admins) {
          if (self.telegramId === Users.admins[i]){
            logger.debug('user '+self._id+' is admin');
            self.isAdmin = new Boolean(true);
          }
        }
        next();
      }
    });
  });
  return Users;
};
