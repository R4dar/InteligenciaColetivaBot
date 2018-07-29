/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);
const chalk = require('chalk')
const tunnel = require('./tunnel')


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
    logger.warn('To enable Telegram login in this site, deploy with the environment variable AUDIENCE as the domain of bot')
    logger.warn("use localtunnel or deploy in another server (aws, umbler, etc)")
    logger.warn("example: `lt --port <PORT> --subdomain <SUBDOMAIN>")
})

