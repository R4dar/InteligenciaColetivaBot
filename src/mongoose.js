const mongoose = require('mongoose');
const logger = require('winston');
const drop = require('./drop');
const qs = require('querystring');

module.exports = function (app) {
  let mongodb = app.get('mongodb');
  mongodb = mongodb.replace('MONGODB_USERNAME', process.env['MONGODB_USERNAME'] || 'assistente');
  mongodb = mongodb.replace('MONGODB_PWD', qs.stringify({ 
    query: process.env['MONGODB_PWD'] 
  }).split('query=')[1]);
  mongodb = mongodb.replace('MONGODB_HOST', process.env['MONGODB_HOST']);
  mongodb = mongodb.replace('MONGODB_PORT', process.env['MONGODB_PORT']);
  mongodb = mongodb.replace('MONGODB_DBNAME', process.env['MONGODB_DBNAME']);
  app.set('mongodb', mongodb);
  mongoose.connect(app.get('mongodb'), { useNewUrlParser: true }).then(function(){
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
        logger.debug('Dropping '+item+' service unless is adminstrator');
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
      });
    }
  }).catch(function(err){
    logger.debug(err);
  });
  //mongoose.Promise = global.Promise;
  app.set('mongooseClient', mongoose);
};
