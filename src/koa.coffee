utils = require './utils'
assert = require 'assert'

module.exports = (key, options) ->
  options ||= {}
  secure = options.secure
  password = options.password
  env = options.env || 'NODE_DEBUG'
  type = options.type

  assert type, 'type is required'
  assert password, 'password is required' if secure

  (next) ->
    debug = process.env[env]

    switch type
      when 'cookie'
        newDebug = @cookies.get key
      when 'query'
        newDebug = @query[key]

    if newDebug
      if secure
        newDebug = utils.decode64Cipher(newDebug, password)
      console.log "Set the env #{env}:", newDebug
      process.env[env] = newDebug

    try
      yield next
    finally
      if newDebug
        console.log "Restore the env #{env}:", debug
        process.env[env] = debug
