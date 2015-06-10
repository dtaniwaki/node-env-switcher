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
  return function(req, res, next) {
    var debug, newDebug, ref, ref1;
    debug = process.env[env];
    switch (type) {
      case 'cookie':
        newDebug = (ref = req.cookies) != null ? ref[key] : void 0;
        break;
      case 'query':
        newDebug = (ref1 = req.query) != null ? ref1[key] : void 0;
    }
    if (newDebug) {
      if (secure) {
        newDebug = utils.decode64Cipher(newDebug, password);
      }
      console.log("Set the env " + env + ":", newDebug);
      process.env[env] = newDebug;
    }
    try {
      return next();
    } finally {
      if (newDebug) {
        console.log("Restore the env " + env + ":", debug);
        process.env[env] = debug;
      }
    }
  };
};

//# sourceMappingURL=express.js.map