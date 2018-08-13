const assert = require('assert');
const app = require('../../src/app');
const service = app.service('issuer');

describe('\'issuer\' service', () => {
  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('request id.org.br issuer', () => {
    return app.service('users').find({}).then(function(res){
      return service.create({
        telegramId: res.data[0].telegramId
      });
    }).then(function(res){
      assert.ok(res, 'issuer ok');
    });
  });
});
