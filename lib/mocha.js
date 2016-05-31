const format = require('./format');
const assert = require('assert');
const os = require('os');
const path = require('path');

const eq = assert.deepStrictEqual ? assert.deepStrictEqual : assert.deepEqual;

if (os.platform() === 'win32') {
  // issue #2242 of mocha
  var abspath = path.resolve('.');
  var drive = abspath.slice(0, 2);
  if (process.cwd() !== path.resolve(drive)) {
    process.chdir(process.cwd());
  }
}

function testrun(testname, testfn, testcases) {

  describe(testname, function() {
    testcases.forEach(function run(testcase) {
      if (testfn.length >= 2) {
        _it(testcase, function(done) {
          testfn(testcase, done);
        });
      } else if ('expected' in testcase) {
        _it(testcase, function(done) {
          eq(testfn(testcase), testcase.expected);
          done();
        });
      } else if ('error' in testcase) {
        _it(testcase, function(done) {
          assert.throws(function() { testfn(testcase); }, testcase.error);
          done();
        });
      } else if (Array.isArray(testcase.cases)) {
        _describe(testcase, function() {
          testcase.cases.forEach(run);
        });
      } else {
        _it(testcase);
      }
    });
  });

  function _describe(testcase, cb) {
    var name = format(testcase.name, testcase);
    if (testcase.only) {
      describe.only(name, cb);
    } else if (testcase.skip) {
      describe.skip(name, cb);
    } else {
      describe(name, cb);
    }
  }

  function _it(testcase, cb) {
    var name = format(testcase.name, testcase);
    if (testcase.only) {
      it.only(name, cb);
    } else if (testcase.skip) {
      it.skip(name, cb);
    } else {
      it(name, cb);
    }
  }
}

testrun.byPlatform = require('./byplatform');
testrun.scriptrun = require('./scriptrun');

module.exports = testrun;
