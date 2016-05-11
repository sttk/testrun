const platform = require('os').platform();

function byPlatform(arg) {
  return ({}.toString.call(arg) !== '[object Object]') ? arg :
         !(platform in arg) ? arg.otherwise :
         arg[platform];
}

module.exports = byPlatform;
