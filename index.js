"use strict"

const WeChat = require('./api')

// 日志
WeChat.log = require('./utils/log')

// 封装bodyParser for wechat
WeChat.mixin(require('./api/body_parser'))

// 消息AES加解密
WeChat.mixin(require('./api/aes_crypto'))

// 微信服务器token校验
WeChat.mixin(require('./api/server_verify'))

// 获取access_token并保存在当前项目的一个文件中
WeChat.mixin(require('./api/get_access_token'))

// 自定义菜单管理接口
WeChat.mixin(require('./api/menu'))

// 消息监听 事件
WeChat.mixin(require('./api/events'))

// 消息监听 emit触发
WeChat.mixin(require('./api/listening'))

// 消息发送
WeChat.mixin(require('./api/reply'))

// 素材管理
WeChat.mixin(require('./api/media'))

// 客服消息
WeChat.mixin(require('./api/customer_services'))

// 模板消息
WeChat.mixin(require('./api/template'))

// 群发消息
WeChat.mixin(require('./api/mass_send'))

// 用户管理
WeChat.mixin(require('./api/user'))

// 账号管理
WeChat.mixin(require('./api/account'))

// 图灵机器人
WeChat.mixin(require('./api/tuling'))

module.exports = WeChat
