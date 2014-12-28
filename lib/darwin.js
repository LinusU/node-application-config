
var path = require('path');

module.exports = function (name) {
  return path.join(process.env['HOME'], 'Library', 'Application Support', name);
};
