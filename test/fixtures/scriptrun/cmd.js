#!/usr/bin/env node

const assert = require('assert');
const path = require('path');

assert.equal(process.argv.length, 4);
assert.equal(process.argv[1], __filename);
assert.equal(process.argv[2].indexOf(path.resolve(__dirname, 'testdir/test-')),
  0);
assert.equal(process.argv[3], 'aaa');

