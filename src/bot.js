const onStart = require('./bot/onStart')
const onFaq = require('./bot/onFaq')
const onIndex = require('./bot/onIndex')
const onLogin = require('./bot/onLogin')
const onWhatIsIndex = require('./bot/onWhatIsIndex')
const onHowToSignup = require('./bot/onHowToSignup')
const onHowtToSignin = require('./bot/onHowToSignin')
const onHowToVerify = require('./bot/onHowToVerify')

module.exports = function (app) {
    return {
	onText: {
	    '/start': onStart,
	    '/FAQ': onFaq,
	    '/index': onIndex(app),
	    '/login': onLogin(app),
	    'o que é o index?': onWhatIsIndex,
	    'como registrar?': onHowToSignup,
	    'como realizar o login ?': onHowtToSignin,
	    'como verificar minha conta ?': onHowToVerify
	}
    }
}
