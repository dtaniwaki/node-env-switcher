var assert, utils;

utils = require('./utils');

assert = require('assert');

module.exports = function(key, options) {
  var env, password, secure, type;
  options || (options = {});
  secure = options.secure;
  password = options.password;
  env = options.env || 'NODE_DEBUG';
  type = options.type;
  assert(type, 'type is required');
  if (secure) {
    assert(password, 'password is required');
  }
  return function*(next) {
    var debug, err, newDebug;
    debug = process.env[env];
    switch (type) {
      case 'cookie':
        newDebug = this.cookies.get(key);
        break;
      case 'query':
        newDebug = this.query[key];
    }
    if (newDebug) {
      if (secure) {
        newDebug = utils.decode64Cipher(newDebug, password);
      }
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

//# sourceMappingURL=koa.js.map