"use strict"

const bodyParser = require('koa-bodyparser')

exports.bodyParser = function(...args) {
  const len = args.length
  if(!len) {
    return bodyParser({
      enableTypes: ['text'],
      extendTypes: {
        text: ['text/xml']
      }
    })
  } else {
    return bodyParser(...args)
  }
}
