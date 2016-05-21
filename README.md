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
      {
        name: 'sub test case group',
        cases: [ ... ],
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

### testrun(testname, testfn, testcases) => void

runs the specified test function for each test cases.

##### Arguments:

* **testname** [string] : a test name.
* **testfn** [function] : a test function. (see below.)
* **testcases** [array] : an array of test cases.

    #### *testfn* (testcase [, done]) => any

    is a function to execute a testcase. The argument *`testcase`* is each property in *`testcases`* passed to `testrun` function.

    ##### Arguments:

    * **testcase** [object] : a test case object.
    * **done** [function] : a callback to end.
        - If this argument is not specified, *`testfn`* is required to return a result or to throw an error.
        - If this argument is specified, *`testfn`* is required to evaluate a testcase in own way and execute this argument to end it.

### testrun.byPlatform(valuesByPlatforms) => any

returns a value for the current platform.

##### Arguments:

* **valuesByPlatforms** [plain-object | any] : values by platforms.

##### Example:

```js
testrun.byPlatform({win32: 123, otherwise: 999 });
// => 123  (on Windows)
// => 999  (on other platform)

testrun.byPlatform('abc');
// => 'abc'
```

### testrun.scriptrun(templateFile, testDir) => function

returns a function which executes javascript based on content of `templateFile` on child process.

##### Arguments:

* **templateFile** [string] : a path string of a javascript template file for a test case.
* **testDir** [string] : a path string of a directory to output a javascript file for a test case.

##### Example:

```js
(template.js)
const assert = require('assert');
var testcase = ${testcase};
assert.strictEqual(testcase.input.toUpperCase(), testcase.expected);
```

```js
const testfn = testrun.scriptrun(templateFile, testDir);

testrun('convert letter case', testfn, [
  { name: 'convert ${testcase.input} => ${testcase.expected}', input: 'abc', expected: 'ABC' },
  ...
]);
```


## License

Copyright (C) 2016 Takayuki Sato

This program is free software under [MIT](https://opensource.org/licenses/MIT) License.
See the file LICENSE in this distribution for more details.


[npm-image]: http://img.shields.io/badge/npm-v0.3.0-blue.svg
[npm-url]: https://www.npmjs.org/package/testrun
[travis-image]: https://travis-ci.org/sttk/testrun.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/testrun
[appveyor-image]: https://ci.appveyor.com/api/projects/status/github/sttk/testrun?branch=master&svg=true
[appveyor-url]: https://ci.appveyor.com/project/sttk/testrun
