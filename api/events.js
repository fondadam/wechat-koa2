"use strict"

const msgType = require('../utils/enum').msgType

// 监听 文本消息：text
const onText = function(cb) {
  this.on(msgType.TEXT, cb)
}

// 监听 图片消息：image
const onImage = function(cb) {
  this.on(msgType.IMAGE, cb)
}

// 监听 语音消息：voice
const onVoice = function(cb) {
  this.on(msgType.VOICE, cb)
}

// 监听 视频消息：video
const onVideo = function(cb) {
  this.on(msgType.VIDEO, cb)
}

// 监听 小视频消息：shortvideo
const onShortVideo = function(cb) {
  this.on(msgType.SHORTVIDEO, cb)
}

// 监听 地理位置消息：location
const onLocation = function(cb) {
  this.on(msgType.LOCATION, cb)
}

// 监听 链接消息：link
const onLink = function(cb) {
  this.on(msgType.LINK, cb)
}

// 监听 文件消息：file
const onFile = function(cb) {
	this.on(msgType.FILE, cb)
}

// 监听 二维码被扫描事件：scan
const onScan = function(cb) {
	this.on(msgType.SCAN, cb)
}

// 若开启了图灵机器人的消息，会监听监听该消息
const onTuling = function(cb) {
	this.on(msgType.TULING, cb)
}

// 监听 自定义菜单点击事件 click
const onClick = function(cb) {
	this.on(msgType.CLICK, cb)
}

// 监听订阅事件 subscribe
const onSubscribe = function(cb) {
	this.on(msgType.SUBSCRIBE, cb)
}

// 监听取消订阅事件 unsubscribe
const onUnSubscribe = function(cb) {
	this.on(msgType.UNSUBSCRIBE, cb)
}

// 监听模板消息发送后返回的事件推送
const onTemplateFinish = function(cb) {
	this.on(msgType.TEMPLATESENDJOBFINISH, cb)
}

module.exports = {
	onText,
	onImage,
	onVoice,
	onVideo,
	onShortVideo,
	onLocation,
	onLink,
	onFile,
	onScan,
	
	onTuling,
  
	onClick,
	onSubscribe,
	onUnSubscribe,
	onTemplateFinish
}