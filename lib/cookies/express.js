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
  return function(req, res, next) {
    var debug, err, newDebug, _ref;
    debug = process.env[env];
    newDebug = (_ref = req.cookies) != null ? _ref[key] : void 0;
    if (secure) {
      newDebug = utils.decode64Cipher(newDebug, password);
    }
    if (newDebug) {
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

//# sourceMappingURL=../cookies/express.js.map