const onStart = require('./bot/onStart')
const onFaq = require('./bot/onFaq')
const onServicos = require('./bot/onServicos')
const onIdDotOrg = require('./bot/onIdDotOrg')
const onLogincidadaoRS = require('./bot/onLogincidadaoRS')
const onSimIdDotOrg = require('./bot/onSimIdDotOrg')
const onNaoIdDotOrg = require('./bot/onNaoIdDotOrg')
const onWhatIsIndex = require('./bot/onWhatIsIndex')
const onHowToSignup = require('./bot/onHowToSignup')
const onHowtToSignin = require('./bot/onHowToSignin')
const onHowToVerify = require('./bot/onHowToVerify')

module.exports = function (app) {
    return {
	onText: {
	    '/start': onStart,
	    '/FAQ': onFaq,
	    '/serviços': onServicos(app),
	    '/serviços:id.org': onIdDotOrg(app),
	    '/serviços:logincidadao.rs': onLogincidadaoRS(app),
	    "sim, eu quero encaminhar com minhas credenciais do id.org": onSimIdDotOrg(app),
	    "não, eu quero malograr com as credenciais do id.org": onNaoIdDotOrg(app),
	    'o que é o index?': onWhatIsIndex,
	    'como registrar?': onHowToSignup,
	    'como realizar o login ?': onHowtToSignin,
	    'como verificar minha conta ?': onHowToVerify
	}
    }
}
