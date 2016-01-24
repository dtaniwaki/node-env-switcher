'use strict'

const crypto = require('crypto')

module.exports = {
  encode64Cipher: function (s, password) {
    try {
      let cipher = crypto.createCipher('aes-256-cbc', password)
      cipher.update(s)
      return cipher.final('base64')
    } catch (e) {
      return ''
    }
  },
  decode64Cipher: function (s, password) {
    try {
      let cipher = crypto.createDecipher('aes-256-cbc', password)
      cipher.update(s, 'base64')
      return cipher.final().toString()
    } catch (e) {
      return ''
    }
  }
}
