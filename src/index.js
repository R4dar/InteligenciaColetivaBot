/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);
const chalk = require('chalk')

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
})

