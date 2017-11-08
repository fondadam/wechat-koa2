"use strict"

const crypto = require('crypto')
const util = require('util')

const log = require('../utils/log')

/**
 * 微信服务器认证接口
 * @param ctx         koa2 context
 */
exports.serverVerify = function (ctx) {
	const query = ctx.request.query

	// 1. 获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
	const signature = query.signature
	const timestamp = query.timestamp
	const nonce = query.nonce
	const echostr = query.echostr

	// 2. 将token、timestamp、nonce三个参数进行字典序排序
	const array = [this.token, timestamp, nonce]
	array.sort()

	// 3. 将三个参数字符串拼接成一个字符串进行sha1加密
	const strReadyForSha1 = array.join('')
	const hashCode = crypto.createHash('sha1')
	const resultCode = hashCode.update(strReadyForSha1, 'utf8').digest('hex')

	// 4. 开发者获得加密后的字符串可与signature对比，若相同则说明该请求来源于微信，原样返回echostr
	if (resultCode === signature) {
		log.info(`签名一致，微信服务器校验成功!`)
		ctx.body = echostr
	} else {
		log.error(`签名不一致，请重新检查后再次认证。`)
		ctx.body = `签名不一致，请重新检查后再次认证。`
	}
}