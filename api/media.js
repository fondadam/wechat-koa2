"use strict"

const util = require('util')
const path = require('path')
const fs = require('fs')

const log = require('../utils/log')

// 新增临时素材
const tempUploadMedia = async function (type, filepath) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.tempUploadMedia, this.apiDomain, accessToken, type)
	
	const form = {
		media: fs.createReadStream(filepath)
	}
	
	log.debug('正在上传...')
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, formData: form}).then((res) => {
			const result = res.body
			
			if (result && result.type) {
				log.info(`上传临时素材成功：${JSON.stringify(result, null, ' ')}`)
			} else {
				log.info(`上传临时素材失败：${JSON.stringify(result, null, ' ')}`)
			}
			resolve(result)
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 获取临时素材
const tempGetMedia = async function (media_id) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.tempGetMedia, this.apiDomain, accessToken, media_id)
	
	// request 默认编码是utf-8，当encoding设为null，body才为Buffer
	return new Promise((resolve, reject) => {
		this.get(url, {encoding: null}).then((res) => {
			const headers = res['headers']
			const result = {
				body: res['body'],
				...headers
			}
			resolve(result)
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 新增永久图文素材（图文消息留言管理接口）
const addMaterialNews = async function (data) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.addMaterialNews, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const mediaId = result['media_id']
			if(mediaId) {
				log.info(`上传永久图文消息成功: ${JSON.stringify(result)}`)
			} else {
				log.error(`上传永久图文消息失败: ${JSON.stringify(result)}`)
			}
			resolve(result)
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 上传图文消息内的图片获取URL
const uploadReturnImageUrl = async function (filepath) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.uploadReturnImageUrl, this.apiDomain, accessToken)
	
	const form = {
		media: fs.createReadStream(filepath)
	}
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, formData: form}).then((res) => {
			const result = res.body
			
			if (result && result.url) {
				log.info(`上传图文消息内的图片获取URL成功, url: ${JSON.stringify(result.url, null, ' ')}`)
			} else {
				log.info(`上传图片失败：${JSON.stringify(result, null, ' ')}`)
			}
			resolve(result.url)
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 新增其他类型永久素材
const uploadMaterial = async function (type, filepath, description = {}) {
	const accessToken = await this.getAccessToken()
	
	let url = util.format(this.apiURL.uploadMaterial, this.apiDomain, accessToken, type)
	const form = {
		media: fs.createReadStream(filepath)
	}
	
	if(type === 'video') {
		if(!description.title || !description.introduction) {
			log.warn('如果上传的是video类型，需要添加description字段，否则将显示默认的值!')
			description.title = description.title || 'title'
			description.introduction = description.introduction || 'introduction'
		}
		form['description'] = JSON.stringify(description)
	}
	
	log.info('正在上传...')
	return new Promise((resolve, reject) => {
		this.post(url, {json:true, formData: form}).then((res) => {
			const result = res.body
			const mediaId = result['media_id']
			
			if(!mediaId) {
				log.error(`上传永久素材失败: ${JSON.stringify(result)}`)
			} else {
				log.info(`上传永久素材成功: ${mediaId}`)
			}
			
			resolve(result)
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 获取永久素材
const getMaterial = async function (media_id) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.getMaterial, this.apiDomain, accessToken)
	
	const data = {media_id}
	
	return new Promise((resolve, reject) => {
		this.post(url, {encoding:null, body: JSON.stringify(data)}).then((res) => {
			const headers = res['headers']
			const result = {
				body: res['body'],
				...headers
			}
			resolve(result)
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 删除永久素材
const delMaterial = async function (media_id) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.delMaterial, this.apiDomain, accessToken)
	
	const data = {media_id}
	
	return new Promise((resolve) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result['errcode']
			
			if (+code === 0) {
				log.info(`删除永久素材成功`)
			} else {
				log.warn(`删除永久素材失败: ${JSON.stringify(result)}`)
			}
			resolve(result)
		}).catch(err => {
			log.error(err)
		})
	})
}

// 修改永久图文素材
const updateMaterialNews = async function (data) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.updateMaterialNews, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result['errcode']
			if(+code === 0) {
				log.info(`更新永久图文消息成功: ${JSON.stringify(result)}`)
			} else {
				log.error(`更新永久图文消息失败: ${JSON.stringify(result)}`)
			}
			resolve(result)
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 获取素材总数
const getMaterialCount = async function () {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.getMaterialCount, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.get(url).then((res) => {
			const result = res.body
			log.debug(result)
			resolve(result)
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 获取素材列表
const getMaterialList = async function (data) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.getMaterialList, this.apiDomain, accessToken)
	
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
	tempUploadMedia,
	tempGetMedia,
	
	addMaterialNews,
	uploadReturnImageUrl,
	uploadMaterial,
	getMaterial,
	delMaterial,
	updateMaterialNews,
	getMaterialCount,
	getMaterialList
}