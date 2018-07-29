/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);
const chalk = require('chalk')
const tunnel = require('./tunnel')
<<<<<<< HEAD


=======
>>>>>>> e328ea87d70416dc8b797eeb4bac15e6fe7952b5
process.on('unhandledRejection', (err) => {
    let stack = err.stack.split("\n")
    err.message.split("\n").map(item => {
        logger.debug(chalk.red(item))
    })
    logger.debug(err.message)
});

server.on('listening', () => {
    let host = app.get('host')
    let port = app.get('port')
    logger.info(`Feathers application started on http:\/\/${host}:${port}`)
<<<<<<< HEAD
    logger.warn('To enable Telegram login in this site, deploy with the environment variable AUDIENCE as the domain of bot')
    logger.warn("use localtunnel or deploy in another server (aws, umbler, etc)")
    logger.warn("example: `lt --port <PORT> --subdomain <SUBDOMAIN>")
=======
    
    // Setup nginx (or other) reverse proxy to main port 
    if (process.env.NODE_ENV === 'development') {
	tunnel({ port: 80, subdomain: 'r4dar'}).then(function(t){
	    logger.debug('Tunnel running at  '+t.url)
	    logger.debug('Check telegram bot domain in settings>domain and set this tunnel')
	})
    }
>>>>>>> e328ea87d70416dc8b797eeb4bac15e6fe7952b5
})

