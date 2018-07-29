module.exports = function (msg, match){
    return new Promise(function(resolve){
	resolve({
	    messages: [
		{type: 'keyboard', value: [
		    "Clique no comando abaixo para fazê-lo.",
		    {
			"reply_markup": {
			    "keyboard": [["/login"]]
			}
		    }
		]}
	    ]
	})
    })
}
