const format = require('./format');
const byPlatform = require('./byplatform');
const assert = require('assert');

/* $lab:coverage:off$ */
const eq = assert.deepStrictEqual ? assert.deepStrictEqual : assert.deepEqual;
/* $lab:coverage:on$ */

var lab;

function testrun(testname, testfn, testcases) {

  lab.experiment(testname, function() {
    testcases.forEach(function run(testcase) {
      var name = format(testcase.name, testcase);
      if (testfn.length >= 2) {
        lab.test(name, function(done) {
          testfn(testcase, done);
        });
      } else if ('expected' in testcase) {
        lab.test(name, function(done) {
          eq(testfn(testcase), testcase.expected);
          done();
        });
      } else if ('error' in testcase) {
        lab.test(name, function(done) {
          assert.throws(function() { testfn(testcase); }, testcase.error);
          done();
        });
      } else if (Array.isArray(testcase.cases)) {
        lab.experiment(name, function() {
          testcase.cases.forEach(run);
        });
      }
    });
  });
}

module.exports = function(_exports) {
  if (!_exports) {
    throw new TypeError('Set `exports` object to the argument');
  }

  lab = _exports.lab = require('lab').script();
  testrun.byPlatform = byPlatform;
  return testrun;
};
