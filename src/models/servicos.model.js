// servicos-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const servicos = new Schema({
    name: { type: String, required: true },
    uri: { type: String },
    logo_uri: { type: String },
    users: { type: Number }
  }, {
    timestamps: true
  });

  return mongooseClient.model('servicos', servicos);
};
