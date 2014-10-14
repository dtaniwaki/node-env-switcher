#!/usr/bin/env node

utils = require('../lib/utils.js')

console.log(utils.encode64Cipher(process.argv[2], process.argv[3]))
