'use strict';

var crypto = require('crypto');

module.exports = {
  encode64Cipher: function encode64Cipher(s, password) {
    try {
      var cipher = crypto.createCipher('aes-256-cbc', password);
      cipher.update(s);
      return cipher.final('base64');
    } catch (e) {
      return '';
    }
  },
  decode64Cipher: function decode64Cipher(s, password) {
    try {
      var cipher = crypto.createDecipher('aes-256-cbc', password);
      cipher.update(s, 'base64');
      return cipher.final().toString();
    } catch (e) {
      return '';
    }
  }
};
//# sourceMappingURL=utils.js.map
