/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);
const chalk = require('chalk')

process.on('unhandledRejection', (err) => {
    logger.error(err)
});

server.on('listening', () => {
    let host = app.get('host')
    let port = app.get('port')
    logger.info(`Feathers application started on http:\/\/${host}:${port}`)
    logger.warn('To enable Telegram login in this site, deploy with the environment variable AUDIENCE as the domain of bot and use localtunnel or deploy in another server (aws, umbler, etc)')
    logger.warn("example: setup a Reverse Proxy Nginx server (see /assistente.conf.example) and run `lt --port <PORT> --subdomain <SUBDOMAIN>")
})

