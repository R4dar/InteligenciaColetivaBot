function reconfigure(app){
    return new Promise(function(resolve, reject){
	let mongo_url = app.get('mongodb')
	const newString = mongo_url.replace(/\${([^}]+)}/g, function(match, path) {
	    try{
		return process.env[path]
	    } catch(err){
		reject(err)
	    }
	})
	resolve(newString)
    })
}

module.exports = async function(app){
    await reconfigure(app)
}    
