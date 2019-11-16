/* eslint-env mocha */

const lib = require('./')('linusu-test')
const fs = require('fs')
const assert = require('assert')
const assertRejects = require('assert-rejects')

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
    assertRejects(lib.write(), TypeError)
    assertRejects(lib.write(null), TypeError)
    assertRejects(lib.write(undefined), TypeError)
    assertRejects(lib.write(1), TypeError)
    assertRejects(lib.write('test'), TypeError)
  })
})
