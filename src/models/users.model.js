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
	    if(users.length > 0) {
		logger.error("telegramId deve ser único");
		app.service('bot').create({
		    id: self.telegramId,
		    message: {type: 'text', value: 'Olá, '+self.first_name+'. Você já está cadastrado'}
		})
		self.invalidate("telegramId", "telegramId deve ser único")
		next(new Error("telegramId deve ser único"))
	
	    }
	    else {
		for (let i in Users.admins) {
		    if (self.telegramId === Users.admins[i]){
			logger.debug("user "+self._id+" is admin")
			self.isAdmin = new Boolean(true)
			app.service('bot').create({
			    id: self.telegramId,
			    message: {type: 'text', value: 'Olá, '+self.first_name+'. Você foi identificado como um dos meus administradores. Para autenticar em nossos serviços, entre como usuário '+self.telegramId+'e senha'+self.hash}
			})
		    }
		}
	    }
	    next()
	})
    })
    
    return Users
};
