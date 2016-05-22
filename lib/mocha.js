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
      var name = format(testcase.name, testcase);
      if (testfn.length >= 2) {
        it(name, function(done) {
          testfn(testcase, done);
        });
      } else if ('expected' in testcase) {
        it(name, function(done) {
          eq(testfn(testcase), testcase.expected);
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

testrun.byPlatform = require('./byplatform');
testrun.scriptrun = require('./scriptrun');

module.exports = testrun;
