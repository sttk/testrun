const format = require('./format');
const byPlatform = require('./byplatform');
const assert = require('assert');

var lab;

function testrun(testname, testfn, testcases) {

  lab.experiment(testname, function() {
    testcases.forEach(function run(testcase) {
      var name = format(testcase.name, testcase);
      var fn = function() { return testfn(testcase); };
      if ('expected' in testcase) {
        lab.test(name, function(done) {
          /* $lab:coverage:off$ */
          if (assert.deepStrictEqual) {
          /* $lab:coverage:on$ */
            assert.deepStrictEqual(fn(), testcase.expected);
          } else {
            /* $lab:coverage:off$ */
            assert.deepEqual(fn(), testcase.expected);
            /* $lab:coverage:on$ */
          }
          done();
        });
      } else if ('error' in testcase) {
        lab.test(name, function(done) {
          assert.throws(fn, testcase.error);
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
