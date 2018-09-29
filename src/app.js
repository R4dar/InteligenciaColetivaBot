// # Express application
// Assistente is a express.js application with feathers boilerplate and some customizations.
// ## Express Dependencies
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

// ## Express + Feathers
// [Feathers](https://feathersjs.com/) is a framework that have a nice
// paradigm on bootstrap a []express](https://github.com/expressjs/express) server application.
const app = express(feathers());

// ## Configuration
// Load app configuration with
// a customization of official @feathersjs/configuration
// (see [package.json](../package.json) for more) 
app.configure(configuration());

// ## `public/index.html`
// Some process.env variables defined in .env ou Dockerfile will
// be used here to dynamicaly render telegram and api namespaces
// TODO: a better render or use another some
app.engine('tml', function (filePath, options, callback) {
  fs.readFile(filePath, function(err, content){
    if(!err){
      content = content.toString();
      const title = app.get('name');
      content = content.replace('{{ title }}', title);
      content = content.replace('{{ title }}', title);
      const bot_name = app.get('authentication').telegram.username;
      content = content.replace('{{ bot_name }}', bot_name);
      const audience = app.get('authentication').jwt.payload.audience;  
      content = content.replace('{{ audience }}', audience);
      callback(null, content);
    } else {
      callback(err);
    }
  });
});

// ## Views
// specify the views directory and parser
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'tml');

// ## Telegram Auth
let auth = app.get('authentication');
auth.telegram.admins = auth.telegram.admins.split(' ');
app.set('authentication', auth);


// ## Security
// Enable CORS, security
app.use(cors());
app.use(helmet());

// ## Body
// compression, favicon and body parsing
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

// # `/`
// Host the public folder
app.use(express.static(app.get('public')));
app.get('/', function(req, res){
  logger.debug('GET /');
  res.render('index');
});

// ## Swagger
// Configure Swagger Api
const _swagger_ = app.get('swagger');
_swagger_['uiIndex'] = path.join(__dirname, '..', _swagger_['uiIndex']);
app.configure(swagger(_swagger_));


// ## REST and database
// Set up Plugins and providers
app.configure(express.rest());
app.configure(mongoose);

// ## Middlwares
// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);

// ## Feathers services
// Set up our services (see `services/index.js`)
app.configure(services);

// ## 404 and errors
// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));
app.hooks(appHooks);

// Go
module.exports = app;
