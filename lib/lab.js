const format = require('./format');
const assert = require('assert');
const inspect = require('util').inspect;

function eq(result, expected) {
  if (typeof expected === 'number' && isNaN(expected)) {
    assert(typeof result === 'number' && isNaN(result),
      'AssertError: ' + inspect(result) + ' is not a NaN');
    return;
  }

  if (assert.deepStrictEqual) {
    assert.deepStrictEqual(result, expected);
    return;
  }

  assert.deepEqual(result, expected);
}

var lab;

function testrun(testname, testfn, testcases) {

  lab.experiment(testname, function() {
    testcases.forEach(function run(testcase) {
      if (testfn.length >= 2) {
        _test(testcase, function(done) {
          testfn(testcase, done);
        });
      } else if ('expected' in testcase) {
        _test(testcase, function(done) {
          eq(testfn(testcase), testcase.expected);
          done();
        });
      } else if ('error' in testcase) {
        _test(testcase, function(done) {
          assert.throws(function() { testfn(testcase); }, testcase.error);
          done();
        });
      } else if (Array.isArray(testcase.cases)) {
        _experiment(testcase, function() {
          testcase.cases.forEach(run);
        });
      } else {
        _test(testcase);
      }
    });
  });

  function _experiment(testcase, cb) {
    var name = format(testcase.name, testcase);
    if (testcase.only) {
      lab.experiment.only(name, cb);
    } else if (testcase.skip) {
      lab.experiment.skip(name, cb);
    } else {
      lab.experiment(name, cb);
    }
  }

  function _test(testcase, cb) {
    var name = format(testcase.name, testcase);
    if (testcase.only) {
      lab.test.only(name, cb);
    } else if (testcase.skip) {
      lab.test.skip(name, cb);
    } else {
      lab.test(name, cb);
    }
  }
}

module.exports = function(_exports) {
  if (!_exports) {
    throw new TypeError('Set `exports` object to the argument');
  }

  lab = _exports.lab = require('lab').script();
  testrun.byPlatform = require('./byplatform');
  testrun.scriptrun = require('./scriptrun');
  return testrun;
};
