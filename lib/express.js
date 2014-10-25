var assert, utils;

utils = require('./utils');

assert = require('assert');

module.exports = function(key, options) {
  var env, password, secure, type;
  options || (options = {});
  secure = options.secure;
  password = options.password;
  env = options.env || 'NODE_DEBUG';
  type = options.type || 'cookie';
  if (secure) {
    assert(password, 'password is required');
  }
  return function(req, res, next) {
    var debug, err, newDebug, _ref, _ref1;
    debug = process.env[env];
    switch (type) {
      case 'cookie':
        newDebug = (_ref = req.cookies) != null ? _ref[key] : void 0;
        break;
      case 'query':
        newDebug = (_ref1 = req.query) != null ? _ref1[key] : void 0;
    }
    if (newDebug) {
      if (secure) {
        newDebug = utils.decode64Cipher(newDebug, password);
      }
      process.env[env] = newDebug;
    }
    try {
      next();
    } catch (_error) {
      err = _error;
      process.env[env] = debug;
      throw err;
    }
    return process.env[env] = debug;
  };
};

//# sourceMappingURL=express.js.map