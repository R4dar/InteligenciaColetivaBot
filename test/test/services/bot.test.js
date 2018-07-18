const assert = require('assert');
const app = require('../../src/app');
const service = app.service('bot');
const telegram = app.get('authentication').telegram
const host = app.get('host')
const port = app.get('port')
const logger = require('winston')

describe('\'bot\' service', () => {
    it('registered the service', () => {
	assert.ok(service, 'Registered the service');
    });

    it('should send messages to admins', () => {
	let promises = []
	for(let i in telegram.admins) {
	    let promise = service.create({
		id: telegram.admins[i],
		message: {type: 'string', value: 'Feathersjs + Mocha test from http://'+host+':'+port}
	    }).then(function(res){
		logger.debug(res)
	    })
	    promises.push(promise)
	}
	Promise.all(promises).then(function(res) {
	    logger.debug(res)
	    assert.ok(res, 'messages sent')
	}).catch(function(err){
	    assert.fail(err)
	})
    })
});
