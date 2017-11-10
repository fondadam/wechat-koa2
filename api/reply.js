"use strict"

const wxTemplate = require('../utils/template')

// 文本消息：text
// {toUser, fromUser, content}
const replyText = function(data) {
  const ctx = this.context
	
	const query = ctx.request.query
	const shouldEncoding = query.encrypt_type === 'aes'
	
	ctx.body = shouldEncoding ? this.aesEncoding(wxTemplate.textMsg(data)) : wxTemplate.textMsg(data)
  return data
}

// 图片消息：image
// {toUser, fromUser, media_id}
const replyImage = function(data) {
  const ctx = this.context
	
	const query = ctx.request.query
	const shouldEncoding = query.encrypt_type === 'aes'
  ctx.body = shouldEncoding ? this.aesEncoding(wxTemplate.imageMsg(data)) : wxTemplate.imageMsg(data)
  return data
}

// 语音消息：voice
// {toUser, fromUser, media_id}
const replyVoice = function(data) {
	const ctx = this.context
	
	const query = ctx.request.query
	const shouldEncoding = query.encrypt_type === 'aes'
	
	ctx.body = shouldEncoding ? this.aesEncoding(wxTemplate.voiceMsg(data)) : wxTemplate.voiceMsg(data)
	return data
}

// 视频消息：video
// {toUser, fromUser, media_id, title, description}
const replyVideo = function(data) {
	const ctx = this.context
	
	const query = ctx.request.query
	const shouldEncoding = query.encrypt_type === 'aes'
	
	ctx.body = shouldEncoding ? this.aesEncoding(wxTemplate.videoMsg(data)) : wxTemplate.videoMsg(data)
	return data
}

// 音乐消息： music
// {toUser, fromUser, title, description, music_url, hq_music_url, media_id}
const replyMusic = function(data) {
	const ctx = this.context
	
	const query = ctx.request.query
	const shouldEncoding = query.encrypt_type === 'aes'
	
	ctx.body = shouldEncoding ? this.aesEncoding(wxTemplate.musicMsg(data)) : wxTemplate.musicMsg(data)
	return data
}

// 图文消息：news
// {toUser, fromUser, contentArr}
const replyNews = function(data) {
	const ctx = this.context
	
	const query = ctx.request.query
	const shouldEncoding = query.encrypt_type === 'aes'
	
	ctx.body = shouldEncoding ? this.aesEncoding(wxTemplate.newsMsg(data)) : wxTemplate.newsMsg(data)
	return data
}

module.exports = {
	replyText,
	replyImage,
	replyVoice,
	replyVideo,
	replyMusic,
	replyNews
}
