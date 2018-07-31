// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const logger = require('winston')

module.exports = function (app) {
    const mongooseClient = app.get('mongooseClient');
    let table = {
	telegramId: { type: String, required: true },
	isAdmin: { type: Boolean },
        auth_date: {type: Number, required: true},
        hash: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String },
	openid: { type: String },
	lat: { type: String },
	lon: { type: String },
        // user hasMany messages
	messages: [{ type: mongooseClient.Schema.ObjectId, ref: 'messages' }],
	// user hasMany messages
	uploads: [{ type: mongooseClient.Schema.ObjectId, ref:'uploads' }]
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
	    let promise = null
	    if(users.length > 0) {
		logger.error("telegramId deve ser único");
		app.service('bot').create({
		    id: self.telegramId,
		    message: {
			type: 'keyboard',
			value: [
			    'O senhor, ou a senhorita, já procedeu com o cadastro.',
			    {
				"reply_markup": {
				    "keyboard": [
					["/start"]
				    ]
				}
			    }
			]
		    }
		}).then(function(res){
		    self.invalidate("telegramId", "telegramId deve ser único")
		    next(new Error("telegramId deve ser único"))
		}).catch(function(err){
		    next(err)
		})
	    }
	    else {
		for (let i in Users.admins) {
		    if (self.telegramId === Users.admins[i]){
			logger.debug("user "+self._id+" is admin")
			self.isAdmin = new Boolean(true)
		    }
		}
		
		app.service('bot').create({
		    id: self.telegramId,
		    message: {
			type: 'keyboard',
			value: [
			    'Seu cadastro foi bem logrado.',
			    {
				"reply_markup": {
				    "keyboard": [
					["/start"]
				    ]
				}
			    }
			]
		    }
		}).then(function(res){
		    next()
		}).catch(function(err){
		    next(err)
		})
	    }
	})
    })
    
    return Users
};
