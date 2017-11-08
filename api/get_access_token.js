"use strict"

const util = require('util')
const fs = require('fs')
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

const log = require('../utils/log')

let accessTokenJson = ''

exports.getAccessToken = function() {
	const TOKEN_PATH = this.accessTokenFilePath
	const hasFile = fs.existsSync(TOKEN_PATH)
	
  return new Promise(async (resolve, reject) => {
	  if(!hasFile) {
	  	log.error(`未找到 ${TOKEN_PATH} 文件，请创建 !`)
		  resolve()
		  return
	  }
	
	  accessTokenJson = accessTokenJson || await readFileAsync(TOKEN_PATH, 'utf8')
	  const url = util.format(this.apiURL.accessTokenApi, this.apiDomain, this.appID, this.appSecret)
	  const currentTime = (new Date()).getTime()
	  let tokenFileInfo = {}
	  
	  if(accessTokenJson) {
		  tokenFileInfo = JSON.parse(accessTokenJson)
	  }
	
    //判断 本地存储的 access_token 是否有效
    if (tokenFileInfo.access_token && tokenFileInfo.expires_time > currentTime) {
	    resolve(tokenFileInfo.access_token)
    } else {
      this.get(url).then((res) => {
        const result = JSON.parse(res.body)
	      
	      if (!result['errcode']) {
          tokenFileInfo.access_token = result.access_token
          tokenFileInfo.expires_time = (new Date()).getTime() + ((parseInt(result.expires_in) - 200) * 1000)
		      
		      accessTokenJson = JSON.stringify(tokenFileInfo)
		      writeFileAsync(TOKEN_PATH, accessTokenJson).then(() => {
			      log.info(`access_token 获取成功, 存储在 ${TOKEN_PATH} 中...`)
		      })
          resolve(result.access_token)
        } else {
		      log.error(`access_token 获取失败: ${JSON.stringify(result)}`)
		      resolve(result)
        }
      }).catch((err) => (reject(err)))
    }
  })
}
