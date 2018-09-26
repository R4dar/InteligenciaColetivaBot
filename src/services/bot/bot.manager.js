const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const logger = require('winston');

// The bot will be managed by an manager, defined by the yaml files
class TelegrafManager {

  constructor (options) {
    const manager = {};
    const d = fs.readdirSync(options.root);
    d.forEach(function(dir) {
      if (dir !== '.' && dir !== '..') {
        manager[dir] = {};
        const dd = fs.readdirSync(options.root+'/'+dir);
        dd.forEach(function(file) {
          let name = file.split('.yml')[0];
          let p = path.join(options.root, dir, file);
          let data = fs.readFileSync(p, 'utf8');
          manager[dir][name] = yaml.safeLoad(data);
        });
      }
    });
    this.manager = manager;
  }

  init (telegraf) {
    // Register logger middleware
    telegraf.use((ctx, next) => {
      const start = new Date();
      return next().then(() => {
        const ms = new Date() - start;
        logger.debug('response time %sms', ms);
      });
    });
  }

  // build commands with any macro sent
  build (app, telegraf) {
    Object.keys(this.manager).forEach(manages => {
      // console.log(`${this.manager[manages]}`);
      const t = `${this.manager[manages]}`;
      // now manages every command defined by objects as templates
      t.map(command => {

        // A command is defined by slash with the command name
        telegraf.command(command, (ctx) => {
          app.service('users').find({ telegramId: ctx.chat.id }).then(function(res){
            // Fake a environment
            let data = {
              name: command,
              data: {
                chat_id: ctx.chat.id,
                username: res.data[0].fist_name,
                url_cadastro: app.get('authentication').jwt.payload.audience
              }
            };
            return app.service('bot').create(data);
          }).catch(function(err){
            if (err) logger.log(err);

            let data = {
              name: 'cadastre-se',
              data: {
                chat_id: ctx.chat.id
                // username: res.data[0].first_name,
                // url_cadastro: app.get('authentication').jwt.payload.audience
              }
            };
            return app.service('bot').create(data);
          });
        });
      });
    });
  }
}

module.exports = TelegrafManager;
