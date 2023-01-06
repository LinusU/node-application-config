import fs from 'node:fs/promises'
import path from 'node:path'

import applicationConfigPath from 'application-config-path'
import { loadJsonFile } from 'load-json-file'
import { writeJsonFile } from 'write-json-file'

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

    await writeJsonFile(this.filePath, data)
  }

  async trash () {
    try {
      await fs.unlink(this.filePath)
      await fs.rmdir(path.dirname(this.filePath))
    } catch (err) {
      if (err.code === 'ENOENT') return
      throw err
    }
  }
}

export default function createApplicationConfig (name) {
  return new ApplicationConfig(name)
}
