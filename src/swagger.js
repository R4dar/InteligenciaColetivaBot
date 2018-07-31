// swagger(app, 'users', {find: {security:['local', 'jwt']}})
module.exports = function(app, name, opt) {
    
    let doc = {
	"description": name.toUpperCase()+" service",
	"definitions": {}
    }
    doc[(name+" list")] = {
	"$ref": "#/definitions/"+name
    }

    Object.keys(opt).map(item => {
	doc[item] = {}
	if(item.security) {
	    doc[item].security = item.security.map(jtem => {
		let o = {}
		o[jtem] = []
		return o
	    })
	}
	if (item !== 'create') {
	    doc[item].parameters = [
		{
		    "in": "path",
		    "name": "_id",
		    "type": "string",
		    "description": "the id of a user"
		}
	    ]
	} else {
	    doc[item] = {}
	}
    })
    app.set('swagger/'+name, doc)

}
