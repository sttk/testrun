const format = require('./format');
const byPlatform = require('./byplatform');

function testrun(testname, testfn, testcases) {
  const assert = require('assert');

  describe(testname, function() {
    testcases.forEach(function run(testcase) {
      var name = format(testcase.name, testcase);
      if ('expected' in testcase) {
        it(name, function(done) {
          if (assert.deepStritEqual) {
            assert.deepStrictEqual(testfn(testcase), testcase.expected);
          } else {
            assert.deepEqual(testfn(testcase), testcase.expected);
          }
          done();
        });
      } else if ('error' in testcase) {
        it(name, function(done) {
          assert.throws(function() { testfn(testcase); }, testcase.error);
          done();
        });
      } else if (Array.isArray(testcase.cases)) {
        describe(name, function() {
          testcase.cases.forEach(run);
        });
      }
    });
  });
}

testrun.byPlatform = byPlatform;

module.exports = testrun;
