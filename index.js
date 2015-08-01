var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var applicationConfigPath = require('application-config-path')

function applicationConfig (name) {
  var directoryPath = applicationConfigPath(name)
  var filePath = path.join(directoryPath, 'config.json')

  function read (cb) {
    fs.readFile(filePath, function (err, raw) {
      if (err && err.code === 'ENOENT') return cb(null, {})
      if (err) return cb(err)

      var data
      try {
        data = JSON.parse(raw.toString())
      } catch (err) {
        return cb(err)
      }

      cb(null, data)
    })
  }

  function trash (cb) {
    fs.unlink(filePath, function (err) {
      if (err && err.code !== 'ENOENT') return cb(err)

      fs.rmdir(directoryPath, function (err) {
        if (err && err.code !== 'ENOENT') return cb(err)

        cb(null)
      })
    })
  }

  function write (data, cb) {
    mkdirp(directoryPath, function (err) {
      if (err) { return cb(err) }

      fs.writeFile(filePath, JSON.stringify(data), cb)
    })
  }

  return {
    filePath: filePath,
    read: read,
    trash: trash,
    write: function (data, cb) {
      if (typeof data !== 'object' || data === null) {
        throw new TypeError('data is not an object')
      }

      return write(data, cb)
    }
  }
}

module.exports = applicationConfig
