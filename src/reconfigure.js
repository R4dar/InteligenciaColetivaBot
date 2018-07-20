function reconfigure(){
    return Promise.all(["default", "test", "production"].map(function(item){
	return new Promise(function(resolve, reject){
	    let file = path.join(`../config/${item}.json`)
	    fs.readFile(file, 'utf8', function(err, data){
		if(err) reject(err)
		const newString = data.split("\n").map(function(line){
		    line.replace(/\${([^}]+)}/g, function(match, path) {
			return process.env[path]
		    })
		    return line
		}).join("\n")
		fs.writeFile(file, newString, function(err){
		    if(err) reject(err)
		    resolve()
		})
	    })
	})
    }))
}

module.exports = async function(){
    await reconfigure()
}    
