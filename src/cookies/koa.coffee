utils = require '../utils'

module.exports = (key, options) ->
  options ||= {}

  (next) ->
    debug = process.env.NODE_DEBUG

    newDebug = @cookies.get key
    if options.base64
      newDebug = utils.decodeBase64(newDebug)
    process.env.NODE_DEBUG = newDebug if newDebug

    try
      yield next
    catch err
      process.env.NODE_DEBUG = debug
      console.log err
      @throw err
    process.env.NODE_DEBUG = debug
