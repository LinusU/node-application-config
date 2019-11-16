const fs = require('fs')
const path = require('path')
const applicationConfigPath = require('application-config-path')

class ApplicationConfig {
  constructor (name) {
    this.filePath = path.join(applicationConfigPath(name), 'config.json')
  }

  read (cb) {
    fs.readFile(this.filePath, (err, raw) => {
      if (err && err.code === 'ENOENT') return cb(null, {})
      if (err) return cb(err)

      let data
      try {
        data = JSON.parse(raw.toString())
      } catch (err) {
        return cb(err)
      }

      cb(null, data)
    })
  }

  write (data, cb) {
    if (typeof data !== 'object' || data === null) {
      throw new TypeError('data is not an object')
    }

    const mkdirp = require('mkdirp')
    const directoryPath = path.dirname(this.filePath)

    mkdirp(directoryPath, (err) => {
      if (err) return cb(err)

      const tempFilePath =
        this.filePath + '-' +
        Math.random().toString().substr(2) +
        Date.now().toString() +
        path.extname(this.filePath)

      fs.writeFile(tempFilePath, JSON.stringify(data, null, 2), (err) => {
        if (err) return cb(err)

        fs.rename(tempFilePath, this.filePath, cb)
      })
    })
  }

  trash (cb) {
    fs.unlink(this.filePath, (err) => {
      if (err && err.code !== 'ENOENT') return cb(err)

      const directoryPath = path.dirname(this.filePath)
      fs.rmdir(directoryPath, (err) => {
        if (err && err.code !== 'ENOENT') return cb(err)

        cb(null)
      })
    })
  }
}

module.exports = function createApplicationConfig (name) {
  return new ApplicationConfig(name)
}
