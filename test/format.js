const lab = exports.lab = require('lab').script();
const assert = require('assert');

const format = require('../lib/format');

lab.experiment('format', function() {
  lab.test('should format a string', function(done) {
    var eq = assert.strictEqual;
    eq(format('', {}), '');
    eq(format('A', {}), 'A');
    eq(format('A', { a: 'xxx' }), 'A');
    eq(format('${a}A${a}', { a: 'xxx' }), '${a}A${a}');
    eq(format('${testcase.a}A${testcase.a}B${testcase.a}', { a: 'xxx' }),
      "'xxx'A'xxx'B'xxx'");
    eq(format("${testcase.x} > ${testcase.y}", { x: 123, y: 98 }),
      "123 > 98");
    eq(format("${testcase.x} / ${testcase.y}", { x: null, y: undefined }),
      "null / undefined");
    done();
  });
  lab.test('should replace error objects/functions to error name',
      function(done) {
    var eq = assert.strictEqual;
    eq(format("=> ${testcase.e1}", { e1: TypeError }), "=> TypeError");
    eq(format("=> ${testcase.e2}", { e2: new TypeError() }), "=> TypeError");
    done();
  });
});
