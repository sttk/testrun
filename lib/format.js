const inspect = require('util').inspect;

function isError(v) {
  if (!v) {
    return false;
  }
  if (typeof v === 'object' &&
      Object.prototype.toString.call(v) === '[object Error]') {
    return true;
  }
  if (typeof v === 'function' &&
      Error.prototype.toString.call(v) === v.name) {
    return true;
  }
  return false;
}

function format(pattern, testcase) {
  Object.keys(testcase).forEach(function(key) {
    var v = testcase[key];
    v = isError(v) ? v.name : inspect(v);
    var regexp = new RegExp('\\${testcase.' + key + '}', 'g');
    pattern = pattern.replace(regexp, v);
  });
  return pattern;
}

module.exports = format;

