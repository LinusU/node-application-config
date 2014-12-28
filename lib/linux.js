
var path = require('path');

module.exports = function (name) {

  if (process.env['XDG_CONFIG_HOME']) {
    return path.join(process.env['XDG_CONFIG_HOME'], name);
  }

  return path.join(process.env['HOME'], '.config', name);
};
