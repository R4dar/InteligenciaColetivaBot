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
    Promise.all(telegram.admins.map(function(item){
      return service.create({
        telegramId: item,
        first_name: 'Test user '+item,
        auth_date: Date.now(),
        hash: uuid.v4()
      });
    })).then(function(results){
      results.should.be.Array();
      results.length.should.be.equal(3);
      assert.ok(results.length > 0, 'Users created');
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
      process.env.USER_UNDER_TEST_HASH = res.data[0].hash;
      assert.ok(process.env.USER_UNDER_TEST_ID && process.env.USER_UNDER_TEST_HASH, 'Found 1 user');
    }).catch(function(err){
      assert.fail(err);
    });
  });
});
