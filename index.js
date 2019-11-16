const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const applicationConfigPath = require('application-config-path')
const loadJsonFile = require('load-json-file')

const rmdir = promisify(fs.rmdir)
const unlink = promisify(fs.unlink)

class ApplicationConfig {
  constructor (name) {
    this.filePath = path.join(applicationConfigPath(name), 'config.json')
  }

  async read () {
    try {
      return await loadJsonFile(this.filePath)
    } catch (err) {
      if (err.code === 'ENOENT') return {}
      throw err
    }
  }

  async write (data) {
    if (typeof data !== 'object' || data === null) {
      throw new TypeError('data is not an object')
    }

    const writeJsonFile = require('write-json-file')

    await writeJsonFile(this.filePath, data)
  }

  async trash () {
    try {
      await unlink(this.filePath)
      await rmdir(path.dirname(this.filePath))
    } catch (err) {
      if (err.code === 'ENOENT') return
      throw err
    }
  }
}

module.exports = function createApplicationConfig (name) {
  return new ApplicationConfig(name)
}
