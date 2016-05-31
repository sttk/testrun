const testrun = require('../').lab(exports);

function testfn(testcase) {
  return testcase.param;
}

testrun('skipping testcase', testfn, [
  {
    name: 'test group A',
    cases: [
      {
        name: 'test case A-a (skipped)',
        param: 'AaAaAa',
        expected: 'AaAaAa',
        skip: true,
      },
      {
        name: 'test case A-b',
        param: 'ABABAB',
        expected: 'ABABAB',
      },
      {
        name: 'test case A-c (skipped)',
        skip: 1,
        param: 'ACACAC',
        expected: 'ACACAC',
      },
      {
        name: 'test case A-d (no expected/error/cases)',
      },
    ],
  },
  {
    name: 'test case B',
    param: 1234,
    expected: 1234,
  },
  {
    name: 'test group C (skipped)',
    param: 'ccc',
    expected: 'ccc',
    skip: true,
  },
  {
    name: 'test case D',
    param: 'DDD',
    expected: 'DDD',
  },
  {
    name: 'test group E (skipped)',
    skip: true,
    cases: [
      {
        name: 'test case E-a',
        param: 'EEE',
        expected: 'EEE',
      },
      {
        name: 'test case E-b',
        param: 'eee',
        expected: 'eee',
      },
    ],
  },
]);

