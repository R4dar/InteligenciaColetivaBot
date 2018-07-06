// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

module.exports = function (app) {
    const mongooseClient = app.get('mongooseClient');
    let table = {
	telegramId: { type: String, required: true }
    }
    let users = new mongooseClient.Schema(table, {
	timestamps: true
    })
    return mongooseClient.model('users', users);
};
