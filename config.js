module.exports = {
	"port": '8080',
	"token": "xxxx",
	"appID": "xxxx",
	"appSecret": "xxxx",
	"encodingAESKey": "xxxx",
	"apiDomain": "https://api.weixin.qq.com/",
	"accessTokenFilePath": "./static/access_token.json",
	// 图灵ApiKey
	"tulingApiKey": "65f46644fcc945eeb0c3ef55bf75b799",
	// 是否开启图灵机器人：1为开启，0为关闭
	"tulingActive": 0,
	// 管理员的openid todo
	"administrator": [],
	
	"apiURL": {
		// 图灵api
		"tuling": "http://www.tuling123.com/openapi/api",
		
		"accessTokenApi": "%scgi-bin/token?grant_type=client_credential&appid=%s&secret=%s",
		// 个性化菜单
		"createSpecialMenu": "%scgi-bin/menu/addconditional?access_token=%s",
		"deleteSpecialMenu": "%scgi-bin/menu/delconditional?access_token=%s",
		
		// 普通自定义菜单
		"createMenu": "%scgi-bin/menu/create?access_token=%s",
		"getMenu": "%scgi-bin/menu/get?access_token=%s",
		"getMenuConfig": "%scgi-bin/get_current_selfmenu_info?access_token=%s",
		"deleteMenu": "%scgi-bin/menu/delete?access_token=%s",
		
		// 添加客服账号
		"addCustomer": "%scustomservice/kfaccount/add?access_token=%s",
		// 邀请绑定客服账号
		"toBindCustomer": "%scustomservice/kfaccount/inviteworker?access_token=%s",
		// 获取所有客服账号信息
		"getAllCustomer": "%scgi-bin/customservice/getkflist?access_token=%s",
		// 获取当前在线的客服信息
		"getAllOnlineCustomer": "%scgi-bin/customservice/getonlinekflist?access_token=%s",
		// 获取客服聊天记录
		"getChatHistory": "%scustomservice/msgrecord/getmsglist?access_token=%s",
		// 修改客服账号
		"updateCustomer": "%scustomservice/kfaccount/update?access_token=%s",
		// 删除客服账号
		"delCustomer": "%scustomservice/kfaccount/del?access_token=%s",
		// 发送客服消息
		"customerSend": "%scgi-bin/message/custom/send?access_token=%s",
		
		// 设置所属行业
		"setIndustry": "%scgi-bin/template/api_set_industry?access_token=%s",
		// 获取行业设置信息
		"getIndustry": "%scgi-bin/template/get_industry?access_token=%s",
		// 获取模板ID
		"getTemplateList": "%scgi-bin/template/get_all_private_template?access_token=%s",
		// 删除模板
		"delTemplate": "%scgi-bin/template/del_private_template?access_token=%s",
		// 发送模板消息
		"sendTemplate": "%scgi-bin/message/template/send?access_token=%s",
		
		// 新增临时素材
		"tempUploadMedia": "%scgi-bin/media/upload?access_token=%s&type=%s",
		// 获取临时素材
		"tempGetMedia": "%scgi-bin/media/get?access_token=%s&media_id=%s",
		// 新增永久图文素材 （图文消息留言管理接口）
		"addMaterialNews": "%scgi-bin/material/add_news?access_token=%s",
		// 上传图文消息内的图片获取URL
		"uploadReturnImageUrl": "%scgi-bin/media/uploadimg?access_token=%s",
		// 新增其他类型永久素材
		"uploadMaterial": "%scgi-bin/material/add_material?access_token=%s&type=%s",
		// 获取永久素材
		"getMaterial": "%scgi-bin/material/get_material?access_token=%s",
		// 删除永久素材
		"delMaterial": "%scgi-bin/material/del_material?access_token=%s",
		// 修改永久图文素材
		"updateMaterialNews": "%scgi-bin/material/update_news?access_token=%s",
		// 获取素材总数
		"getMaterialCount": "%scgi-bin/material/get_materialcount?access_token=%s",
		// 获取素材列表
		"getMaterialList": "%scgi-bin/material/batchget_material?access_token=%s",
		
		// 用户管理
		"getUserInfo": "%scgi-bin/user/info?access_token=%s&openid=%s",
		// 用户标签管理（创建标签）
		"createTag": "%scgi-bin/tags/create?access_token=%s",
		// 获取公众号已创建的标签
		"getTagsList": "%scgi-bin/tags/get?access_token=%s",
		// 编辑标签
		"updateTag": "%scgi-bin/tags/update?access_token=%s",
		// 删除标签
		"delTag": "%scgi-bin/tags/delete?access_token=%s",
		// 获取标签下粉丝列表
		"getTagUserList": "%scgi-bin/user/tag/get?access_token=%s",
		// 批量为用户打标签
		"batchTagUser": "%scgi-bin/tags/members/batchtagging?access_token=%s",
		// 批量为用户取消标签
		"batchUntagUser": "%scgi-bin/tags/members/batchuntagging?access_token=%s",
		// 获取用户身上的标签列表
		"getUserTagList": "%scgi-bin/tags/getidlist?access_token=%s",
		
		// 上传图文消息素材【订阅号与服务号认证后均可用】 (注意跟[新增永久图文素材]不同，这个可以发小程序)
		"uploadMaterialNews": "%scgi-bin/media/uploadnews?access_token=%s",
		// 当群发视频的时候需要先将media_id post到这个接口，再使用返回的media_id来群发
		"massUploadVideo": "%scgi-bin/media/uploadvideo?access_token=%s",
		// 根据标签或者openID进行群发【订阅号与服务号认证后均可用】
		"massSendAll": "%scgi-bin/message/mass/sendall?access_token=%s",
		// 删除群发【订阅号与服务号认证后均可用】
		"delMassSend": "%scgi-bin/message/mass/delete?access_token=%s",
		// 预览接口【订阅号与服务号认证后均可用】
		"massPreview": "%scgi-bin/message/mass/preview?access_token=%s",
		// 查询群发消息发送状态【订阅号与服务号认证后均可用】
		"getMassStatus": "%scgi-bin/message/mass/get?access_token=%s",
		
		// 设置用户备注名
		"updateRemark": "%scgi-bin/user/info/updateremark?access_token=%s",
		// 获取用户基本信息（包括UnionID机制）
		"getUserInfo": "%scgi-bin/user/info?access_token=%s&openid=%s&lang=zh_CN",
		// 批量获取用户基本信息
		"batchGetUserInfoList": "%scgi-bin/user/info/batchget?access_token=%s",
		// 获取用户列表
		"getFollowUserList": "%scgi-bin/user/get?access_token=%s&next_openid=%s",
		
		// 生成带参数的二维码
		"createQRCode": "%scgi-bin/qrcode/create?access_token=%s",
		// 根据返回的ticket请求二维码图片  这里的api接口有变化！！
		"getQRCodeImage": "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=%s",
		
		// 长链接转短链接接口
		"getShortUrl": "%scgi-bin/shorturl?access_token=%s"
	}
}