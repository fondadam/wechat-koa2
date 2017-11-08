"use strict"

const crypto = require('crypto')
const xmlParser = require('xml2js')
const parseString = xmlParser.parseString
const buildXML = new xmlParser.Builder({
	rootName: 'xml',
	cdata: true,
	headless: true,
	renderOpts: {
		indent: ' ',
		pretty: 'true'
	}
})

const { parseXmlToJSON } = require('../utils/tools')
const log = require('../utils/log')

const KCS7Encoder = (text_length) => {
	const block_size = 32
	// 计算需要填充的位数
	let amount_to_pad = block_size - (text_length % block_size)
	if (amount_to_pad === 0) {
		amount_to_pad = block_size
	}
	// 获得补位所用的字符
	const pad = String.fromCharCode(amount_to_pad)
	let s = []
	for (let i = 0; i < amount_to_pad; i++) {
		s.push(pad)
	}
	return s.join('')
}

/**
 * 构建微信消息加解密对象
 * @param {JSON} config 微信配置文件
 * @param {Request} request  Koa Request 对象
 */
class AESCrypto {
	constructor(config, request) {
		//设置加解密算法
		this.aesModel = 'aes-256-cbc'
		//设置 AESCrypto 对象属性 token
		this.token = config.token
		//设置 AESCrypto 对象属性 appID
		this.appID = config.appID
		//设置 AESCrypto 对象属性 encodingAESKey
		this.encodingAESKey = new Buffer(config.encodingAESKey + '=', 'base64')
		//设置 AESCrypto 对象属性 iv
		this.iv = this.encodingAESKey.slice(0, 16)
		//设置 AESCrypto 对象属性 msgSignature
		this.msgSignature = request.query.msg_signature
		//设置 AESCrypto 对象属性 timestamp
		this.timestamp = request.query.timestamp
		//设置 AESCrypto 对象属性 nonce
		this.nonce = request.query.nonce
	}
	// 解密
	decryptMsg(encryptMsg) {
		const tempSignature = this.getMsgSignature(encryptMsg)
		//判断消息是否来自微信服务器
		if (this.msgSignature !== tempSignature) {
			log.warn('msgSignature is not invalid')
		}
		//实例 AES 解密对象
		const deCipheriv = crypto.createDecipheriv(this.aesModel, this.encodingAESKey, this.iv)
		//设置自定填充数据为 false
		deCipheriv.setAutoPadding(false)
		//对密文解密对密文解密 并去除前 16 个随机字符串
		const deEncryptedMsg = Buffer.concat([deCipheriv.update(encryptMsg, 'base64'), deCipheriv.final()]).toString('utf8')
		//获取填充字符串的位置
		const pad = deEncryptedMsg.charCodeAt(deEncryptedMsg.length - 1)
		//对微信消息进行处理
		const deEncryptedMsgResult = deEncryptedMsg.slice(20, -pad).replace(/<\/xml>.*/, '</xml>')
		//将解密后的XML 转为 JSON 对象
		return parseXmlToJSON(deEncryptedMsgResult)
	}
	// 加密
	encryptMsg(xmlMsg) {
		//声明 16位的随机字符串
		const random = crypto.randomBytes(8).toString('hex')
		const text = new Buffer(xmlMsg)
		let buf = new Buffer(4);
		buf.writeUInt32BE(text.length);
		//进行PKCS7补位
		const pack = KCS7Encoder(20 + text.length + this.appID.length)
		//拼接要加密的字符串
		const content = random + buf.toString('binary') + text.toString('binary') + this.appID + pack
		//实例 AES 加密对象
		const cipheriv = crypto.createCipheriv(this.aesModel, this.encodingAESKey, this.iv)
		//设置自定填充数据为 false
		cipheriv.setAutoPadding(false)
		//对明文加密
		const encryptedMsg = Buffer.concat([cipheriv.update(content, 'binary'), cipheriv.final()]).toString('base64')
		//获取认证签名
		const msgSignature = this.getMsgSignature(encryptedMsg)
		//返回XML结果
		return buildXML.buildObject({
			Encrypt: encryptedMsg,
			MsgSignature: msgSignature,
			TimeStamp: this.timestamp,
			Nonce: this.nonce
		})
	}
	
	getMsgSignature(encryptedMsg) {
		//将token、timestamp、nonce、encryptedMsg 四个参数进行字典序排序，并拼接成一个字符串
		const tempStr = [this.token, this.timestamp, this.nonce, encryptedMsg].sort().join('')
		//创建加密类型
		const hashCode = crypto.createHash('sha1')
		//对传入的字符串进行加密
		const resultCode = hashCode.update(tempStr, 'utf8').digest('hex')
		//将 sha1 加密的签名字符串返回
		return resultCode
	}
}


// 消息解密
const aesDecoding = function(ctx) {
	const request = ctx.request
	const msgXml = request.body
	
	const aesCrypto = new AESCrypto(this.config, request)
	
	return new Promise((resolve, reject) => {
		parseString(msgXml, {explicitArray: false}, (err, result) => {
			if(err) {
				reject(err)
			} else {
				result = result.xml
				if (request.query.encrypt_type == 'aes') {
					result = aesCrypto.decryptMsg(result.Encrypt)
				}
				resolve(result)
			}
		})
	})
}

// 消息加密
const aesEncoding = function(msgXml) {
	const ctx = this.context
	if(!ctx) {
		log.error('请先获取context')
		return false
	}
	const request = ctx.request
	
	const aesCrypto = new AESCrypto(this.config, request)
	
	const result = aesCrypto.encryptMsg(msgXml)
	
	return result
}

module.exports = {
	// AES加密
	aesEncoding,
	// AES解密
	aesDecoding
}