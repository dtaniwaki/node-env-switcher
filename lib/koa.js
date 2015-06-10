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
    var debug, newDebug;
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
      console.log("Set the env " + env + ":", newDebug);
      process.env[env] = newDebug;
    }
    try {
      return (yield next);
    } finally {
      console.log("Restore the env " + env + ":", debug);
      process.env[env] = debug;
    }
  };
};

//# sourceMappingURL=koa.js.map