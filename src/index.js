/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);


process.on('unhandledRejection', (err) => {
    let stack = err.stack.split("\n")
    for(let i in stack){
	logger.error(stack[i])
	process.exit(0)
    }
});

server.on('listening', () => {
    let host = app.get('host')
    let port = app.get('port')
    logger.info(`Feathers application started on http:\/\/${host}:${port}`)
})

