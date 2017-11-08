/**
 * 解析 XML 转为 JSON
 * @param  {String} xml xml格式的字符串
 * @return {JSON} 解析后的JSON对象
 */
const parseXmlToJSON = (xml) => {
  if (!xml || typeof xml != 'string') return {}
  let re = {}
  xml = xml.replace(/^<xml>|<\/xml>$/g, '')
  let ms = xml.match(/<([a-z0-9]+)>([\s\S]*?)<\/\1>/ig)
  
  if (ms && ms.length > 0) {
    ms.forEach(t => {
      let tMatch = t.match(/<([a-z0-9]+)>([\s\S]*?)<\/\1>/i)
      let tagName = tMatch[1]
      let cdata = tMatch[2] || ''
      cdata = cdata.replace(/^\s*<\!\[CDATA\[\s*|\s*\]\]>\s*$/g, '')
      re[tagName] = cdata
    })
  }
  return re
}

module.exports = {
  parseXmlToJSON
}