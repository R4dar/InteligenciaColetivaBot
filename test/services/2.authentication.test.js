const assert = require('assert');
const app = require('../../src/app');
const service = app.service('authentication');
const admins = app.get('authentication').telegram.admins;

describe('\'authentication\' service', () => {
  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('should authentication must be invalid for a valid user', () => {
    Promise.all(admins.map( item => {
      return app.service('users').find({ telegramId: item }).then(function(user) {
        return service.create({
          telegramId: user.telegramId,
          hash: '123'
        });
      });
    })).catch(function(err){
      assert.ok(err, 'Forbiden access');
    });
  });

  it('should authentication must be valid for a valid user', () => {
    Promise.all(admins.map( item => {
      return app.service('users').find({ telegramId: item }).then(function(user) {
        return service.create({
          telegramId: user.telegramId,
          hash: user.hash
        });
      });
    })).then(function(results){
      assert.ok(results, 'Verified access');
    });
  });
});
