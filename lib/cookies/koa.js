var assert, utils;

utils = require('../utils');

assert = require('assert');

module.exports = function(key, options) {
  var env, password, secure;
  options || (options = {});
  secure = options.secure;
  password = options.password;
  env = options.env || 'NODE_DEBUG';
  if (secure) {
    assert(password, 'password is required');
  }
  return function*(next) {
    var debug, err, newDebug;
    debug = process.env[env];
    newDebug = this.cookies.get(key);
    if (secure) {
      newDebug = utils.decode64Cipher(newDebug, password);
    }
    if (newDebug) {
      process.env[env] = newDebug;
    }
    try {
      (yield next);
    } catch (_error) {
      err = _error;
      process.env[env] = debug;
      this["throw"](err);
    }
    return process.env[env] = debug;
  };
};

//# sourceMappingURL=../cookies/koa.js.map