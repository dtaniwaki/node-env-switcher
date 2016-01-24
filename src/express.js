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

  return function (req, res, next) {
    let debug = process.env[env]
    let newDebug

    switch (type) {
      case 'cookie':
        newDebug = req.cookies && req.cookies[key]
        break
      case 'query':
        newDebug = req.query && req.query[key]
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
      next()
    } finally {
      if (newDebug) {
        console.log(`Restore the env ${env}: ${debug}`)
        process.env[env] = debug
      }
    }
  }
}
