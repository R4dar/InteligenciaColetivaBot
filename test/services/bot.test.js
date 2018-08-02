const assert = require('assert');
const app = require('../../src/app');
const service = app.service('authentication');
const telegram = app.get('authentication').telegram
const host = app.get('host')
const port = app.get('port')
const logger = require('winston')

describe('\'bot\' service', () => {
    it('registered the service', () => {
	assert.ok(service, 'Registered the service');
    });

    it('should send messages to admins', () => {
	Promise.all(telegram.admins.map(item => {
	    return service.create({
		id: item,
		message: {type: 'string', value: 'Feathersjs + Mocha test from http://'+host+':'+port}
	    })
	})).then(function(res) {
	    assert.ok(res.data, 'messages sent')
	}).catch(function(err){
	    assert.fail(err)
	})
    })
});
