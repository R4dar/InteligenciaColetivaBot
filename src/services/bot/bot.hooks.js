const { authenticate } = require('@feathersjs/authentication').hooks;
const app = require('../../app')
const saveMessages = require('./bot.hooks.saveMessages')
const uploadFile = require('./bot.hooks.uploadFile')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
//	uploadFile('default')
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [	
//	saveMessages(app)
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
