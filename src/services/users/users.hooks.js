const { authenticate } = require('@feathersjs/authentication').hooks;
const search = require('feathers-mongodb-fuzzy-search');
const logger = require('../../hooks/logger');

module.exports = {
  before: {
    all: [ ],
    find: [ 
      authenticate('jwt'),
      search({
        fields: ['telegramId', 'first_name', 'lat', 'lon']
      })
    ],
    get: [ 
      authenticate('jwt')
    ],
    create: [ ],
    update: [ 
      authenticate('jwt')
    ],
    patch: [
      authenticate('jwt') 
    ],
    remove: [ 
      authenticate('jwt')
    ]
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [
      function(context){
        return context.app.service('bot').create({
          id: context.data.telegramId,
          message: {
            type: 'keyboard',
            value: [ 
              context.data.first_name+', seu cadastro foi bem logrado.',
              {
                'reply_markup': {
                  'keyboard': [
                    ['/start']
                  ]
                }
              }
            ] 
          }
        }).then(function(){
          return context;
        });
      }
    ],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [
      logger()
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
