const assert = require('assert');
var testcase = ${testcase};
if (typeof testcase.input === 'string') {
  assert.strictEqual(testcase.input.toUpperCase(), testcase.expected)
} else {
  assert.deepEqual(testcase.input, testcase.expected)
}

