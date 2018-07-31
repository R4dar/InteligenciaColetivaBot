// Initializes the `uploads` service on path `/uploads`
const createService = require('feathers-mongoose');
const createModel = require('../../models/uploads.model');
const hooks = require('./uploads.hooks');

// feathers-blob service
const blobService = require('feathers-blob');
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
const fs = require('fs-blob-store');
const multer = require('multer');

const swagger = require('../../swagger')

// File storage location. Folder must be created before upload.
// Example: './uploads' will be located under feathers app top level.
const blobStorage = fs('./uploads');
module.exports = function (app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');
    const blobStorage = fs(__dirname + '/uploads')
    
    swagger(app, 'uploads', {
	find: {security:['local', 'jwt']},
	create: {},
	get: {security:['local', 'jwt']},
	update: {security:['local', 'jwt']},
	patch: {security:['local', 'jwt']},
	remove: {security:['local', 'jwt']}
    })
    const docs =  app.get('swagger/uploads')
    const multipart = multer()
    
    const middlewares = [
	multipart.single('uri'),
	function(req,res,next){
            req.feathers.file = req.file;
            next();
	},
	Object.assign(blobService({Model: blobStorage}), {
	    paginate: paginate,
	    docs: docs
	})
    ]
    app.use('/uploads', ...middlewares);

    // Get our initialized service so that we can register hooks
    const service = app.service('uploads');
    
    service.hooks(hooks);
};
