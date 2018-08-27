const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const fs = require('fs');
const mongoose = require('./mongoose');
const authentication = require('./authentication');
const swagger = require('feathers-swagger');

// now start
const app = express(feathers());

// Load app configuration
app.configure(configuration({
  path: path.join(__dirname, '..', '.env')
}));

// Reconfigure public/index.html
app.engine('tml', function (filePath, options, callback) {
  fs.readFile(filePath, function(err, content){
    if(!err){
      content = content.toString();
      content = content.replace('{{ telegram_username }}', app.get('authentication').telegram.username);
      content = content.replace('{{ telegram_username }}', app.get('authentication').telegram.username);
      content = content.replace('{{ telegram_username }}', app.get('authentication').telegram.username);
      content = content.replace('{{ audience }}', app.get('authentication').jwt.payload.audience);
      callback(null, content);
    } else {
      callback(err);
    }
  });
});

// specify the views directory
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'tml');

let auth = app.get('authentication');
auth.telegram.admins = auth.telegram.admins.split(' ');
app.set('authentication', auth);


// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

// Host the public folder
app.use(express.static(app.get('public')));
app.get('/', function(req, res){
  logger.debug('GET /');
  res.render('index');
});

// Configure Swagger Api
const _swagger_ = app.get('swagger');
_swagger_['uiIndex'] = path.join(__dirname, '..', _swagger_['uiIndex']);
app.configure(swagger(_swagger_));
    
// Set up Plugins and providers
app.configure(express.rest());
app.configure(mongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);

// Set up our services (see `services/index.js`)
app.configure(services);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));
app.hooks(appHooks);

// Go
module.exports = app;
