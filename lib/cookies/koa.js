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
  return function*(next) {
    var debug, err, newDebug;
    debug = process.env.NODE_DEBUG;
    newDebug = this.cookies.get(key);
    if (secure) {
      newDebug = utils.decode64Cipher(newDebug, password);
    }
    if (newDebug) {
      process.env.NODE_DEBUG = newDebug;
    }
    try {
      (yield next);
    } catch (_error) {
      err = _error;
      process.env.NODE_DEBUG = debug;
      this["throw"](err);
    }
    return process.env.NODE_DEBUG = debug;
  };
};

//# sourceMappingURL=../cookies/koa.js.map