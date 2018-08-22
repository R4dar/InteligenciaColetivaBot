const assert = require('assert');
const app = require('../../src/app');
const service = app.service('bot');
const telegram = app.get('authentication').telegram;
const logger = require('winston');

describe('\'bot\' service', () => {
  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('should send a Message to admins', () => {
    Promise.all(telegram.admins.map(item => {
      return service.create({
        id: item,
        message: {
          type: 'Message', 
          value: 'Feathersjs + Mocha test passed' 
        }
      });
    })).then(function(res) {
      assert.ok(res, 'messages sent');
    }).catch(function(err){
      assert.fail(err, 'messages not sent');
    });
  });
});
