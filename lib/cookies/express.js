var assert, utils;

utils = require('../utils');

assert = require('assert');

module.exports = function(key, options) {
  var password, secure;
  options || (options = {});
  secure = options.secure;
  password = options.password;
  if (secure) {
    assert(password, 'password is required');
  }
  return function(req, res, next) {
    var debug, err, newDebug, _ref;
    debug = process.env.NODE_DEBUG;
    newDebug = (_ref = req.cookies) != null ? _ref[key] : void 0;
    if (secure) {
      newDebug = utils.decode64Cipher(newDebug, password);
    }
    if (newDebug) {
      process.env.NODE_DEBUG = newDebug;
    }
    try {
      next();
    } catch (_error) {
      err = _error;
      process.env.NODE_DEBUG = debug;
      throw err;
    }
    return process.env.NODE_DEBUG = debug;
  };
};

//# sourceMappingURL=../cookies/express.js.map