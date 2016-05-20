const lab = exports.lab = require('lab').script();
const assert = require('assert');

const format = require('../lib/format');
const eq = assert.strictEqual;

lab.experiment('format', function() {
  lab.test('should format a string', function(done) {
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
    eq(format("=> ${testcase.e1}", { e1: TypeError }), "=> TypeError");
    eq(format("=> ${testcase.e2}", { e2: new TypeError() }), "=> TypeError");
    done();
  });
  lab.test('should unescape back slashes which escaped by util.inspect',
      function(done) {
    var str = '\\';
    eq(format('${testcase.a}', { a: str }), "'" + str + "'");
    str = '\\\\';
    eq(format('${testcase.a}', { a: str }), "'" + str + "'");
    str = '\\\\\\';
    eq(format('${testcase.a}', { a: str }), "'" + str + "'");
    str = '\\\\\\\\';
    eq(format('${testcase.a}', { a: str }), "'" + str + "'");
    str = '\\\\ a\\b\\\\\\c\\';
    eq(format('${testcase.a}', { a: str }), "'" + str + "'");
    done();
  });
});
