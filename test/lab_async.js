const assert = require('assert');

const testrun = require('../').lab(exports);

function testfn(testcase, done) {
  setTimeout(function() {
    assert.equal(testcase.param, testcase.expected);
    done();
  }, 100);
}

testrun('testrun on lab (own evaluation or async.)', testfn, [
  {
    name: 'test 1',
    param: 'ABC',
    expected: 'ABC',
  },
  {
    name: 'test 2',
    param: 123,
    expected: 123,
  },
]); 
