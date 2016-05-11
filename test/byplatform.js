const lab = exports.lab = require('lab').script();
const assert = require('assert');
const platform = require('os').platform();

const byPlatform = require('../lib/byplatform');

lab.experiment('byPlatform', function() {
  lab.test('should return a value by platform', function(done) {
    var eq = assert.strictEqual;

    var v = (platform == 'win32') ? 'win32' : '?';
    eq(byPlatform({
      win32:  'value 1 for win32',
      otherwise: 'value 1 for ?',
    }), 'value 1 for ' + v);

    v = (platform == 'linux') ? 'linux' :
        (platform == 'darwin') ? 'darwin' : '???';

    eq(byPlatform({
      darwin: 'value 2 for darwin',
      linux:  'value 2 for linux',
      otherwise: 'value 2 for ???',
    }), 'value 2 for ' + v);

    done();
  });

  lab.test('should return an argument if the argument is not a plain object',
      function(done) {
    var eq = assert.deepEqual;

    eq(byPlatform(true), true);
    eq(byPlatform(false), false);
    eq(byPlatform(123), 123);
    eq(byPlatform('ABC'), 'ABC');

    var fn = function() {};
    eq(byPlatform(fn), fn);

    done();
  });
});


