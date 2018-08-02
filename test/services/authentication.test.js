const assert = require('assert');
const app = require('../../src/app');
const service = app.service('authentication');
const users = app.service('users');
const telegram = app.get('authentication').openid
const host = app.get('host')
const port = app.get('port')
const logger = require('winston')

describe('\'authentication\' service', () => {
    it('registered the service', () => {
	assert.ok(service, 'Registered the service');
    });

    it('should authentication must reject by invalid secret', () => {
	users.find({}).then(function(res){
	    if(res.total > 0) {
		return service.get({
		    telegramId: res.data[0].telegramId
		}).then(function(token){
		    return service.create({
			token: token,
			secret: 'wrong secret'
		    })
		})
	    } else {
		return new Error("No user found")
	    }
	}).catch(function(err){
	    assert.ok(err, 'Forbiden access')
	})
    })

    it('should authentication must reject by invalid token', () => {
	users.find({}).then(function(res){
	    if(res.total > 0) {
		return service.create({
		    token: 'wrong token',
		    secret: res.data[0].hash
		})
	    } else {
		return new Error("No user found")
	    }
	}).catch(function(err){
	    assert.ok(err, 'Forbiden access')
	})
    })

    it('should try authenticate with valid token and secret', () => {
	users.find({}).then(function(res){
	    if(res.total > 0) {
		return service.get({
		    telegramId: res.data[0].telegramId
		}).then(function(token){
		    return service.create({
			token: token,
			secret: res.data[0].hash
		    })
		})
	    } else {
		return new Error("No user found")
	    }
	}).then(function(res) {
	    assert.ok(res, 'user authenticated')
	}).catch(function(err){
	    assert.fail(err)
	})
    })
});
