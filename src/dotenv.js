const path = require('path')
const dotenv = require('dotenv')
const mongoUriBuilder = require('mongo-uri-builder');
const qs = require('querystring');
const fs = require('fs')

module.exports = function(){
    return function(){
	const app = this
	dotenv.config()
	app.set('host', app.get('host').replace(/HOST/, process.env.HOST))
	app.set('port', app.get('port').replace(/PORT/, process.env.PORT))
	let url = mongoUriBuilder({
	    host: process.env.MONGODB_USER+':'+qs.escape(process.env.MONGODB_PWD)+'@'+process.env.MONGODB_HOST,
	    port: process.env.MONGODB_PORT,
	    database: 'assistente'
	});
	app.set('mongodb', app.get('mongodb').replace(/MONGODB_URL/, url))
	let auth = app.get('authentication')
	auth.secret = auth.secret.replace(/AUTHENTICATION_SECRET/, process.env.AUTHENTICATION_SECRET)
	auth.jwt.audience = auth.jwt.audience.replace(/AUDIENCE/, process.env.AUDIENCE)
	auth.telegram.username = auth.telegram.username.replace(/TELEGRAM_USERNAME/, process.env.TELEGRAM_USERNAME)
	auth.telegram.token = auth.telegram.token.replace(/TELEGRAM_TOKEN/, process.env.TELEGRAM_TOKEN)
	auth.telegram.admins = process.env.TELEGRAM_ADMINS.split(' ').map(item => { return item })
	auth.openid.clientID = auth.openid.clientID.replace(/OPENID_CLIENT_ID/, process.env.OPENID_CLIENT_ID)
	auth.openid.clientSecret = auth.openid.clientSecret.replace(/OPENID_CLIENT_SECRET/, process.env.OPENID_CLIENT_SECRET)
	app.set('authentication', auth)

	// Reconfigure public/index.html
	app.engine('tml', function (filePath, options, callback) {
	    fs.readFile(filePath, function(err, content){
		if(!err){
		    content = content.toString()
		    content = content.replace('{{ TELEGRAM_USERNAME }}', options.TELEGRAM_USERNAME)
		    content = content.replace('{{ AUDIENCE }}', options.AUDIENCE)
		    content = content.replace('{{ TITLE }}', options.TITLE)
		    content = content.replace('{{ TITLE }}', options.TITLE)
		    callback(null, content)
		} else {
		    callback(err)
		}
	    })
	})
	app.set('views', path.join(__dirname, 'views')) // specify the views directory
	app.set('view engine', 'tml')
    }    
}
