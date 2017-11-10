"use strict"

const util = require('util')
const request = util.promisify(require('request'))
const EventEmitter = require('events')
const _config = require('../config')

class API extends EventEmitter {
	constructor(options) {
		super()
		const config = Object.assign({}, _config, options)
		
		this.config = config
		this.appID = config.appID
		this.appSecret = config.appSecret
		this.token = config.token
		this.encodingAESKey = config.encodingAESKey
		this.apiDomain = config.apiDomain
		this.apiURL = config.apiURL
		
		this.accessTokenFilePath = config.accessTokenFilePath
		this.tulingApiKey = config.tulingApiKey
		this.tulingActive = config.tulingActive
		
		this.context = null
		
	}
	get(url, options = {}) {
		options = Object.assign({}, options, {url})
		
		return request(options)
	}
	
	post(url, options = {}) {
		options = Object.assign({}, options, {method: "POST", url})
		
		return request(options)
	}
}

API.mixin = (obj) => {
	for (var key in obj) {
		if (API.prototype.hasOwnProperty(key)) {
			throw new Error("Don\'t allow override existed prototype method. method: " + key)
		} else {
			API.prototype[key] = obj[key]
		}
	}
}

module.exports = API
