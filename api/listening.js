"use strict"

const msgType = require('../utils/enum').msgType
const log = require('../utils/log')

exports.listening = function (ctx) {
	this.context = ctx
	
	return new Promise((resolve, reject) => {
		this.aesDecoding(ctx).then(async data => {
			const type = data.MsgType.toLowerCase()
			const eventType = data.Event
			const listenerCount = this.listenerCount(msgType[type.toUpperCase()])
			
			this.getUserInfo(data.FromUserName).then(userInfo => {
				const name = userInfo['nickname']
				switch (type) {
					case 'text':
						log.info(`${name}: ${data['Content']}`)
						break
					case 'image':
						log.info(`${name}: [image]: 图片临时地址为: ${data['PicUrl']}`)
						break
					case 'voice':
						log.info(`${name} : [voice]: 语音临时MediaId为: ${data['MediaId']}`)
						log.info(`${name} : [语音识别]: ${data['Recognition']}`)
						break
					case 'video', 'shortvideo':
						log.info(`${name} : [video]：视频临时MediaId为：${data['MediaId']}`)
						break
					case 'location':
						log.info(`${name} : [location]： ${data['Label']}`)
						break
					case 'event':
						log.info(`${name} : [event]事件： ${eventType}`)
						break
					default:
						log.info(`${name}: ${data['Content']}`)
						break
				}
			})
			
			// 是否开启图灵机器人
			const tulingActive = this.tulingActive
			
			if (tulingActive) {
				if (type === 'text' || type === 'voice') {
					const tulingResult = await this.tulingReply(data)
					const tulingListenerCount = this.listenerCount(msgType.TULING)
					
					if (tulingListenerCount === 0) {
						log.debug(`图灵机器人：${tulingResult.text}`)
						this.replyText({
							toUser: data.FromUserName,
							fromUser: data.ToUserName,
							content: tulingResult.text
						})
					} else {
						this.emit(msgType.TULING, data, tulingResult)
					}
					resolve(data)
					return this
				} else {
					log.info(`图灵机器人无法处理 ${type} 信息，将转给普通消息处理`)
				}
			}
			
			switch (type) {
				// 接受普通消息
				case 'text':
					this.emit(msgType.TEXT, data)
					break;
				case 'image':
					this.emit(msgType.IMAGE, data);
					break;
				case 'voice':
					this.emit(msgType.VOICE, data);
					break;
				case 'video':
					this.emit(msgType.VIDEO, data);
					break;
				case 'shortvideo':
					this.emit(msgType.SHORTVIDEO, data);
					break;
				case 'location':
					this.emit(msgType.LOCATION, data);
					break;
				case 'link':
					this.emit(msgType.LINK, data);
					break;
				case 'file':
					this.emit(msgType.FILE, data);
					break;
				// 接受事件推送 MsgType: event, Event: click
				case 'event': {
					if (!eventType) {
						break;
					}
					switch (eventType) {
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
							if (status === 'success') {
								log.info('发送模板消息成功 ~')
							} else if (status === 'failed:user block') {
								log.warn('用户拒绝接受模板消息')
							} else if (status === 'failed: system failed') {
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
			if (listenerCount === 0) {
				log.debug('当前没有设置任何监听函数...')
				ctx.body = ''
			}
			resolve(data)
		}).catch(error => {
			log.error('ERROR: ', error)
			reject(error)
		})
	})
}