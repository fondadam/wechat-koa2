"use strict"

const msgType = require('../utils/enum').msgType
const log = require('../utils/log')

exports.listening = function (ctx) {
	this.context = ctx
	
	return new Promise((resolve, reject) => {
		this.aesDecoding(ctx).then(data => {
			const type = data.MsgType
			const eventType = data.Event
			
			switch (type.toLowerCase()) {
				// 接受普通消息
				case 'text':
					this.getUserInfo(data.FromUserName).then(result => {
						const k = result['nickname']
						const v = data['Content']
						log.info(`${k} : ${v}`)
					})
					this.emit(msgType.TEXT, data)
					break;
				case 'image':
					this.getUserInfo(data.FromUserName).then(result => {
						const k = result['nickname']
						const v = data['Content']
						log.info(`${k} : [image]: 图片临时地址为: ${data['PicUrl']}`)
					})
					this.emit(msgType.IMAGE, data);
					break;
				case 'voice':
					this.getUserInfo(data.FromUserName).then(result => {
						const k = result['nickname']
						const v = data['Content']
						log.info(`${k} : [voice]: 语音临时MediaId为: ${data['MediaId']}`)
					})
					this.emit(msgType.VOICE, data);
					break;
				case 'video':
					this.getUserInfo(data.FromUserName).then(result => {
						const k = result['nickname']
						const v = data['Content']
						log.info(`${k} : [video]：视频临时MediaId为：${data['MediaId']}`)
					})
					this.emit(msgType.VIDEO, data);
					break;
				case 'shortvideo':
					this.getUserInfo(data.FromUserName).then(result => {
						const k = result['nickname']
						const v = data['Content']
						log.info(`${k} : [shortvideo]`)
					})
					this.emit(msgType.SHORTVIDEO, data);
					break;
				case 'location':
					this.getUserInfo(data.FromUserName).then(result => {
						const k = result['nickname']
						const v = data['Content']
						log.info(`${k} : [location]： ${data['Label']}`)
					})
					this.emit(msgType.LOCATION, data);
					break;
				case 'link':
					this.getUserInfo(data.FromUserName).then(result => {
						const k = result['nickname']
						const v = data['Content']
						log.info(`${k} : [link]`)
					})
					this.emit(msgType.LINK, data);
					break;
				case 'file':
					this.getUserInfo(data.FromUserName).then(result => {
						const k = result['nickname']
						const v = data['Content']
						log.info(`${k} : [file] 发送了一个文件`)
					})
					this.emit(msgType.FILE, data);
					break;
				// 接受事件推送 MsgType: event, Event: click
				case 'event': {
					if (!eventType) {
						break;
					}
					this.getUserInfo(data.FromUserName).then(result => {
						const k = result['nickname']
						const v = data['Content']
						log.info(`${k} : [event] 事件：${eventType}`)
					})
					switch (eventType.toLowerCase()) {
						// 菜单点击事件
						case 'click':
							this.emit(msgType.CLICK, data)
							break;
						// 关注
						case 'subscribe':
							this.emit(msgType.SUBSCRIBE, data)
							break;
						// 取关
						case 'unsubscribe':
							this.emit(msgType.UNSUBSCRIBE, data)
							break;
						// 获取用户坐标
						case 'location':
							this.emit(msgType.LOCATION, data)
							break;
						case 'scan':
							this.emit(msgType.SCAN, data)
							break;
						// 模板消息发送后的事件推送
						case 'templatesendjobfinish': {
							const status = data['Status']
							if(status === 'success') {
								log.info('发送模板消息成功 ~')
							} else if (status === 'failed:user block') {
								log.warn('用户拒绝接受模板消息')
							} else if(status === 'failed: system failed') {
								log.error('模板消息发送失败')
							}
							this.emit(msgType.TEMPLATESENDJOBFINISH, data)
							break;
						}
						default:
							break;
					}
					break;
				}
				default:
					break;
			}
			resolve(data)
		}).catch(error => {
			log.error('ERROR: ', error)
			reject(error)
		})
	})
}