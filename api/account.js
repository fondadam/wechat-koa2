"use strict"

const util = require('util')
const log = require('../utils/log')

// 生成带参数的二维码
const createQRCode = async function (data) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.createQRCode, this.apiDomain, accessToken)
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then(async (res) => {
			const data = res.body
			const ticket = data.ticket
			const imageUrl = util.format(this.apiURL.getQRCodeImage, encodeURI(ticket))
			
			// 根据ticket获取二维码图片
			log.debug('根据ticket获取二维码图片')
			const response = await this.get(imageUrl, {encoding: null})
			const headers = response['headers']
			const result = {
				body: response['body'],
				...headers
			}
			
			resolve(result)
		}).catch(err => reject(err))
	})
}


// 长链接转短链接接口
const getShortUrl = async function(longUrl) {
	const accessToken = await this.getAccessToken()
	
	const url = util.format(this.apiURL.getShortUrl, this.apiDomain, accessToken)
	
	const data = {
		action: 'long2short',
		long_url: longUrl
	}
	
	return new Promise((resolve, reject) => {
		this.post(url, {json: true, body: data}).then((res) => {
			const result = res.body
			const code = result.errcode
			const shortUrl = result.short_url
			
			if(+code === 0) {
				log.info(`短连接转换成功，short_url: ${shortUrl}`)
			} else {
				log.error(`短连接转换失败: ${JSON.stringify(result)}`)
			}
			resolve(result)
		}).catch(err => reject(err))
	})
}

module.exports = {
	createQRCode,
	getShortUrl
}