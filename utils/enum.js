// 监听事件的前缀
const PRE = 'Fonda__'

const msgType = {
  TEXT: PRE + 'text',
  IMAGE: PRE + 'image',
  VOICE: PRE + 'voice',
  VIDEO: PRE + 'video',
  SHORTVIDEO: PRE + 'shortvideo',
  LOCATION: PRE + 'location',
  LINK: PRE + 'link',
	FILE: PRE + 'file',
	
	TULING: PRE + 'tuling',
  
	CLICK: PRE + 'click',
	SCAN: PRE + 'scan',
	SUBSCRIBE: PRE + 'subscribe',
	UNSUBSCRIBE: PRE + 'unsubscribe',
	TEMPLATESENDJOBFINISH: PRE + 'templatesendjobfinish'
}

module.exports = {
  msgType
}