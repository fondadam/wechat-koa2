"use strict"

const util = require('util')
const log = require('../utils/log')

// 创建自定义菜单
const createMenu = async function (config) {
	if(!config) {
		log.error('缺少自定义菜单配置文件')
		return this
	}
	const accessToken = await this.getAccessToken()
	const url = util.format(this.apiURL.createMenu, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.post(url, {body: config, json: true}).then((res) => {
			const result = res.body
			
			const code = result['errcode']
			
			if (+code === 0) {
				log.info('创建自定义菜单成功!')
			} else {
				log.warn('创建自定义菜单失败:', result)
			}
			resolve(result)
		}).catch(err => reject(err))
	})
}

// 查询自定义菜单
const getMenu = async function () {
	log.info('正在查询自定义菜单...')
	
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.getMenu, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.get(url).then((res) => {
			const result = res.body
			log.debug(result)
			resolve(result)
		}).catch(err => reject(err))
	})
}

// 删除所有自定义菜单
const deleteMenu = async function() {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.deleteMenu, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.get(url).then((res) => {
			const result = res.body
			
			const code = JSON.parse(result)['errcode']
			
			if (+code === 0) {
				log.info('删除自定义菜单成功')
			} else {
				log.warn('删除自定义菜单失败:', result)
			}
			resolve(result)
		}).catch(err => reject(err))
	})
}

// 获取自定义菜单配置 （这里跟自定义菜单查询接口有些不同)
const getMenuConfig = async function () {
	log.info('正在获取自定义菜单配置...')
	
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.getMenuConfig, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.get(url).then((res) => {
			const result = res.body
			log.debug(result)
			resolve(result)
		}).catch(err => reject(err))
	})
}

// 创建个性化菜单接口
const createSpecialMenu = async function (config) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.createSpecialMenu, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: config}).then((res) => {
			const result = res.body
			const menuid = result['menuid']
			
			if (menuid) {
				log.info(`创建个性化菜单成功, menuid: ${menuid}`)
			} else {
				log.warn(`创建个性化菜单失败: ${result}`)
			}
			resolve(result)
		}).catch(err => reject(err))
	})
}

// 删除个性化菜单
const deleteSpecialMenu = async function (menuid) {
	if(!menuid) {
		log.error('缺少个性化菜单的menuid')
		return this
	}
	const accessToken = await this.getAccessToken()
	const url = util.format(this.apiURL.deleteSpecialMenu, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: {menuid}}).then((res) => {
			const result = res.body
			const code = result['errcode']
			
			if (+code === 0) {
				log.info('删除个性化菜单成功')
			} else {
				log.warn('删除个性化菜单失败:', result)
			}
			resolve(result)
		}).catch(err => reject(err))
	})
}

module.exports = {
	createMenu,
	getMenu,
	deleteMenu,
	getMenuConfig,
	
	createSpecialMenu,
	deleteSpecialMenu
}