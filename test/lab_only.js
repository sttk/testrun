const testrun = require('../').lab(exports);

function testfn(testcase) {
  return testcase.param;
}

testrun('only testcase', testfn, [
  {
    name: 'test group A',
    cases: [
      {
        name: 'test case A-a',
        param: 'AaAaAs',
        expected: 'AaAaAa',
      },
      {
        name: 'test case A-b',
        param: 'AbAbAb',
        expected: 'AbAbAb',
      },
      {
        name: 'test case A-c (only)',
        param: 'AcAcAc',
        expected: 'AcAcAc',
        only: true,
      },
    ],
  },
  {
    name: 'test case B',
    param: 'BBBB',
    expected: 'BBBB',
  },
]);
