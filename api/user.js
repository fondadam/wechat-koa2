"use strict"

const util = require('util')
const log = require('../utils/log')

// 获取用户基本信息（包括UnionID机制）
const getUserInfo = async function (openId, lang) {
	const accessToken = await this.getAccessToken()
	
	let url = util.format(this.apiURL.getUserInfo, this.apiDomain, accessToken, openId)
	if(lang) {
		url += `&lang=${lang}`
	}
	
	return new Promise((resolve, reject) => {
		this.get(url).then((res) => {
			const result = res.body
			resolve(JSON.parse(result))
		}).catch(err => reject(err))
	})
}

// 设置用户备注名
const updateRemark = async function(openId, remark) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.updateRemark, this.apiDomain, accessToken)
	const data = {
		openId,
		remark
	}
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = JSON.parse(result)['errcode']
			
			if(+code === 0) {
				log.info('设置用户备注名成功')
			} else {
				log.error(`设置用户备注名失败：${result}`)
			}
			resolve(result)
		}).catch(err => reject(err))
	})
}

// 创建用户标签
const createTag = async function(tag) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.createTag, this.apiDomain, accessToken)
	const data = {tag}
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const tag = result.tag
			if(tag) {
				log.info(`创建标签成功，tagId: ${tag.id}`)
			} else {
				log.error(`创建标签失败: ${JSON.stringify(result)}`)
			}
			resolve(result)
		}).catch(err => reject(err))
	})
}

// 获取公众号已创建的标签
const getTagsList = async function() {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.getTagsList, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.get(url).then((res) => {
			const result = res.body
			
			resolve(result)
		}).catch(err => reject(err))
	})
}
	
// 编辑标签
const updateTag = async function(tag) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.updateTag, this.apiDomain, accessToken)
	const data = {tag}
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result.errcode
			
			if(+code === 0) {
				log.info(`更新标签成功，tag: ${JSON.stringify(tag)}`)
			} else {
				log.error(`更新标签失败: ${JSON.stringify(result)}`)
			}
			resolve(result)
		}).catch(err => reject(err))
	})
}

// 删除标签
const delTag = async function(tag) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.delTag, this.apiDomain, accessToken)
	const data = {tag}
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result.errcode
			if(+code === 0) {
				log.info(`删除标签成功，tag: ${JSON.stringify(tag)}`)
			} else {
				log.error(`删除标签失败: ${JSON.stringify(result)}`)
			}
			resolve(result)
		}).catch(err => reject(err))
	})
}

// 获取标签下粉丝列表
const getTagUserList = async function(data) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.getTagUserList, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = JSON.parse(result)['errcode']
			if(code) {
				log.error(result)
			}
			resolve(result)
		}).catch(err => reject(err))
	})
}

// 批量为用户打标签
const batchTagUser = async function(data) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.batchTagUser, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = JSON.parse(result)['errcode']
			if(+code === 0) {
				log.info('批量为用户打标签成功')
			} else {
				log.error(`批量为用户打标签失败: ${result}`)
			}
			resolve(result)
		}).catch(err => reject(err))
	})
}

// 批量为用户取消标签
const batchUntagUser = async function(data) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.batchUntagUser, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = JSON.parse(result)['errcode']
			if(+code === 0) {
				log.info('批量为用户取消标签成功')
			} else {
				log.error(`批量为用户取消标签失败：${result}`)
			}
			resolve(result)
		}).catch(err => reject(err))
	})
}

// 获取用户身上的标签列表
const getUserTagList = async function(data) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.getUserTagList, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = JSON.parse(result)['errcode']
			if(code) {
				log.error(result)
			}
			resolve(result)
		}).catch(err => reject(err))
	})
}

module.exports = {
	getUserInfo,
	updateRemark,
	
	createTag,
	getTagsList,
	updateTag,
	delTag,
	
	getTagUserList,
	batchTagUser,
	batchUntagUser,
	getUserTagList
}