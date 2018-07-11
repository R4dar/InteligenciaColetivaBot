// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const logger = require('winston')

module.exports = function (app) {
    const mongooseClient = app.get('mongooseClient');
    let table = {
	telegramId: { type: String, required: true },
	isAdmin: { type: Boolean }
    }
    let users = new mongooseClient.Schema(table, {
	timestamps: true
    })

    let Users = mongooseClient.model('users', users);

    Users.admins = app.get('authentication').telegram.admins
    //  Pre-save some data
    users.pre('save', function(next) {
	let self = this
	Users.find({telegramId: self.telegramId}).then(function(users){
	    if(users.length > 0) {
		logger.error("telegramId must be unique");
		self.invalidate("telegramId", "telegramId must be unique")
		return new Error("telegramId must be unique")
	    }
	    else {
		self.isAdmin = false
		for (let i in Users.admins) {
		    if (self.telegramId === Users.admins[i]){
			logger.debug("user "+self.telegramId+" is admin")
			self.isAdmin = true
			break;
		    }
		}
		next()
	    }
	}).catch(next)
    })
    
    return Users
};
