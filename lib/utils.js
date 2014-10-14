var crypto;

crypto = require('crypto');

module.exports = {
  encode64Cipher: function(s, password) {
    var cipher;
    try {
      cipher = crypto.createCipher('aes-256-cbc', password);
      cipher.update(s);
      return cipher.final('base64');
    } catch (_error) {
      return '';
    }
  },
  decode64Cipher: function(s, password) {
    var cipher;
    try {
      cipher = crypto.createDecipher('aes-256-cbc', password);
      cipher.update(s, 'base64');
      return cipher.final().toString();
    } catch (_error) {
      return '';
    }
  }
};

//# sourceMappingURL=utils.js.map