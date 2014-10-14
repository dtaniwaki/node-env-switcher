utils = require '../utils'
assert = require 'assert'

module.exports = (key, options) ->
  options ||= {}
  secure = options.secure
  password = options.password

  assert password, 'password is required' if secure

  (next) ->
    debug = process.env.NODE_DEBUG

    newDebug = @cookies.get key
    if secure
      newDebug = utils.decode64Cipher(newDebug, password)
    process.env.NODE_DEBUG = newDebug if newDebug

    try
      yield next
    catch err
      process.env.NODE_DEBUG = debug
      @throw err
    process.env.NODE_DEBUG = debug
