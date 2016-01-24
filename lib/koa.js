'use strict';

require('babel-polyfill');
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

  return regeneratorRuntime.mark(function _callee(next) {
    var debug, newDebug;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            debug = process.env[env];
            newDebug = undefined;
            _context.t0 = type;
            _context.next = _context.t0 === 'cookie' ? 5 : _context.t0 === 'query' ? 7 : 9;
            break;

          case 5:
            newDebug = this.cookies.get(key);
            return _context.abrupt('break', 9);

          case 7:
            newDebug = this.query[key];
            return _context.abrupt('break', 9);

          case 9:

            if (newDebug) {
              if (secure) {
                newDebug = utils.decode64Cipher(newDebug, password);
              }
              console.log('Set the env ' + env + ': ' + newDebug);
              process.env[env] = newDebug;
            }

            _context.prev = 10;
            _context.next = 13;
            return next;

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t1 = _context['catch'](10);

            this.throw(_context.t1);

          case 18:
            _context.prev = 18;

            if (newDebug) {
              console.log('Restore the env ' + env + ': ' + debug);
              process.env[env] = debug;
            }
            return _context.finish(18);

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[10, 15, 18, 21]]);
  });
};
//# sourceMappingURL=koa.js.map
