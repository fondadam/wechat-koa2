"use strict"

const log4js = require('log4js')

const log4Config = require('../log4js.json')

log4js.configure(log4Config)

const LOG_FLAG = process.env.NODE_ENV

const logger = log4js.getLogger(LOG_FLAG)

const log = (name) => ((...args) => logger[name](...args))

module.exports = {
	trace: log('trace'),
	debug: log('debug'),
	info: log('info'),
	warn: log('warn'),
	error: log('error')
}
