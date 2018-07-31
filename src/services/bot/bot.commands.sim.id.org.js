const logger = require('winston')

module.exports = async function (app, msg, match) {
    let idorg = Issuer.discover('https://id.org.br')
    let client = new idorg.Client({
	clientId: '10_15tdota1dbesko4g8wcggckokscwc4o0owgg00oc4wg8s4s4ow',
	clientSecret: '61astpx93d44wc484c8sgo8oss0g0o0cswgs0wgg8wocok0c00'
    })
    let url = client.authorizationUrl({redirect_url: 'https://r4dar.localtunnel.me/', scope: 'openid email'})
    return {
	messages: [
	    {type: 'string', value: 'Acesse '+url}
	]
    }
}
