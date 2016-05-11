# testrun  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Build Status][appveyor-image]][appveyor-url]

A module to support a test.

## Install

Install with [npm](https://www.npmjs.com/)

```
$ npm install testrun --save-dev
```

## Usage

### 1. Create test cases.

```js
(sample.js)
const testrun = require('testrun').mocha;

function testfn(testcase) {  // `testcase` is a property of the 3rd argument of `testrun` 
  if (typeof testcase.in === 'string') {
    return testcase.in;
  } else {
    throw new TypeError();
  }
}

testrun('test name', testfn, [
  {
    name: 'test case group',
    cases: [  // `cases` is the keyword for specifying test case group.
      {
        name: 'test for input : ${testcase.in} => ${testcase.expected}',
        in: 'aaa',
        expected: 'aaa',   // `expected` is the keyword for specifying expected value.
      },
      {
        name: 'test for in:${testcase.in} => ${testcase.error}',
        in: ['a', 'b', 'c'],
        error: TypeError,  // `error` is the keyword for specifying expected error.
      },
    ],
  },
]);
```

### 2. Run the test cases.

```
$ mocha sample.js

   test case group
     ✓ test for in: 'aaa' => 'aaa'
     ✓ test for in:[ 'a', 'b', 'c' ] => TypeError

   0 passing (16ms)

```

## Supporting test framework

- [mocha](http://mochajs.org/)

   ```js
   const testrun = require('testrun').mocha;
   ```

- [lab](https://github.com/hapijs/lab)

   ```js
   const testrun = require('testrun').lab(exports);
   ```

   ***NOTICE:*** *If using lab on node version 0.10 or 0.12, you have to use lab version 6.2.*


## APIs

### testrun(testname, testfn, testcases)

runs the specified test function for each test cases.

##### Arguments:

* **testcase** [string] : test name.
* **testfn** [function] : test function. (the argument is a testcase).
* **testcases** [Array] : test cases.

### testrun.byPlatform(valuesByPlatforms) => any

returns a value for the current platform.

##### Arguments:

* **valuesByPlatforms** : [plain-object | any] : values by platforms.

##### Example:

```js
testrun.byPlatform({win32: 123, otherwise: 999 });
// => 123  (on Windows)
// => 999  (on other platform)

testrun.byPlatform('abc');
// => 'abc'
```

## License

Copyright (C) 2016 Takayuki Sato

This program is free software under [MIT](https://opensource.org/licenses/MIT) License.
See the file LICENSE in this distribution for more details.


[npm-image]: http://img.shields.io/badge/npm-v0.1.0-blue.svg
[npm-url]: https://www.npmjs.org/package/testrun
[travis-image]: https://travis-ci.org/sttk/testrun.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/testrun
[appveyor-image]: https://ci.appveyor.com/api/projects/status/github/sttk/testrun?branch=master&svg=true
[appveyor-url]: https://ci.appveyor.com/project/sttk/testrun
