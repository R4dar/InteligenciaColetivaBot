module.exports = function (msg, match){
    return new Promise(function(resolve){
	resolve({
	    messages: [
		{type: 'string', value: [
		    "O index é um espaço virtual de trabalho desta sala de bate papo. Você pode se registrar, logar como um site na web. Execute o comando abaixo para ir até o index",
		    {
			"reply_markup": {
			    "keyboard": [["/index"]]
			}
		    }
		]}
	    ]
	})
    })
}
