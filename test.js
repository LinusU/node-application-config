/* eslint-env mocha */

import assert from 'node:assert'
import fs from 'node:fs'

import createApplicationConfig from './index.js'

const lib = createApplicationConfig('linusu-test')
const payload = { n: 1337 }

describe('application-config', () => {
  it('should write', async () => {
    await lib.write(payload)
  })

  it('should read', async () => {
    assert.deepStrictEqual(await lib.read(), payload)
  })

  it('should export path to file', () => {
    assert.strictEqual(typeof lib.filePath, 'string')

    const raw = fs.readFileSync(lib.filePath)
    assert.deepStrictEqual(JSON.parse(raw.toString()), payload)
  })

  it('should trash', async () => {
    await lib.trash()
  })

  it('should be gone', async () => {
    assert.deepStrictEqual(await lib.read(), {})
  })

  it('should throw', () => {
    assert.rejects(lib.write(), TypeError)
    assert.rejects(lib.write(null), TypeError)
    assert.rejects(lib.write(undefined), TypeError)
    assert.rejects(lib.write(1), TypeError)
    assert.rejects(lib.write('test'), TypeError)
  })
})
