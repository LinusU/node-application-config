
var os = require('os');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var impl = {
  'darwin': require('./lib/darwin'),
  'linux': require('./lib/linux'),
  'win32': require('./lib/win32')
};

module.exports = function applicationConfig(name) {

  function getDirectoryPath() {
    var key = os.platform();

    if (!impl.hasOwnProperty(key)) {
      throw new Error('Platform ' + key + ' isn\'t supported');
    }

    return impl[key](name);
  }

  function getFilePath() {
    return path.join(getDirectoryPath(), 'config.json');
  }

  function read(cb) {
    fs.readFile(getFilePath(), function (err, raw) {

      if (err && err.code === 'ENOENT') {
        return cb(null, {});
      }

      if (err) {
        return cb(err);
      }

      var data;

      try {
        data = JSON.parse(raw.toString());
      } catch (err) {
        return cb(err);
      }

      cb(null, data);
    });
  }

  function trash(cb) {
    fs.unlink(getFilePath(), function (err) {
      if (err && err.code !== 'ENOENT') {
        return cb(err);
      }

      fs.rmdir(getDirectoryPath(), function (err) {
        if (err && err.code !== 'ENOENT') {
          return cb(err);
        }

        cb(null);
      });
    });
  }

  function write(data, cb) {
    mkdirp(getDirectoryPath(), function (err) {
      if (err) { return cb(err); }

      fs.writeFile(getFilePath(), JSON.stringify(data), cb);
    });
  }

  return {
    read: read,
    trash: trash,
    write: function (data, cb) {
      if (typeof data !== 'object' || data === null) {
        throw new TypeError('data is not an object')
      }

      return write(data, cb);
    }
  };
};
