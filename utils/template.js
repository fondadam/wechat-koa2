/**
 * 回复文本消息
 * @param toUser  接收用户
 * @param fromUser  发送用户
 * @param content  发送消息
 * @returns {string}
 */
const textMsg = ({toUser, fromUser, content}) => (
  `
		<xml>
      <ToUserName><![CDATA[${toUser}]]></ToUserName>
      <FromUserName><![CDATA[${fromUser}]]></FromUserName>
      <CreateTime>${new Date().getTime()}</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[${content}]]></Content>
    </xml>
	`
)

/**
 * 回复图片消息（需要MediaId）
 * @param {String} toUser 接收用户
 * @param {String} fromUser 发送用户
 * @returns {string}
 */
const imageMsg = ({toUser, fromUser, media_id}) => (
  `
    <xml>
    	<ToUserName><![CDATA[${toUser}]]></ToUserName>
			<FromUserName><![CDATA[${fromUser}]]></FromUserName>
			<CreateTime>${new Date().getTime()}</CreateTime>
			<MsgType><![CDATA[image]]></MsgType>
			<Image>
				<MediaId><![CDATA[${media_id}]]></MediaId>
			</Image>
		</xml>
  `
)

/**
 * 回复语音消息（需要MediaId）
 * @param {String} toUser 接收用户
 * @param {String} fromUser 发送用户
 * @returns {string}
 */
const voiceMsg = ({toUser, fromUser, media_id}) => (
	`
		<xml>
			<ToUserName><![CDATA[${toUser}]]></ToUserName>
			<FromUserName><![CDATA[${fromUser}]]></FromUserName>
			<CreateTime>${new Date().getTime()}</CreateTime>
			<MsgType><![CDATA[voice]]></MsgType>
			<Voice>
				<MediaId><![CDATA[${media_id}]]></MediaId>
			</Voice>
		</xml>
	`
)

/**
 * 回复视频消息（需要MediaId）
 * @param {String} toUser 接收用户
 * @param {String} fromUser 发送用户
 * @returns {string}
 */
const videoMsg = ({toUser, fromUser, media_id, title, description}) => (
	`
		<xml>
			<ToUserName><![CDATA[${toUser}]]></ToUserName>
			<FromUserName><![CDATA[${fromUser}]]></FromUserName>
			<CreateTime>${new Date().getTime()}</CreateTime>
			<MsgType><![CDATA[video]]></MsgType>
			<Video>
				<MediaId><![CDATA[${media_id}]]></MediaId>
				<Title><![CDATA[${title}]]></Title>
				<Description><![CDATA[${description}]]></Description>
			</Video> 
		</xml>
	`
)
/**
 * 回复音乐消息 （需要MediaId）
 * @param {String} toUser 接收用户
 * @param {String} fromUser 发送用户
 * @returns {string}
 */
const musicMsg = ({toUser, fromUser, title, description, music_url, hq_music_url, media_id}) => (
	`
		<xml>
			<ToUserName><![CDATA[${toUser}]]></ToUserName>
			<FromUserName><![CDATA[${fromUser}]]></FromUserName>
			<CreateTime>${new Date().getTime()}</CreateTime>
			<MsgType><![CDATA[music]]></MsgType>
			<Music>
				<Title><![CDATA[${title}]]></Title>
				<Description><![CDATA[${description}]]></Description>
				<MusicUrl><![CDATA[${music_url}]]></MusicUrl>
				<HQMusicUrl><![CDATA[${hq_music_url}]]></HQMusicUrl>
				<ThumbMediaId><![CDATA[${media_id}]]></ThumbMediaId>
			</Music>
		</xml>
	`
)

/**
 * 回复图文消息
 * @param {String} toUser 接收用户
 * @param {String} fromUser 发送用户
 * @param {Array}  contentArr 图文信息集合
 * @returns {string}
 */
const newsMsg = ({toUser, fromUser, contentArr}) => {
  const renderDom = () => (
    contentArr.map((item, index) => (
      `<item>
            <Title><![CDATA[${item.title}]]></Title>
            <Description><![CDATA[${item.description}]]></Description>
            <PicUrl><![CDATA[${item.picUrl}]]></PicUrl>
            <Url><![CDATA[${item.url}]]></Url>
        </item>`
    ))
  )
  const xmlContent = `
      <xml>
        <ToUserName><![CDATA[${toUser}]]></ToUserName>
        <FromUserName><![CDATA[${fromUser}]]></FromUserName>
        <CreateTime>${new Date().getTime()}</CreateTime>
        <MsgType><![CDATA[news]]></MsgType>
        <ArticleCount>${contentArr.length}</ArticleCount>
        <Articles>${renderDom()}</Articles>
      </xml>
    `
  return xmlContent
}

module.exports = {
  textMsg,
  imageMsg,
	voiceMsg,
  videoMsg,
  musicMsg,
  newsMsg
}
