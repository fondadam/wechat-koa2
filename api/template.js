"use strict"

const util = require('util')
const log = require('../utils/log')

// 设置所属行业
const setIndustry = async function ({industry_id1, industry_id2}) {
	const accessToken = await this.getAccessToken()
	const url = util.format(this.apiURL.setIndustry, this.apiDomain, accessToken)
	const data = {industry_id1, industry_id2}
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result.errcode
			
			if (+code === 0) {
				log.info(`设置所属行业成功: ${JSON.stringify(result)}`)
				resolve(true)
			} else {
				log.warn(`设置所属行业失败:  ${JSON.stringify(result)}`)
				resolve(false)
			}
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 获取设置的行业信息
const getIndustry = async function () {
	const accessToken = await this.getAccessToken()
	const url = util.format(this.apiURL.getIndustry, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.get(url).then((res => {
			const result = res.body
			log.debug(result)
			resolve(result)
		})).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 获取模板列表
const getTemplateList = async function () {
	const accessToken = await this.getAccessToken()
	const url = util.format(this.apiURL.getTemplateList, this.apiDomain, accessToken)
	
	return new Promise((resolve) => {
		this.get(url).then((res => {
			const result = res.body
			resolve(result)
		})).catch(err => log.error(err))
	})
}

// 删除模板
const delTemplate = async function (template_id) {
	const accessToken = await this.getAccessToken()
	const url = util.format(this.apiURL.delTemplate, this.apiDomain, accessToken)
	const data = {template_id}
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result.errcode
			
			if (+code === 0) {
				log.info(`删除模板成功  模板ID: ${template_id}`)
				resolve(true)
			} else {
				log.warn(`删除模板失败:  ${template_id}`)
				resolve(false)
			}
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

// 发送模板消息
const sendTemplate = async function (data) {
	const accessToken = await this.getAccessToken()
	const url = util.format(this.apiURL.sendTemplate, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result.errcode
			if (+code === 0) {
				resolve(true)
			} else {
				resolve(false)
			}
		}).catch(err => {
			log.error(err)
			reject(err)
		})
	})
}

module.exports = {
	setIndustry,
	getIndustry,
	getTemplateList,
	delTemplate,
	sendTemplate
}
