// feathers-blob service
const blobService = require('feathers-blob');
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
const fs = require('fs-blob-store');
const blobStorage = fs(__dirname + '/uploads');

module.exports = function (app) {
    // Upload Service
    app.use('/uploads', blobService({Model: blobStorage}));
}
