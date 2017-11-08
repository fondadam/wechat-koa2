"use strict"

const util = require('util')
const request = util.promisify(require('request'));
const path = require('path')
const fs = require('fs')

const log = require('../utils/log')

// 上传图文消息素材【订阅号与服务号认证后均可用】(注意跟[新增永久图文素材]不同，这个可以发小程序)
const uploadMaterialNews = async function (data) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.uploadMaterialNews, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const mediaId = result['media_id']
			if(mediaId) {
				log.info(`上传图文消息素材成功: ${JSON.stringify(result)}`)
			} else {
				log.error(`上传图文消息素材失败: ${JSON.stringify(result)}`)
			}
			resolve(result)
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 根据标签或者openID进行群发【订阅号与服务号认证后均可用】
const massSendAll = async function (data) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.massSendAll, this.apiDomain, accessToken)
	const massUploadVideo = util.format(this.apiURL.massUploadVideo, this.apiDomain, accessToken)
	const massUploadVideoData = {
		"media_id": data.mpvideo['media_id'],
		"title": data.title,
		"description": data.description
	}
	if(data.msgtype === 'video') {
		return new Promise((resolve, reject) => {
			this.post(massUploadVideo, {json: true, body: massUploadVideoData}).then(async (res) => {
				const response = JSON.parse(res.body)
				const mediaId = response['media_id']
				let result = ''
				
				if (mediaId) {
					data.mpvideo['media_id'] = mediaId
					result = await this.post(url, {json: true, body: data}).then((res) => {
						const result = JSON.parse(res.body)
						const code = result['errcode']
						
						if (+code === 0) {
							log.info('群发消息成功!')
						} else {
							log.warn(`群发消息失败: ${JSON.stringify(result)}`)
						}
						resolve(result)
					}).catch(err => {
						log.error(err)
						reject(err)
					})
				} else {
					log.warn(`视频上传失败: ${JSON.stringify(response)}`)
				}
				
				resolve(result)
			}).catch(err => {
				log.error(err)
				reject(err)
			})
		})
	} else {
		return new Promise((resolve, reject) => {
			this.post(url, {json: true, body: data}).then((res) => {
				const result = JSON.parse(res.body)
				const code = result['errcode']
				
				if (+code === 0) {
					log.info('群发消息成功!')
				} else {
					log.warn(`群发消息失败: ${JSON.stringify(result)}`)
				}
				resolve(result)
			}).catch(err => {
				log.error(err)
				reject(err)
			})
		})
	}
}

// 删除群发
const delMassSend = async function (data) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.delMassSend, this.apiDomain, accessToken)
	
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

// 预览接口【订阅号与服务号认证后均可用】
const massPreview = async function (data) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.massPreview, this.apiDomain, accessToken)
	
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

//查询群发消息发送状态【订阅号与服务号认证后均可用】
const getMassStatus = async function (msg_id) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.getMassStatus, this.apiDomain, accessToken)
	const data = {msg_id}
	
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

module.exports = {
	uploadMaterialNews,
	massSendAll,
	delMassSend,
	getMassStatus,
	massPreview
}
