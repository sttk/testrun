const path = require('path');
const testrun = require('../').lab(exports);

const template = path.resolve(__dirname, 'fixtures/scriptrun/template.js');
const testdir = path.resolve(__dirname, 'fixtures/scriptrun/testdir');
const testfn = testrun.scriptrun(template, testdir);

testrun('scriptrun', testfn, [
  {
    name: 'convert ${testcase.input} => ${testcase.expected}',
    input: 'abc',
    expected: 'ABC'
  },
  {
    name: 'convert ${testcase.input} => ${testcase.expected}',
    input: 'xyz',
    expected: 'XYZ',
  },
  {
    name: 'not convert ${testcase.input} => ${testcase.expected}',
    input: { a: { b: { c: 123 } } },
    expected: { a: { b: { c: 123 } } },
  },
]);
