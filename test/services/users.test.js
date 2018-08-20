const assert = require('assert');
const app = require('../../src/app');
const service = app.service('users');
const telegram = app.get('authentication').telegram;
const uuid = require('uuid');
require('should');

describe('\'users\' service', () => {
  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('create a user, and this use should receive a message', () => {
    service.create({
      telegramId: telegram.admins[0],
      first_name: 'Test',
      last_name: telegram.username,
      auth_date: Date.now(),
      hash: uuid.v4()
    }).then(function(res){
      res.should.be.ok();
    }).catch(function(err){
      assert.fail(err);
    });
  });

  it('get a list of users', () => {
    service.find({}).then(function(res){
      res.total.should.exists();
      res.total.should.be.equal(1);
      res.data.should.be.Array();
      res.data.length.should.be.equal(1);
      let props = ['telegramId', 'auth_date', 'hash', 'first_name', '_id'];
      for(let i in props) {
        res.data[0].should.have.property(props[i]);
      }
      process.env.USER_UNDER_TEST_ID = res.data[0]._id;
      assert.ok(process.env.USER_UNDER_TEST_ID, 'Found 1 user');
    }).catch(function(err){
      assert.fail(err);
    });
  });
});
