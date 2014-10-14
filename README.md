# node-debug-switcher

[![NPM version][npm-image]][npm-link]
[![Build Status][build-image]][build-link]
[![Coverage Status][coverage-image]][coverage-link]
[![dependency Status][dep-image]][dep-link]
[![devDependency Status][dev-dep-image]][dev-dep-link]

Switch NODE_DEBUG per request.

## Usage

### Express 4.0

```javascript
var express = require('express');
var cookieParser = require('cookie-parser');
var switcher = require('node-debug-switcher').cookies.koa;

app = express();
app.use(cookieParser());
app.use(switcher('cookie_name'));
```

### Koa

```javascript
var koa = require('koa');
var switcher = require('node-debug-switcher').cookies.koa;

app = koa();
app.use(switcher('cookie_name'));
```

## Options

### Secure

Encrypt the cookie value.

```javascript
switcher = require('node-debug-switcher').cookies.koa
switcher('cookie', secure: true, password: 'foo')
```

Execute `node-debug-switcher <string_to_encrypt> <password>` to get the encrypted value.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new [Pull Request](../../pull/new/master)

## Copyright

Copyright (c) 2014 Daisuke Taniwaki. See [LICENSE](LICENSE) for details.


[npm-image]: https://badge.fury.io/js/node-debug-switcher.svg
[npm-link]: http://badge.fury.io/js/node-debug-switcher
[build-image]: https://secure.travis-ci.org/dtaniwaki/node-debug-switcher.svg
[build-link]:  http://travis-ci.org/dtaniwaki/node-debug-switcher
[coverage-image]: https://img.shields.io/coveralls/dtaniwaki/node-debug-switcher.svg
[coverage-link]: https://coveralls.io/r/dtaniwaki/node-debug-switcher
[dep-image]: https://david-dm.org/dtaniwaki/node-debug-switcher/status.svg
[dep-link]: https://david-dm.org/dtaniwaki/node-debug-switcher#info=dependencies
[dev-dep-image]: https://david-dm.org/dtaniwaki/node-debug-switcher/dev-status.svg
[dev-dep-link]: https://david-dm.org/dtaniwaki/node-debug-switcher#info=devDependencies
