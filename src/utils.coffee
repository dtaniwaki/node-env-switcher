crypto = require 'crypto'

module.exports =
  encode64Cipher: (s, password) ->
    try
      cipher = crypto.createCipher('aes-256-cbc', password)
      cipher.update s
      cipher.final('base64')
    catch
      ''

  decode64Cipher: (s, password) ->
    try
      cipher = crypto.createDecipher('aes-256-cbc', password)
      cipher.update s, 'base64'
      cipher.final().toString()
    catch
      ''
