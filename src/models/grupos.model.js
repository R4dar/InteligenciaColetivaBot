// grupos-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const grupos = new Schema({
      name: { type: String, required: true },
      // group hasMany users
      users: [{ type: mongooseClient.Schema.ObjectId, ref: 'users' }],
      tags: [{ type: String }]
  }, {
    timestamps: true
  });

  return mongooseClient.model('grupos', grupos);
};
