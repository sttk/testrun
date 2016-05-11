const assert = require('assert');
assert.throws(function() {
  require('../').lab(null);
}, TypeError);

const testrun = require('../').lab(exports);

function testfn(testcase) {
  if (typeof testcase.in === 'string') {
    return testcase.in;
  } else {
    throw new TypeError();
  }
}

testrun('testrun on lab', testfn, [
  {
    name: 'test case group',
    cases: [
      {
        name: 'test for input : ${testcase.in} => ${testcase.expected}',
        in: 'aaa',
        expected: 'aaa',
      },
      {
        name: 'test for in:${testcase.in} => ${testcase.error}',
        in: ['a', 'b', 'c'],
        error: TypeError,
      },
    ],
  },
  {
    name: 'When `cases` property is not an array => ignored',
    cases: {},
  },
  {
    name: 'When a testcase has neither `expected` nor `error` properties => ignored',
    in: '123',
    expect: '123',
    err: Error,
  },
]);
