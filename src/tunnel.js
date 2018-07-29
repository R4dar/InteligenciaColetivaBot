const sh = require('child_process').spawn;
const path = require('path')

module.exports = function(options){
    return new Promise(function(resolve, reject){
        let bin = path.join(__dirname, '..', 'node_modules', 'localtunnel', 'bin', 'client')
	let localtunnel = sh(bin, [
	    ' --port',
	    options.port,
	    '--subdomain',
	    options.subdomain
	])
	
	localtunnel.stderr.on('data', function(data) {
            reject(data)
	})
	localtunnel.stdout.on('data', function(data) {
            resolve(data)
	})
    })
}
