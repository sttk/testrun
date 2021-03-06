const exec = require('child_process').exec;
const inspect = require('util').inspect;
const fs = require('fs');
const path = require('path');
const del = require('del');
const mkdirp = require('mkdirp');

const inspectOpt = { depth: null };
const readOpt = { encoding: 'utf-8' };

var id = 0;

function createTestFunction(templateFile, testDir, command) {
  del.sync(path.join(testDir, './test-**.js'));
  mkdirp(testDir);
  var templateJs = fs.readFileSync(templateFile, readOpt);

  return function(testcase, done) {
    var filepath = createTestFile(templateJs, testDir, testcase, id ++);
    command = createCommand(command, filepath);
    exec(command, function(err, stdout, stderr) {
      if (stderr !== '') {
        throw new Error(stderr);
      }
      if (err != null) {
        throw new Error(err);
      }
      done();
    });
  };
}

function createTestFile(template, testDir, testcase, id) {
  var filePath = path.resolve(testDir, 'test-' + id + '.js');
  var regExp = new RegExp('\\${testcase}', 'g');
  var jsSrc = template.replace(regExp, inspect(testcase, inspectOpt));
  fs.writeFileSync(filePath, jsSrc);
  return filePath;
}

function createCommand(command, filepath) {
  if (typeof command === 'string') {
    var regExp = new RegExp('\\${testfile}', 'g');
    command = command.replace(regExp, filepath);
    return command;
  }
  return 'node ' + filepath;
}

module.exports = createTestFunction;
