const assert = require('assert');
const app = require('../../src/app');
const service = app.service('issuer');

describe('\'issuer\' service', () => {
  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('request id.org.br issuer', () => {
    return service.create({
      telegramId: app.get('authentication').telegram.admins[0]
    }).then(function(res){
      assert.ok(res, 'issuer ok');
    });
  });
});
