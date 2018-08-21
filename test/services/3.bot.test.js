const assert = require('assert');
const app = require('../../src/app');
const service = app.service('authentication');
const telegram = app.get('authentication').telegram;
const host = app.get('host');
const port = app.get('port');
const secret = app.get('authentication').secret;
const uuid = require('uuid');

describe('\'bot\' service', () => {
  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('should send a Message to admins', () => {
    return Promise.all(telegram.admins.map(item => {
      return service.create({
        id: item,
        message: {
          type: 'Message', 
          value: 'Feathersjs + Mocha test passed' 
        }
      });
    })).then(function(res) {
      assert.ok(res.data, 'messages sent');
    }).catch(function(err){
      assert.fail(err);
    });
  });
});
