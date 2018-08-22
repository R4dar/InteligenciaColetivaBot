const assert = require('assert');
const app = require('../../src/app');
const service = app.service('issuer');
const admins = app.get('authentication').telegram.admins;

describe('\'issuer\' service', () => {
  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('request id.org.br issuer', () => {
    Promise.all(admins.map(item => {
      return service.create({
        telegramId: item
      })
    })).then(function(res) {
      assert.ok(res, 'issuer ok');
    }).catch(function(err){
      assert.fail(err, 'issuer fail');
    });
  });
});
