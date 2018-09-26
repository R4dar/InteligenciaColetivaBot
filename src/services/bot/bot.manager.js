const path = require('path');
const fs = require('fs');
const yaml require('js-yaml');

// The bot will be managed by an manager, defined by the yaml files
class TelegrafManager {

  constructor (options) {
    this.manager = {};
    fs.readdirSync(options.root).forEach(dir => {
      if (dir !== '.' && dir !== '..') {
        this.templates[dir] = {};
        fs.readdir(options.root+'/'+dir).forEach(file => {
          let name = file.split('.yml')[0];
          let p = path.join(options.root, dir, file);
          let data = fs.readFileSync(p, 'utf8');
          this.manager[dir][name] = yaml.safeLoad(data);
        });
      }
    });
  }

  init (telegraf) {
    // Register logger middleware
    telegraf.use((ctx, next) => {
      const start = new Date()
      return next().then(() => {
        const ms = new Date() - start
        logger.debug('response time %sms', ms)
      });
    });
  }

  // build commands with any macro sent
  build (app, telegraf) {
    Object.keys(this.manager).forEach(manages => {
      
      // now manages every command defined by objects as templates
      this.manager[manages].map(command => {
        
        // A command is defined by slash with the command name
        telegraf.command(command, (ctx) => {
          app.service('users').find({ telegramId: ctx.chat.id }).then(function(res){
            // Fake a environment
            let data = { 
              name: command, 
              data: { 
                chat_id: res.data[0].telegramId, 
                username: res.data[0].fist_name 
                url_cadastro: app.get('authentication').jwt.payload.audience 
              }
            };
            return app.service('bot').create(data); 
          }).catch(function(err){
            let data = { 
              name: 'cadastre-se', 
              data: { 
                chat_id: res.data[0].telegramId, 
                username: res.data[0].first_name 
                url_cadastro: app.get('authentication').jwt.payload.audience 
              }
            };
            return app.service('bot').create(data); 
          });
        });
      });
    });
  }
}

module.exports = TelegrafManager
