const path = require('path');
const testrun = require('../').lab(exports);

const template = path.resolve(__dirname, 'fixtures/scriptrun/tmp.js');
const execpath = path.resolve(__dirname, 'fixtures/scriptrun/cmd.js');
const testdir = path.resolve(__dirname, 'fixtures/scriptrun/testdir');
const command = execpath + ' ${testfile} aaa';
const testfn = testrun.scriptrun(template, testdir, command);

testrun('scriptrun with command', testfn, [
  {
    name: 'test of scriptrun with user specified command',
    expected: true,
  },
]);
