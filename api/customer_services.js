"use strict"

const util = require('util')
const tools = require('../utils/tools')
const log = require('../utils/log')

// 添加客服账号
const addCustomer = async function({kf_account, nickname, password}) {
	const accessToken = await this.getAccessToken()
	const url = util.format(this.apiURL.addCustomer, this.apiDomain, accessToken)
	const data = {kf_account, nickname, password}
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result.errcode
			if (+code === 0) {
				log.info('添加客服账号成功!')
			} else {
				log.warn(`添加客服账号失败:  ${JSON.stringify(result)}`)
			}
			resolve(result)
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 修改客服账号
const updateCustomer = async function({kf_account, nickname, password}) {
	const accessToken = await this.getAccessToken()
	const url = util.format(this.apiURL.updateCustomer, this.apiDomain, accessToken)
	const data = {kf_account, nickname, password}
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result.errcode
			if (+code === 0) {
				log.info('修改客服账号成功!')
			} else {
				log.warn(`修改客服账号失败:  ${JSON.stringify(result)}`)
			}
			resolve(result)
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 删除客服账号
const delCustomer = async function({kf_account, nickname, password}) {
	const accessToken = await this.getAccessToken()
	const url = util.format(this.apiURL.delCustomer, this.apiDomain, accessToken)
	const data = {kf_account, nickname, password}
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result.errcode
			if (+code === 0) {
				log.info('删除客服账号成功!')
			} else {
				log.warn(`删除客服账号失败:  ${JSON.stringify(result)}`)
			}
			resolve(result)
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 获取所有客服账号
const getAllCustomer = async function() {
	const accessToken = await this.getAccessToken()
	const url = util.format(this.apiURL.getAllCustomer, this.apiDomain, accessToken)
	
	return new Promise((resolve) => {
		this.get(url).then((res => {
			const result = res.body
			const kfList = JSON.parse(result)['kf_list']
			if(!kfList) {
				log.warn(result)
			}
			resolve(result)
		})).catch(err => log.error(err))
	})
}

// 获取所有当前在线的客服账号信息
const getAllOnlineCustomer = async function() {
	const accessToken = await this.getAccessToken()
	const url = util.format(this.apiURL.getAllOnlineCustomer, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.get(url).then((res) => {
			const result = res.body
			const len = JSON.parse(result)['kf_online_list'].length
			log.debug(`当前客服在线人数: ${len} 人`)
			resolve(result)
		}).catch(err => reject(err))
	})
}

// 邀请绑定客服账号
const toBindCustomer = async function ({kf_account, invite_wx}) {
	const accessToken = await this.getAccessToken()
	const url = util.format(this.apiURL.toBindCustomer, this.apiDomain, accessToken)
	const data = {kf_account,invite_wx}
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result.errcode
			
			if (+code === 0) {
				log.info(`已向微信号：${invite_wx} 发送绑定客服邀请!`)
			} else {
				log.warn(`客服邀请发送失败:  ${JSON.stringify(result)}`)
			}
			resolve(result)
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 获取客服聊天记录
const getChatHistory = async function ({starttime, endtime, msgid, number}) {
	const accessToken = await this.getAccessToken()
	const url = util.format(this.apiURL.getChatHistory, this.apiDomain, accessToken)
	const data = {starttime, endtime, msgid, number}
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			resolve(result)
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}


// 客服消息，发送文字消息
const sendText = async function (openid, text) {
	const accessToken = await this.getAccessToken()
	const url = util.format(this.apiURL.customerSend, this.apiDomain, accessToken)
	const data = {
		'touser': openid,
		'msgtype': 'text',
		'text': {
			'content': text
		}
	}
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result.errcode
			
			if (+code === 0) {
				log.info(`客服消息发送成功text: ${text}`)
				resolve(true)
			} else {
				log.warn(`客服邀请发送失败:  ${JSON.stringify(result)}`)
				resolve(false)
			}
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

const sendImage = async function (openid, mediaId) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.customerSend, this.apiDomain, accessToken)

	const data = {
		'touser': openid,
		'msgtype': 'image',
		'image': {
			'media_id': mediaId
		}
	}
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result.errcode
			
			if (+code === 0) {
				log.info(`客服消息发送成功image  mediaId: ${mediaId}`)
				resolve(true)
			} else {
				log.warn(`客服消息发送失败image:  ${JSON.stringify(result)}`)
				resolve(false)
			}
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

const sendVoice = async function (openid, mediaId) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.customerSend, this.apiDomain, accessToken)
	
	const data = {
		'touser': openid,
		'msgtype': 'voice',
		'voice': {
			'media_id': mediaId
		}
	}
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result.errcode
			
			if (+code === 0) {
				log.info(`客服消息发送成功voice  mediaId: ${mediaId}`)
				resolve(true)
			} else {
				log.warn(`客服消息发送失败voice:  ${JSON.stringify(result)}`)
				resolve(false)
			}
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

const sendVideo = async function (openid, mediaId, thumbMediaId, title = 'title', description = 'description') {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.customerSend, this.apiDomain, accessToken)
	
	const data = {
		'touser': openid,
		'msgtype': 'video',
		'video': {
			'media_id': mediaId,
			'thumb_media_id': thumbMediaId
		}
	}
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result.errcode
			
			if (+code === 0) {
				log.info(`客服消息发送成功video  mediaId: ${mediaId}`)
				resolve(true)
			} else {
				log.warn(`客服消息发送失败video:  ${JSON.stringify(result)}`)
				resolve(false)
			}
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// thumb_media_id 必填 其他可选
const sendMusic = async function (openid, thumb_media_id, {title, description, musicurl, hqmusicurl}) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.customerSend, this.apiDomain, accessToken)
	
	const data = {
		'touser': openid,
		'msgtype': 'music',
		'music': {
			"thumb_media_id": thumb_media_id,
			"title": title,
			"description": description,
			"musicurl": musicurl,
			"hqmusicurl": hqmusicurl
		}
	}
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result.errcode
			
			if (+code === 0) {
				log.info(`客服消息发送成功music  thumb_media_id: ${thumb_media_id}`)
				resolve(true)
			} else {
				log.warn(`客服消息发送失败music:  ${JSON.stringify(result)}`)
				resolve(false)
			}
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 发送图文消息  跳到外链
const sendNews = async function(openid, articles = []) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.customerSend, this.apiDomain, accessToken)
	
	const data = {
		"touser": openid,
		"msgtype": "news",
		"news": {
			"articles": articles
		}
	}
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result.errcode
			
			if (+code === 0) {
				log.info(`客服消息发送成功  图文消息: ${JSON.stringify(result)}`)
				resolve(true)
			} else {
				log.warn(`客服消息发送失败:  ${JSON.stringify(result)}`)
				resolve(false)
			}
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 发送图文，跳到微信内部素材 需要mediaId
const sendMpNews = async function(openid, mediaId) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.customerSend, this.apiDomain, accessToken)
	
	const data = {
		"touser": openid,
		"msgtype": "mpnews",
		"mpnews": {
			"media_id": mediaId
		}
	}
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result.errcode
			
			if (+code === 0) {
				log.info(`客服消息发送成功  mediaId: ${JSON.stringify(mediaId)}`)
				resolve(true)
			} else {
				log.warn(`客服消息发送失败:  ${JSON.stringify(result)}`)
				resolve(false)
			}
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}
	
module.exports = {
	addCustomer,
	toBindCustomer,
	updateCustomer,
	delCustomer,
	getChatHistory,
	getAllCustomer,
	getAllOnlineCustomer,
	
	sendText,
	sendImage,
	sendVoice,
	sendVideo,
	sendMusic,
	sendNews,
	sendMpNews
}

