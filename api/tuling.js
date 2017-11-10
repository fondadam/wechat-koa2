"use strict"

const util = require('util')
const log = require('../utils/log')

const setTulingActive = function(active) {
	const key = this.tulingApiKey
	
	if(!key) {
		log.warn(`使用图灵机器人前，请填写你的图灵ApiKey`)
	} else {
		// 是否开启图灵机器人，1为开启，0为关闭
		this.tulingActive = ~~active
	}
	
	return this
}

const tulingReply = function(data) {
	let userText = ''
	const openid = data.FromUserName
	const type = data.MsgType.toLowerCase()
	
	const tulingApiKey = this.tulingApiKey
	const tulingUrl = this.apiURL.tuling
	
	if(type === 'text') {
		userText = data['Content']
	} else if(type === 'voice') {
		userText = data['Recognition']
	}
	
	const postData = {
		key: tulingApiKey,
		userid: openid,
		info: userText
	}
	
	return new Promise((resolve, reject) => {
		this.post(tulingUrl, {json:true, body: postData}).then((res) => {
			const tuLingResult= res.body
			const code = tuLingResult.code
			
			tuLingResult.userText = userText
			if(code !== 100000) {
				tuLingResult.text = tuLingResult.text + `\n\n<a href="${tuLingResult.url}">请点击这里查看</a>`
			}
			
			resolve(tuLingResult)
		}).catch(err => reject(err))
	})
}

module.exports = {
	setTulingActive,
	tulingReply
}