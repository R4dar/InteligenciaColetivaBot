// messages-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const messages = new Schema({
    to: { type: String, required: true },
    text: { type: String, required: true },
    keyboard: {type: Object}
  }, {
    timestamps: true
  });

  return mongooseClient.model('messages', messages);
};
