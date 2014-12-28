
var path = require('path');

module.exports = function (name) {

  if (process.env['LOCALAPPDATA']) {
    return path.join(process.env['LOCALAPPDATA'], name);
  }

  return path.join(process.env['USERPROFILE'], 'Local Settings', 'Application Data', name);
};
