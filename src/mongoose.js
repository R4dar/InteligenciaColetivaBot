const mongoose = require('mongoose');
const logger = require('winston');
module.exports = function (app) {
  mongoose.connect(app.get('mongodb'), {}).then(function(){
    logger.debug('Connected to mongo database');
    if(process.env.NODE_ENV === 'development'){
      Promise.all(['users', 'grupos', 'servicos'].map(item => {
        logger.debug('Dropping '+item+' service');
        return app.service(item);
      })).then(function(service){
        drop(service, function(){
          return true;
        }).then(function(){
          logger.debug('service dropped');
        }).catch(function(err){
          logger.debug(err);
        });
      });
    } else if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production' ) {
      Promise.all(['users'].map(item => {
        logger.debug('Dropping users service unless a item is adminstrator');
        return app.service(item);
      })).then(function(service){
        drop(service, function(item){
          logger.debug(item._id);
          return item.isAdmin;
        }).then(function(){
          logger.debug('Users that arent admins are dropped');
        }).catch(function(err){
          logger.debug(err);
        });
      })
    }
  }).catch(function(err){
    logger.debug(err);
  })
  //mongoose.Promise = global.Promise;
  app.set('mongooseClient', mongoose);
};
