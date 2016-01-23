# node-env-switcher

[![NPM version][npm-image]][npm-link]
[![Build Status][build-image]][build-link]
[![Coverage Status][coverage-image]][coverage-link]
[![dependency Status][dep-image]][dep-link]
[![devDependency Status][dev-dep-image]][dev-dep-link]

Switch env per request.

## Usage

### Express 4.0

```javascript
var express = require('express');
var cookieParser = require('cookie-parser');
var switcher = require('node-env-switcher').express;

app = express();
app.use(cookieParser());
// Switch by cookie
app.use(switcher('name', type: 'cookie'));
// Switch by query
app.use(switcher('name', type: 'query'));
```

### Koa

```javascript
var koa = require('koa');
var switcher = require('node-env-switcher').koa;

app = koa();
// Switch by cookie
app.use(switcher('name', type: 'cookie'));
// Switch by query
app.use(switcher('name', type: 'query'));
```

## Options

### Secure

Encrypt the value.

```javascript
switcher = require('node-env-switcher').koa;
switcher('name', secure: true, password: 'foo', type: 'cookie');
```

Execute `node-env-switcher <string_to_encrypt> <password>` to get the encrypted value.

### Custom env

The default env to switch is `NODE_DEBUG`.

Switch env such as DEBUG for [debug](https://github.com/visionmedia/debug).

```javascript
switcher = require('node-env-switcher').koa;
switcher('name', env: 'DEBUG');
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new [Pull Request](../../pull/new/master)

## Copyright

Copyright (c) 2014 Daisuke Taniwaki. See [LICENSE](LICENSE) for details.


[npm-image]: https://badge.fury.io/js/node-env-switcher.svg
[npm-link]: http://badge.fury.io/js/node-env-switcher
[build-image]: https://secure.travis-ci.org/dtaniwaki/node-env-switcher.svg
[build-link]:  http://travis-ci.org/dtaniwaki/node-env-switcher
[coverage-image]: https://img.shields.io/coveralls/dtaniwaki/node-env-switcher.svg?branch=master
[coverage-link]: https://coveralls.io/r/dtaniwaki/node-env-switcher?branch=master
[dep-image]: https://david-dm.org/dtaniwaki/node-env-switcher/status.svg
[dep-link]: https://david-dm.org/dtaniwaki/node-env-switcher#info=dependencies
[dev-dep-image]: https://david-dm.org/dtaniwaki/node-env-switcher/dev-status.svg
[dev-dep-link]: https://david-dm.org/dtaniwaki/node-env-switcher#info=devDependencies
