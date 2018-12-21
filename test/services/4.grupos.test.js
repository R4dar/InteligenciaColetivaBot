const assert = require('assert');
const app = require('../../src/app');
const service = app.service('grupos');
require('should');

describe('\'grupos\' service', () => {
    
  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('create a grupo, and this use should receive a message', () => {
    service.create({
      name: 'Grupo teste',
      tags: ['test', 'feathers', 'grupo']
    }).then(function(res){
      res.should.be.ok();
    }).catch(function(err){
      assert.fail(err);
    });
  });

  it('get a list of grupos', () => {
    service.find({}).then(function(res){
      res.total.should.exists();
      res.total.should.be.equal(1);
      res.data.should.be.Array();
      res.data.length.should.be.equal(1);
      let props = ['name', 'tags', 'users'];
      for(let i in props) {
        res.data[0].should.have.property(props[i]);
      }
      assert.ok(res.data[0]._id, 'Found 1 grupo');
    }).catch(function(err){
      assert.fail(err);
    });
  });
});
