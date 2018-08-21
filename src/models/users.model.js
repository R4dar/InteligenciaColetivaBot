// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const logger = require('winston');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');

const invalidate = function(opt, next){
  opt.user.invalidate(opt.type, opt.message);
  next(new Error(opt.message));
};

const validate = function(app, user, admins, __jwt__, secret, next) {
  admins.forEach(function(item) {
    user.isAdmin = new Boolean(user.telegramId === item);
    logger.debug('user '+user._id+' '+(user.isAdmin ? 'is' : 'isnt')+' admin');
  });
  
  let payload = __jwt__.payload;
  const header = __jwt__.header;
  Object.assign(payload, { 
    telegramId: user.telegramId,
    hash: user.hash
  });
  
  jwt.sign(payload, secret, header, (token) => {
    user.accessToken = token;
    QRCode.toDataURL(token, function (err, url) {
      if (err) next(err);
      app.service('bot').create({
        id: user.telegramId,
        message: {
          type: 'Photo',
          value: {
            caption: 'Seu token jwt',
            photo: url
          }
        }
      });
    });
    next();
  });
};

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  let table = {
    telegramId: { type: String, required: true },
    isAdmin: { type: Boolean },
    auth_date: {type: Number, required: true},
    hash: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    accessToken: { type: String },
    openid: { type: String },
    lat: { type: String },
    lon: { type: String }
  };
  let users = new mongooseClient.Schema(table, { timestamps: true });
  let Users = mongooseClient.model('users', users);
  users.pre('save', function(next) {
    let self = this;
    Users.find({telegramId: self.telegramId}).then((users) => {
      if(users.length > 0) {
        const cause = { 
          user: self, 
          type: 'telegramId', 
          message: 'telegramId already registered' 
        };
        invalidate(cause, next);
      }
      let __jwt__ = app.get('authentication').jwt;
      let secret = app.get('authentication').secret;
      let admins = app.get('authentication').telegram.admins;
      validate(app, self, admins, __jwt__, secret, next);
    });
  });
  return Users;
};
