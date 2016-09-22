var fs = require('fs')
var path = require('path')
var applicationConfigPath = require('application-config-path')

function ApplicationConfig (name) {
  this.filePath = path.join(applicationConfigPath(name), 'config.json')
}

ApplicationConfig.prototype.read = function (cb) {
  var self = this
  fs.readFile(self.filePath, function (err, raw) {
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

ApplicationConfig.prototype.write = function (data, cb) {
  var self = this
  var mkdirp = require('mkdirp')
  if (typeof data !== 'object' || data === null) {
    throw new TypeError('data is not an object')
  }
  var directoryPath = path.dirname(self.filePath)
  mkdirp(directoryPath, function (err) {
    if (err) { return cb(err) }

    var tempFilePath =
      self.filePath + '-' +
      Math.random().toString().substr(2) +
      Date.now().toString() +
      path.extname(self.filePath)

    fs.writeFile(tempFilePath, JSON.stringify(data, null, 2), function (err) {
      if (err) { return cb(err) }

      fs.rename(tempFilePath, self.filePath, cb)
    })
  })
}

ApplicationConfig.prototype.trash = function (cb) {
  var self = this
  fs.unlink(self.filePath, function (err) {
    if (err && err.code !== 'ENOENT') return cb(err)

    var directoryPath = path.dirname(self.filePath)
    fs.rmdir(directoryPath, function (err) {
      if (err && err.code !== 'ENOENT') return cb(err)

      cb(null)
    })
  })
}

module.exports = function createApplicationConfig (name) {
  return new ApplicationConfig(name)
}
