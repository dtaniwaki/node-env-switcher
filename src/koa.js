require('babel-polyfill')
const utils = require('./utils')
const assert = require('assert')

module.exports = function (key, options) {
  let { secure, password, env, type } = options || {}
  env = env || 'NODE_DEBUG'
  type = type || 'cookie'

  assert(type, 'type is required')
  if (secure) {
    assert(password, 'password is required')
  }

  return function * (next) {
    let debug = process.env[env]
    let newDebug

    switch (type) {
      case 'cookie':
        newDebug = this.cookies.get(key)
        break
      case 'query':
        newDebug = this.query[key]
        break
    }

    if (newDebug) {
      if (secure) {
        newDebug = utils.decode64Cipher(newDebug, password)
      }
      console.log(`Set the env ${env}: ${newDebug}`)
      process.env[env] = newDebug
    }

    try {
      yield next
    } catch (e) {
      this.throw(e)
    } finally {
      if (newDebug) {
        console.log(`Restore the env ${env}: ${debug}`)
        process.env[env] = debug
      }
    }
  }
}
