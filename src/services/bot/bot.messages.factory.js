class Assistente {
    constructor (token, options) {
	this.options = options
	this.telegram_bot = new TelegramBot(token, {polling: true})
    }

    __readfile__(p) {
	return new Promise((resolve, reject) => {
	    let promises = []
	    fs.readFile(p,'utf8',(_err_,content) => {
		if(_err) reject(_err)
		resolve(content)
	    })
	})
    }

    async parse (name, data) {
	let p = path.join(this.options.root, name+'.json')
	let content = await this.__readfile__(p)
	Object.keys(data).map(item => {
	    let reg = new RegExp("{{ "+item+" }}")
	    content = content.replace(reg, data[item])
	})
	return content
    }
}

module.exports = MessagesFactory
