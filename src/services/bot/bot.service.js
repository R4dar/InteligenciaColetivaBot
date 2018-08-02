// Initializes the `bot` service on path `/bot`
const createService = require('./bot.class.js');
const hooks = require('./bot.hooks');
const logger = require('winston')
const onStart = require('./bot.commands.start')
const onFaq = require('./bot.commands.faq')
const onWhatIsIndex = require('./bot.commands.faq.index')
const onHowToSignup = require('./bot.commands.faq.signup')
const onHowtToSignin = require('./bot.commands.faq.signin')
const onServicos = require('./bot.commands.servicos')
const onIdDotOrg = require('./bot.commands.id.org')
const onLogincidadaoRS = require('./bot.commands.logincidadao.rs')
const onSimIdDotOrg = require('./bot.commands.sim.id.org')
const onNaoIdDotOrg = require('./bot.commands.nao.id.org')
const onLocalizacao = require('./bot.commands.servicos.localizacao')
const onContato = require('./bot.commands.servicos.contato')


module.exports = function (app) {
    const config = app.get('authentication')

    let options = {
	onText: {
	    '/start': onStart,
	    '/FAQ': onFaq,
//	    'o que é o index?': onWhatIsIndex,
//	    'como registrar?': onHowToSignup,
//	    'como realizar o login ?': onHowtToSignin,
//	    '/servicos': onServicos,
//	    '/servicos@id.org': onIdDotOrg,
//	    "/servicos@id.org:proceder": onSimIdDotOrg,
//	    "/servicos@id.org:malograr": onNaoIdDotOrg,
//	    '/servicos@logincidadao.rs': onLogincidadaoRS,
//	    '/servicos@localizacao': onLocalizacao,
//	    '/servicos@contato': onContato,
	}
    }
    
    let docs =  app.get('swagger/bot')
    app.use('/bot', Object.assign(createService(options), {
	docs: docs
    }))

    // Get our initialized service so that we can register hooks
    const service = app.service('bot');
    service.hooks(hooks);
};
