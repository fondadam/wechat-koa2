const config = require('./config')

const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')
const router = new Router()

const Wechat = require('wechat-koa2')

const w = new Wechat(config)

// 封装过后的koa-bodyparser
app.use(w.bodyParser())

// 微信服务器校验
router.get('/', async(ctx) => {
	w.serverVerify(ctx)
})

// 监听用户发送过来的消息
router.post('/', async (ctx) => {
	await w.listening(ctx)
})

// 是否开启图灵机器人 eg:http://localhost:8080/setTulingActive?password=123&active=1
// router.get('/setTulingActive', async (ctx) => {
// 	const password = ctx.request.query.password
// 	const active = ctx.request.query.active
//
// 	if(password === '123') {
// 		w.setTulingActive(~~active)
// 		ctx.body = `图灵机器人设置为 ${~~active ? '【开启】' : '【关闭】'}`
// 	} else {
// 		ctx.body = '图灵机器人设置失败! 可能是密码错误 ~'
// 	}
// })

// 注册监听
// w.onText((data) => {...})
// w.onImage((data) => {...})
// w.onVideo((data) => {...})
// 若设置了图灵监听，则需要自己设置回复操作
// w.onTuling((data, tulingResult) => {})

app.use(router.routes()).use(router.allowedMethods())

console.log('START: ', `wechat server is listening at ${config.port} ...`)

app.listen(config.port)
