'use strict';

var utils = require('./utils');
var assert = require('assert');

module.exports = function (key, options) {
  var _ref = options || {};

  var secure = _ref.secure;
  var password = _ref.password;
  var env = _ref.env;
  var type = _ref.type;

  env = env || 'NODE_DEBUG';
  type = type || 'cookie';

  assert(type, 'type is required');
  if (secure) {
    assert(password, 'password is required');
  }

  return function (req, res, next) {
    var debug = process.env[env];
    var newDebug = undefined;

    switch (type) {
      case 'cookie':
        newDebug = req.cookies && req.cookies[key];
        break;
      case 'query':
        newDebug = req.query && req.query[key];
        break;
    }

    if (newDebug) {
      if (secure) {
        newDebug = utils.decode64Cipher(newDebug, password);
      }
      console.log('Set the env ' + env + ': ' + newDebug);
      process.env[env] = newDebug;
    }

    try {
      next();
    } finally {
      if (newDebug) {
        console.log('Restore the env ' + env + ': ' + debug);
        process.env[env] = debug;
      }
    }
  };
};
//# sourceMappingURL=express.js.map
