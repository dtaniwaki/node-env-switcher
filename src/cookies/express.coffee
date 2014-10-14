utils = require '../utils'
assert = require 'assert'

module.exports = (key, options) ->
  options ||= {}
  secure = options.secure
  password = options.password

  assert password, 'password is required' if secure

  (req, res, next) ->
    debug = process.env.NODE_DEBUG

    newDebug = req.cookies?[key]
    if secure
      newDebug = utils.decode64Cipher(newDebug, password)
    process.env.NODE_DEBUG = newDebug if newDebug

    try
      next()
    catch err
      process.env.NODE_DEBUG = debug
      throw err
    process.env.NODE_DEBUG = debug
