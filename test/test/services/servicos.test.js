const assert = require('assert');
const app = require('../../src/app');
const logger = require('winston')

const service = app.service('servicos');

describe('\'servicos\' service', () => {
    it('registered the service', () => {	
	assert.ok(service, 'Registered the service');
    });

    it('should find servicos', () => {
	service.find({}).then(function(res){
	    res.total.should.not.equal(0)
	    assert.ok(res.total > 0, 'servicos populated')
	}).catch(function(err){
	    assert.fail(err)
	})
    });
})
